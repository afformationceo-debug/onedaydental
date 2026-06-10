import { getLocale } from "next-intl/server";
import { getClinic } from "@/lib/clinic";
import { tx } from "@/lib/i18n-text";
import type { Locale } from "@/lib/types";
import Reveal from "../Reveal";
import CelebrityMarquee from "./CelebrityMarquee";

/**
 * "함께한 분들 / 與我們同行的人們" — promotional photos the clinic provided
 * (broadcaster 임성훈 visit). Trust signal, not a testimonial. Rendered as an
 * auto-scrolling marquee (compact thumbnails). Conservative on portrait rights:
 * only studio promo shots clearly produced for marketing.
 */
export default async function CelebrityStrip() {
  const locale = (await getLocale()) as Locale;
  const { celebrities } = getClinic();
  if (!celebrities?.photos?.length) return null;

  const photos = celebrities.photos.map((p) => ({
    src: p.src,
    alt: tx(p.alt, locale),
  }));

  return (
    <Reveal>
      <CelebrityMarquee
        photos={photos}
        title={tx(celebrities.title, locale)}
        subtitle={tx(celebrities.subtitle, locale)}
        note={tx(celebrities.note, locale)}
      />
    </Reveal>
  );
}
