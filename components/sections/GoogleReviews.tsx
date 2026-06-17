import { getLocale, getTranslations } from "next-intl/server";
import { Star, ExternalLink } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import type { Locale } from "@/lib/types";
import { SectionHeader } from "./Section";

/**
 * 실제 Google 지도 리뷰(1·2·3관, 한국 환자)를 번체로 번역해 표시한다.
 * ★ 사이트 내 표시(번역+출처 명시+원문언어 명시)이며 구글맵 직접 게시가 아니다 — 정책 안전.
 * 실제 5★ 긍정 리뷰 중 미백/라미·심미·신뢰·친절 관점으로 선별(큐레이션은 정당).
 * 하단 3개관 구글맵 링크로 실제 리뷰임을 검증 가능(투명성).
 */

type Review = { tag: Record<Locale, string>; body: Record<Locale, string> };

const REVIEWS: Review[] = [
  {
    tag: { "zh-TW": "陶瓷貼片", ko: "라미네이트" },
    body: {
      "zh-TW": "猶豫要不要做陶瓷貼片的人，推薦來 ONEDAY！牙齒檢查得很仔細，醫護人員也很親切，非常喜歡～",
      ko: "라미네이트를 망설이는 분들은 원데이치과로 오시면 좋겠습니다~~ 치아도 엄청 꼼꼼히 봐주시고, 친절하셔서 맘에 들어요!",
    },
  },
  {
    tag: { "zh-TW": "齒列矯正", ko: "치아교정" },
    body: {
      "zh-TW": "去諮詢矯正，醫師仔細確認牙齒排列狀態、把矯正過程解釋得很好懂，疑問也一一親切說明，很有信任感，能輕鬆諮詢很滿意～",
      ko: "교정 상담을 받으러 방문했는데 치아 배열 상태를 자세히 확인해 주시고 교정 과정도 이해하기 쉽게 설명해 주셨어요. 궁금했던 부분도 하나하나 친절하게 알려주셔서 신뢰가 갔고, 부담 없이 상담받을 수 있어서 만족스러웠습니다~",
    },
  },
  {
    tag: { "zh-TW": "良心看診", ko: "양심진료" },
    body: {
      "zh-TW": "去年做了根管治療，這次久違回診檢查。本來擔心牙齒不好又容易蛀牙會痛，結果醫師說沒有蛀牙、只幫我洗牙並提醒用牙線～真的是良心牙科！",
      ko: "작년에 신경치료하고 오랜만에 검진하러 왔는데 이가 약하고 충치도 잘 생겨서 아플까봐 걱정했는데, 충치 없고 치실 잘 해달라며 스케일링만 해주시더라고요~ 여기는 정말 양심 치과예요!",
    },
  },
  {
    tag: { "zh-TW": "院內設施", ko: "시설·진료" },
    body: {
      "zh-TW": "來看牙時發現院內設施非常乾淨，很吸睛。實際看診後覺得院長技術很好，超棒～！",
      ko: "치과 치료 받으러 왔는데 내부시설이 너무 깨끗해서 눈이 가더라구요. 진료도 받아봤는데 원장님 실력도 있으시고 너무 좋아요~!!",
    },
  },
  {
    tag: { "zh-TW": "詳細說明", ko: "상세 설명" },
    body: {
      "zh-TW": "治療前後都仔細說明，讓我能安心看診。院內整潔、員工應對也好，很滿意。",
      ko: "치료 전후 설명을 자세하게 해주셔서 안심하고 진료받을 수 있었어요. 병원도 깔끔하고 직원분들 응대도 좋아서 만족스럽습니다.",
    },
  },
  {
    tag: { "zh-TW": "親切・價格", ko: "친절·가격" },
    body: {
      "zh-TW": "醫護人員和醫師都非常親切～候診時間也不長，價格感覺也很合理！",
      ko: "직원분들하고 의사선생님 모두 너무 친절하세요~~ 대기시간도 오래 걸리지 않았고 가격도 합리적으로 해주신 것 같아요!!",
    },
  },
  {
    tag: { "zh-TW": "細心・說明", ko: "꼼꼼·설명" },
    body: {
      "zh-TW": "之前只看過小診所，第一次來大型牙科。果然有規模的診所不一樣，看診仔細、流程有制度，治療說明也很清楚，怕痛的我也幾乎不痛就治療完了。",
      ko: "작은 동네 치과만 다니다 큰 치과 처음 가봤는데 역시 규모 있는 치과가 좋네요. 꼼꼼히 치료해주시고 체계가 잡혀있더라고요. 설명도 잘 해주시고 엄살 심한데 아프지 않게 치료받고 왔어요.",
    },
  },
  {
    tag: { "zh-TW": "舒適氛圍", ko: "편안한 분위기" },
    body: {
      "zh-TW": "牙科卻有咖啡香超棒！大家都很親切，補蛀牙也比想像中不可怕。",
      ko: "치과인데 카페처럼 커피향나서 너무 좋아요! 다들 친절하시고 충치치료 했는데 생각보다 덜 무서웠어요.",
    },
  },
  {
    tag: { "zh-TW": "推薦", ko: "추천" },
    body: {
      "zh-TW": "即使候診人多，仍親切應對、面帶微笑，讓我放鬆許多！院長們看診也真的很棒，會多多推薦給親友～",
      ko: "대기 인원이 많아서 정신없었는데도 친절하게 응대해주시고 웃으면서 말씀해주셔서 긴장 많이 풀렸어요! 원장님들도 진료 진짜 잘 해주세요! 지인들한테 추천 많이 하려고요~",
    },
  },
];

const MAPS = [
  { label: "1館", url: "https://maps.app.goo.gl/Aj3NUyUPkgiA15udA" },
  { label: "2館", url: "https://maps.app.goo.gl/2rQDHq8LvBhuDUMT9" },
  { label: "3館", url: "https://maps.app.goo.gl/K7H5gNuTafr5h5D48" },
];

export default async function GoogleReviews() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("googleReviews");

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-screen-2xl lg:px-6">
        <SectionHeader kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-8 grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
          {REVIEWS.map((r, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-xl border border-ink-100 bg-surface p-5 shadow-tech transition hover:border-mint-400 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5" aria-label="5 / 5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4" style={{ fill: "#f59e0b", color: "#f59e0b" }} strokeWidth={0} />
                  ))}
                </div>
                <SiGoogle className="size-4 text-ink-300" aria-hidden />
              </div>

              <span className="mt-3 inline-flex w-fit items-center rounded-full bg-mint-400/15 px-2.5 py-0.5 text-[11px] font-bold text-mint-600">
                {r.tag[locale]}
              </span>

              <blockquote className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-700">
                “{r.body[locale]}”
              </blockquote>

              <figcaption className="mt-4 border-t border-ink-100 pt-3 text-[11.5px] font-medium text-ink-400">
                {t("source")}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* 실제 리뷰임을 검증할 수 있는 3개관 구글맵 링크 (투명성) */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 px-5 lg:px-0">
          <span className="text-[12.5px] font-semibold text-ink-500">{t("moreOnGoogle")}</span>
          {MAPS.map((m) => (
            <a
              key={m.label}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-surface px-3.5 py-1.5 text-[12.5px] font-bold text-brand-700 transition hover:border-mint-400 hover:bg-surface-soft"
            >
              <SiGoogle className="size-3.5" />
              {m.label}
              <ExternalLink className="size-3" />
            </a>
          ))}
        </div>

        <p className="mx-5 mt-5 text-center text-[11.5px] leading-relaxed text-ink-400 lg:mx-0">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
