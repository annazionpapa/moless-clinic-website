import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "젠틀맥스프로플러스 | 모리스의원",
  description:
    "미국 Candela사의 최신 레이저 제모 장비 젠틀맥스 프로 플러스. 755nm + 1064nm 듀얼 파장, Cryo 7 냉각 시스템으로 안전하고 효과적인 레이저 제모.",
};

/* ─── 스펙 데이터 ─── */
const SPECS = [
  { label: "제조사", value: "Candela (USA)" },
  { label: "파장", value: "755nm + 1064nm" },
  { label: "레이저 타입", value: "Alexandrite / Nd:YAG" },
  { label: "펄스 지속시간", value: "최소 2ms" },
  { label: "스팟 사이즈", value: "최대 26mm" },
  { label: "냉각 시스템", value: "Cryo 7 (Zimmer)" },
];

/* ─── 특장점 데이터 ─── */
const FEATURES = [
  {
    num: "01",
    title: "듀얼 파장 시스템",
    subtitle: "755nm Alexandrite + 1064nm Nd:YAG",
    desc: "두 가지 파장을 하나의 장비에서 구현합니다. 755nm는 멜라닌 흡수율이 높아 밝은 피부의 굵은 모발에 최적이며, 1064nm는 깊은 침투력으로 어두운 피부 타입에도 안전하게 적용됩니다. 모든 피부 타입에 맞춤 시술이 가능합니다.",
  },
  {
    num: "02",
    title: "2ms 초정밀 펄스",
    subtitle: "얇은 솜털까지 효과적인 시술",
    desc: "최소 2밀리초(ms)의 짧은 펄스 지속 시간으로, 에너지를 정밀하게 모낭에 전달합니다. 굵은 체모는 물론 일반 레이저로 접근이 어려운 얇은 솜털에도 효과적으로 시술이 가능합니다.",
  },
  {
    num: "03",
    title: "Cryo 7 냉각 시스템",
    subtitle: "독일 Zimmer사 | 통증 최소화",
    desc: "시술과 동시에 독일 Zimmer사의 Cryo 7 냉각 시스템이 작동합니다. 영하의 냉기로 피부 표면을 즉각 냉각하여 열 자극을 효과적으로 차단하고, 통증과 홍조를 최소화합니다.",
  },
  {
    num: "04",
    title: "최대 26mm 스팟 사이즈",
    subtitle: "넓은 조사 면적, 빠른 시술",
    desc: "기존 장비 대비 확대된 스팟 사이즈로 한 번에 넓은 면적을 커버합니다. 시술 시간이 단축되어 환자의 부담을 줄이면서도 균일한 에너지 전달이 가능합니다.",
  },
];

/* ─── 하단 네비게이션 ─── */
const NAV_LINKS = [
  { label: "아포지엘리트플러스", href: "/equipment/apogee", sub: "Equipment 02" },
  { label: "여성 가격안내", href: "/pricing/female", sub: "Price" },
  { label: "남성 가격안내", href: "/pricing/male", sub: "Price" },
  { label: "시술 안내", href: "/treatment/face", sub: "Treatment" },
];

export default function GentlemaxPage() {
  return (
    <>
      {/* ── 풀스크린 히어로 ── */}
      <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] flex items-center">
        {/* 배경 그라데이션 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]"
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
                Equipment 01
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
                젠틀맥스<br />프로플러스
              </h1>
              <p
                className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-[440px] fade-up delay-300"
                data-scroll-animate
              >
                GentleMax Pro Plus &mdash; Candela USA<br />
                755nm + 1064nm Dual Wavelength System
              </p>
            </div>

            {/* 오른쪽: 장비 이미지 */}
            <div
              className="relative flex items-center justify-center fade-up delay-300"
              data-scroll-animate
            >
              <div className="relative w-full max-w-[500px] mx-auto">
                <Image
                  src="/images/original/equipment-slide.png"
                  alt="젠틀맥스 프로 플러스 장비"
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
              세계가 선택한 프리미엄 레이저
            </h2>
            <p className="text-[#737373] leading-[1.9] font-light text-base md:text-lg">
              젠틀맥스 프로 플러스는 세계적인 레이저 의료기기 브랜드 미국 Candela사에서 출시한
              최신 제모 레이저 장비입니다. 기존 젠틀맥스 프로의 플랫폼을 계승하면서
              출력과 안정성을 한 단계 더 끌어올린 플래그십 모델로,
              전 세계 피부과 및 제모 전문 의원에서 검증되었습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── 스펙 테이블 ── */}
      <section className="py-24 md:py-32 bg-[#f7f7f7]">
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
              <div key={spec.label} className="bg-white p-8">
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
      <section className="py-24 md:py-32 bg-white">
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
              유사품이나 복제 장비는 일절 사용하지 않습니다.
              젠틀맥스 프로 플러스 정품 구매 영수증과 보증서를 통해 직접 확인하실 수 있습니다.
              장비의 진위 여부는 시술의 안전성과 효과에 직결됩니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="border border-white/20 px-8 py-4 text-sm text-white/60 tracking-wider">
                정품 구매 확인서 보유
              </div>
              <div className="border border-white/20 px-8 py-4 text-sm text-white/60 tracking-wider">
                Candela 공식 인증
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
