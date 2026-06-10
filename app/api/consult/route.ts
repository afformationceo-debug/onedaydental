import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple in-memory IP token bucket (5 requests / 60s). Resets on cold start —
// adequate abuse guard for a contact form; swap for Upstash in multi-instance prod.
const WINDOW_MS = 60_000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // bound memory
  return arr.length > MAX_HITS;
}

interface ConsultBody {
  name?: string;
  contact?: string;
  treatment?: string;
  message?: string;
  locale?: string;
  utm?: Record<string, string>;
}

function clean(s: unknown, max = 500): string {
  if (typeof s !== "string") return "";
  return s.replace(/[<>]/g, "").trim().slice(0, max);
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: ConsultBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const lead = {
    name: clean(body.name, 80),
    contact: clean(body.contact, 120),
    treatment: clean(body.treatment, 120),
    message: clean(body.message, 1000),
    locale: clean(body.locale, 8),
    utm: body.utm ?? {},
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.contact) {
    return NextResponse.json(
      { ok: false, error: "name_and_contact_required" },
      { status: 422 },
    );
  }

  // Forward to a configured webhook (Slack/CRM) if present — production-safe.
  const webhook = process.env.CONSULT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🩺 New consult: ${lead.name} (${lead.contact}) · ${lead.treatment} · ${lead.locale}`,
          lead,
        }),
      });
    } catch {
      // non-fatal — the messenger deep-link is the primary channel
    }
  }

  // Observability WITHOUT PII — never log name/contact to stdout (medical-tourism data).
  console.log(
    "[consult]",
    JSON.stringify({
      treatment: lead.treatment,
      locale: lead.locale,
      hasMessage: Boolean(lead.message),
      utm: lead.utm,
      receivedAt: lead.receivedAt,
    }),
  );

  return NextResponse.json({ ok: true });
}
