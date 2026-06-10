# 🦷 oneday-dental-global

**원데이치과** — 대만(繁中) 환자 타겟 글로벌 치과관광 랜딩.
임플란트·라미네이트 **원데이(당일완성)** + 투명 정찰 수가표 공개 + 중국어 통역 + LINE 상담.

- 스택: **Next.js 15.5 · React 19 · TypeScript · Tailwind v4 · next-intl**
- 언어: `ko`(원본) / `zh-TW`(대만) — `localePrefix: always`
- 상담: **LINE**(대만 1순위)
- 골격: `healingeye-global` 검증본 재사용 / 디자인: **대만 치과 벤치마크** / 데이터: **원데이치과 실데이터(Apify)**

## Quick start

```bash
npm install
npm run dev      # http://localhost:4318/ko
npm run build && npm start
```

## 빌드 파이프라인 (병렬 에이전트 팀)

`.env.local`에 키 4개(`SCRAPE_SOURCE_URL`·`BENCHMARK_URL`·`APIFY_TOKEN`·`GEMINI_API_KEY`)를 채운 뒤
`../거래처-글로벌랜딩-마스터프롬프트.md`의 실행 블록을 돌리면:

1. **Wave0** 대만 벤치마크 design-benchmark(CDP) + 원데이 한국홈피 Apify 스크래핑
2. **Wave1** raw→정규 `clinic.json`(치과 스키마) + `ko`/`zh-TW` 언어팩 + 나노바나나 이미지
3. **Wave2** Next.js 구현(벤치마크 디자인 + 실데이터) + per-locale SEO
4. **검수** build + 키 동등성 + Lighthouse + 독립 리뷰

## Architecture

| Layer | Where |
|---|---|
| Content DB | `database/clinic.json` (typed by `lib/types.ts`) + `database/treatment_detail.json` |
| i18n | `i18n/` + `messages/{ko,zh-TW}.json` · `next-intl` · `localePrefix: always` |
| Routing | `app/[locale]/…` — home, about, treatments, treatments/[slug], prices, reviews, reservation |
| Lead capture | `POST /api/consult` → validate + forward to `CONSULT_WEBHOOK_URL` (★ afformationcrm 적재) |
| SEO | `lib/seo.ts` (per-locale meta + hreflang) · `sitemap.ts` · `robots.ts` · JSON-LD |
| Imagery | `public/gen-img/` (Gemini 나노바나나) · `public/scraped-img/` (실제 병원 사진) |

> ⚠️ 현재 `database/*`, `messages/*`, `public/*-img/*` 는 골격 잔여 데이터입니다.
> Wave1에서 원데이치과 실데이터로 전량 교체됩니다.

## Conversion funnel

모든 페이지가 **LINE 상담**으로 유도(결정은 채팅 후 발생): 상시 플로팅 CTA, 시술별 인라인 CTA,
예약폼(→ `/api/consult` + 메신저 prefill), `consult_click` 분석(채널+시술+UTM 태깅).
