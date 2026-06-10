import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/Logo";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <LogoMark className="size-14" />
      <p className="mt-5 text-5xl font-extrabold text-ink-900">404</p>
      <p className="mt-2 text-[15px] text-ink-500">{t("title")}</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition active:scale-95"
      >
        {t("home")}
      </Link>
    </div>
  );
}
