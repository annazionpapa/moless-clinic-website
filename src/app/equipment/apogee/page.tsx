import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "아포지엘리트플러스 | 모리스의원",
  description:
    "어클레임부터 아포지 엘리트 플러스까지 — 755nm + 1064nm 듀얼 파장과 Cryo6 쿨러 시스템으로 안전하고 효과적인 레이저 제모.",
};

/* ─── 진화 히스토리 ─── */
const HISTORY = [
  { name: "어클레임", gen: "1세대" },
  { name: "아포지", gen: "2세대" },
  { name: "엘리트 MPX", gen: "3세대" },
  { name: "아포지 플러스", gen: "4세대" },
  { name: "아포지 엘리트 플러스", gen: "5세대", highlight: true },
];

/* ─── 스펙 데이터 ─── */
const SPECS = [
  { label: "제조사", value: "Cynosure (USA)" },
  { label: "파장", value: "755nm + 1064nm" },
  { label: "레이저 타입", value: "Alexandrite / Nd:YAG" },
  { label: "스팟 사이즈", value: "최대 24mm" },
  { label: "냉각 시스템", value: "Cryo6 통합 냉각" },
  { label: "반복률", value: "최대 5Hz" },
];

/* ─── 특장점 데이터 ─── */
const FEATURES = [
  {
    num: "01",
    title: "5세대 기술 진화",
    subtitle: "어클레임에서 아포지 엘리트 플러스까지",
    desc: "아포지 엘리트 플러스는 수십 년간 이어온 레이저 기술의 결정체입니다. 어클레임에서 시작해 5세대에 걸친 진화를 거치며 출력 안정성, 냉각 효율, 피부 타입 적용 범위가 지속적으로 개선되었습니다.",
  },
  {
    num: "02",
    title: "듀얼 파장 시스템",
    subtitle: "755nm Alexandrite + 1064nm Nd:YAG",
    desc: "755nm 알렉산드라이트 파장은 멜라닌 흡수율이 높아 밝은 피부의 굵은 체모에 최적이며, 1064nm Nd:YAG 파장은 더 깊은 조직 침투와 어두운 피부 타입에도 안전하게 적용 가능합니다.",
  },
  {
    num: "03",
    title: "Cryo6 냉각 시스템",
    subtitle: "시술 전 · 중 · 후 지속 냉각",
    desc: "레이저 조사 전, 중, 후에 걸쳐 피부 표면을 지속적으로 냉각하여 열 손상과 통증을 동시에 억제합니다. 냉각 강도는 단계별로 조절 가능하여 부위별 민감도에 맞춰 최적화합니다.",
  },
  {
    num: "04",
    title: "빠른 시술 속도",
    subtitle: "최대 5Hz 반복률",
    desc: "높은 반복률로 빠르고 균일한 시술이 가능합니다. 넓은 부위도 짧은 시간 안에 시술이 완료되어 환자의 부담을 최소화하며, 균일한 에너지 전달로 일관된 결과를 보장합니다.",
  },
];

/* ─── 하단 네비게이션 ─── */
const NAV_LINKS = [
  { label: "젠틀맥스프로플러스", href: "/equipment/gentlemax", sub: "Equipment 01" },
  { label: "여성 가격안내", href: "/pricing/female", sub: "Price" },
  { label: "남성 가격안내", href: "/pricing/male", sub: "Price" },
  { label: "시술 안내", href: "/treatment/face", sub: "Treatment" },
];

export default function ApogeePage() {
  return (
    <>
      {/* ── 풀스크린 히어로 ── */}
      <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] flex items-center">
        {/* 배경 그라데이션 */}
        <div
          className="absolute inset-0 bg-gradient-to-bl from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"
          aria-hidden="true"
        />

        {/* 콘텐츠 */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-[var(--header-height)] pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 왼쪽: 텍스트 */}
            <div className="flex flex-col gap-6">
              <p
                className="text-white/40 text-[11px] font-medium tracking-[0.35em] uppercase fade-up"
                data-scroll-animate
              >
                Equipment 02
              </p>
              <div
                className="w-px h-12 bg-white/20 fade-up delay-100"
                data-scroll-animate
                aria-hidden="true"
              />
              <h1
                className="text-white font-light leading-[1.05] tracking-[-0.02em] text-[clamp(2.2rem,6vw,5rem)] fade-up delay-200"
                data-scroll-animate
              >
                아포지<br />엘리트플러스
              </h1>
              <p
                className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-[440px] fade-up delay-300"
                data-scroll-animate
              >
                Apogee Elite Plus &mdash; Dual Wavelength<br />
                755nm + 1064nm | Cryo6 Cooling System
              </p>
            </div>

            {/* 오른쪽: 장비 이미지 */}
            <div
              className="relative flex items-center justify-center fade-up delay-300"
              data-scroll-animate
            >
              <div className="relative w-full max-w-[500px] mx-auto">
                <Image
                  src="/images/original/slide-002.png"
                  alt="아포지 엘리트 플러스 장비"
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fade-up delay-400" data-scroll-animate>
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ── 장비 개요 ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="text-center fade-up" data-scroll-animate>
            <p className="text-[11px] font-medium tracking-[0.35em] text-[#a3a3a3] uppercase mb-4">
              About
            </p>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold tracking-[-0.02em] mb-8 text-[#0a0a0a]">
              5세대 기술의 결정체
            </h2>
            <p className="text-[#737373] leading-[1.9] font-light text-base md:text-lg">
              아포지 엘리트 플러스는 어클레임에서 시작된 레이저 기술의 5세대 진화 모델입니다.
              각 세대마다 출력 안정성, 냉각 효율, 피부 타입 적용 범위가 개선되어 왔으며,
              현재의 아포지 엘리트 플러스는 그 모든 기술적 축적의 최정점에 있는 장비입니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── 진화 타임라인 ── */}
      <section className="py-24 md:py-32 bg-[#f7f7f7]">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="mb-14 fade-up" data-scroll-animate>
            <p className="text-[11px] font-medium tracking-[0.35em] text-[#a3a3a3] uppercase mb-4">
              Evolution
            </p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.02em] text-[#0a0a0a]">
              끊임없는 기술 진화
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-0 fade-up delay-100" data-scroll-animate>
            {HISTORY.map((item, i) => (
              <div key={item.name} className="flex-1 flex flex-row md:flex-col items-center">
                {/* 노드 + 라인 */}
                <div className="flex flex-col md:flex-row items-center w-full">
                  <div
                    className={[
                      "w-3.5 h-3.5 rounded-full shrink-0 border-2 transition-colors",
                      item.highlight
                        ? "bg-[#0a0a0a] border-[#0a0a0a] scale-125"
                        : "bg-white border-[#d4d4d4]",
                    ].join(" ")}
                  />
                  {i < HISTORY.length - 1 && (
                    <div className="w-px h-8 md:w-full md:h-px bg-[#d4d4d4]" aria-hidden="true" />
                  )}
                </div>
                {/* 레이블 */}
                <div className="ml-5 md:ml-0 md:mt-5 md:text-center pb-5 md:pb-0">
                  <p
                    className={[
                      "text-[10px] font-medium tracking-[0.2em] uppercase mb-1",
                      item.highlight ? "text-[#0a0a0a]" : "text-[#a3a3a3]",
                    ].join(" ")}
                  >
                    {item.gen}
                  </p>
                  <p
                    className={[
                      "text-sm md:text-base",
                      item.highlight ? "text-[#0a0a0a] font-bold" : "text-[#737373] font-light",
                    ].join(" ")}
                  >
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 스펙 테이블 ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="mb-14 fade-up" data-scroll-animate>
            <p className="text-[11px] font-medium tracking-[0.35em] text-[#a3a3a3] uppercase mb-4">
              Specification
            </p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.02em] text-[#0a0a0a]">
              장비 사양
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e5e5e5] fade-up delay-100" data-scroll-animate>
            {SPECS.map((spec) => (
              <div key={spec.label} className="bg-[#f7f7f7] p-8">
                <p className="text-[11px] font-medium tracking-[0.2em] text-[#a3a3a3] uppercase mb-3">
                  {spec.label}
                </p>
                <p className="text-lg font-medium tracking-[-0.01em] text-[#0a0a0a]">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 특장점 4가지 ── */}
      <section className="py-24 md:py-32 bg-[#f7f7f7]">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="mb-16 fade-up" data-scroll-animate>
            <p className="text-[11px] font-medium tracking-[0.35em] text-[#a3a3a3] uppercase mb-4">
              Features
            </p>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.02em] text-[#0a0a0a]">
              핵심 기술
            </h2>
          </div>

          <div className="space-y-0">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.num}
                className="grid grid-cols-1 lg:grid-cols-[80px_1fr_2fr] gap-6 lg:gap-10 py-10 border-t border-[#e5e5e5] last:border-b fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* 번호 */}
                <span className="text-[#d4d4d4] text-3xl font-light tracking-tight">
                  {feature.num}
                </span>

                {/* 제목 */}
                <div>
                  <h3 className="text-xl font-bold tracking-[-0.01em] text-[#0a0a0a] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#a3a3a3] font-light">
                    {feature.subtitle}
                  </p>
                </div>

                {/* 설명 */}
                <p className="text-[#737373] leading-[1.9] font-light text-sm md:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 정품 인증 섹션 ── */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <div className="fade-up" data-scroll-animate>
            <p className="text-[11px] font-medium tracking-[0.35em] text-white/40 uppercase mb-6">
              Authenticity
            </p>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.02em] mb-8">
              모리스의원은<br />정품만 사용합니다
            </h2>
            <p className="text-white/50 leading-[1.9] font-light max-w-2xl mx-auto mb-10">
              아포지 엘리트 플러스는 정품 구매 영수증과 보증서가 발급되는 공식 장비입니다.
              유사품과 복제품과는 출력 안정성, 냉각 효율, 시술 결과 모두 다릅니다.
              모리스의원에서 직접 확인하세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="border border-white/20 px-8 py-4 text-sm text-white/60 tracking-wider">
                정품 구매 확인서 보유
              </div>
              <div className="border border-white/20 px-8 py-4 text-sm text-white/60 tracking-wider">
                공식 수입사 인증
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 하단 네비게이션 ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="mb-12 text-center fade-up" data-scroll-animate>
            <p className="text-[11px] font-medium tracking-[0.35em] text-[#a3a3a3] uppercase mb-3">
              Explore
            </p>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#0a0a0a]">더 알아보기</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e5e5e5]">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white px-6 py-10 flex flex-col items-center justify-center gap-3 group transition-colors hover:bg-[#0a0a0a] fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-[10px] font-medium tracking-[0.2em] text-[#a3a3a3] uppercase group-hover:text-white/40 transition-colors">
                  {link.sub}
                </span>
                <span className="text-sm md:text-base font-light tracking-[-0.01em] group-hover:text-white transition-colors text-center">
                  {link.label}
                </span>
                <svg
                  className="w-4 h-4 text-[#d4d4d4] group-hover:text-white/60 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
