import { NextResponse } from "next/server";

/**
 * 자체 인입 적재 프록시.
 * 클라이언트(LINE 클릭) → 이 라우트(서버) → CONSULT_WEBHOOK_URL(구글 시트 Apps Script).
 * 시트 URL은 server-only env에 두어 클라이언트에 노출하지 않는다(스팸 방지).
 * env 미설정 시 조용히 no-op → 사용자 경험에 영향 없음.
 */
export async function POST(request: Request) {
  const webhook = process.env.CONSULT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: false, reason: "no-webhook" });

  try {
    const body = await request.json().catch(() => ({}));
    const payload = {
      channel: body.channel ?? "",
      placement: body.placement ?? "",
      treatment: body.treatment ?? "",
      locale: body.locale ?? "",
      utm_source: body.utm_source ?? "",
      utm_medium: body.utm_medium ?? "",
      utm_campaign: body.utm_campaign ?? "",
      utm_content: body.utm_content ?? "",
      utm_term: body.utm_term ?? "",
      referrer: request.headers.get("referer") ?? "",
      ua: request.headers.get("user-agent") ?? "",
    };

    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return NextResponse.json({ ok: true });
  } catch {
    // 적재 실패가 사용자 흐름을 막지 않도록 항상 200.
    return NextResponse.json({ ok: false, reason: "forward-failed" });
  }
}
