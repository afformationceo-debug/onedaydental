import { getTranslations } from "next-intl/server";

export default async function PromoBar() {
  const t = await getTranslations();
  return (
    <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700 px-4 py-2 text-center text-[11.5px] font-semibold text-white/95">
      {t("promo")}
    </div>
  );
}
