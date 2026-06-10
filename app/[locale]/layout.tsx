import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, localeMeta, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { analytics } from "@/lib/config";
import AppShell from "@/components/AppShell";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = hasLocale(routing.locales, locale) ? (locale as Locale) : "ko";
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://global.oneday-dental.co.kr",
    ),
    ...buildMetadata({ locale: l, path: "/" }),
    verification: analytics.gscVerification
      ? { google: analytics.gscVerification }
      : undefined,
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <html lang={localeMeta[l].htmlLang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <NextIntlClientProvider>
          <JsonLd locale={l} />
          <AppShell>{children}</AppShell>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
