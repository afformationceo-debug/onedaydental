import { getTranslations } from "next-intl/server";

export default async function PromoBar() {
  const t = await getTranslations();
  return (
    <div className="relative overflow-hidden bg-brand-950 px-4 py-2 text-center text-[11.5px] font-semibold text-white/95">
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-mint-400" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-mint-400" />
      {t("promoBar")}
    </div>
  );
}
