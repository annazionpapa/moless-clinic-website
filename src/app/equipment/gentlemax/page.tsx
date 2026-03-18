import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "젠틀맥스프로플러스 | 모리스의원",
  description:
    "미국 Candela사의 최신 레이저 제모 장비 젠틀맥스 프로 플러스. 755nm + 1064nm 듀얼 파장, Cryo 7 냉각 시스템으로 안전하고 효과적인 레이저 제모.",
};

/* ─── 포인트별 특장점 데이터 ─── */
const POINTS = [
  {
    point: "Point 1",
    image: "/images/original/equipment-slide.png",
    imageAlt: "젠틀맥스 프로 플러스 장비",
    title: "미국 candela사",
    desc: "젠틀맥스 프로 플러스는 세계적인 레이저 의료기기 브랜드 미국 Candela사에서 출시한 최신 제모 레이저 장비입니다. 기존 젠틀맥스 프로의 플랫폼을 계승하면서 출력과 안정성을 한 단계 더 끌어올린 플래그십 모델로, 전 세계 피부과 및 제모 전문 의원에서 검증되었습니다.",
  },
  {
    point: "Point 2",
    image: "/images/original/gentlemax-handpiece.jpg",
    imageAlt: "젠틀맥스 핸드피스",
    title: "더 짧은 펄스 지속 기간, 얇은 털 시술 가능",
    desc: "최소 2밀리초(ms)의 짧은 펄스 지속 시간으로, 에너지를 정밀하게 모낭에 전달합니다. 굵은 체모는 물론 일반 레이저로 접근이 어려운 얇은 솜털에도 효과적으로 시술이 가능합니다. 755nm + 1064nm 듀얼 파장으로 모든 피부 타입에 맞춤 시술이 가능합니다.",
  },
  {
    point: "Point 3",
    image: "/images/original/skin-texture.jpg",
    imageAlt: "쿨링 시스템",
    title: "추가 쿨러 장착",
    desc: "시술과 동시에 독일 Zimmer사의 Cryo 7 냉각 시스템이 작동합니다. 영하의 냉기로 피부 표면을 즉각 냉각하여 열 자극을 효과적으로 차단하고, 통증과 홍조를 최소화합니다. 다른 의원과 차별화된 추가 쿨러 장착으로 더욱 편안한 시술을 제공합니다.",
  },
  {
    point: "Point 4",
    image: null,
    imageAlt: "",
    title: "Gentlemax Pro Plus™ AIO handpiece, 정품 사용",
    desc: "모리스의원은 Candela 공식 인증 정품 장비와 AIO 핸드피스만 사용합니다. 유사품이나 복제 장비는 일절 사용하지 않으며, 정품 구매 영수증과 보증서를 통해 직접 확인하실 수 있습니다. 장비의 진위 여부는 시술의 안전성과 효과에 직결됩니다.",
    isLogo: true,
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
      {/* ── 히어로: 흑백 여성 사진 배경 ── */}
      <section className="relative min-h-[80vh] md:min-h-screen overflow-hidden flex items-center justify-center">
        {/* B&W 배경 이미지 */}
        <Image
          src="/images/original/about-hero-woman.jpg"
          alt="배경"
          fill
          className="object-cover grayscale brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" aria-hidden="true" />

        {/* 텍스트 오버레이 */}
        <div className="relative z-10 text-center px-6 pt-[var(--header-height)]">
          <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 fade-up" data-scroll-animate>
            모리스의원
          </p>
          <h1
            className="text-white font-bold leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,7vw,5.5rem)] fade-up delay-200"
            data-scroll-animate
          >
            젠틀맥스프로플러스,
          </h1>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fade-up delay-400" data-scroll-animate>
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ── 브랜드명 섹션 (블랙 배경) ── */}
      <section className="bg-black py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 text-center fade-up" data-scroll-animate>
          <h2 className="text-[#E91E8C] text-[clamp(1.6rem,4vw,3rem)] font-light tracking-[0.05em]">
            Gentlemax Pro Plus&trade;
          </h2>
        </div>
      </section>

      {/* ── 장비 메인 이미지 (블랙 배경) ── */}
      <section className="bg-black py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 fade-up" data-scroll-animate>
          <div className="flex justify-center">
            <Image
              src="/images/original/equipment-slide.png"
              alt="젠틀맥스 프로 플러스 장비"
              width={700}
              height={700}
              className="w-full max-w-[600px] h-auto object-contain"
            />
          </div>
          <div className="text-center mt-12">
            <p className="text-white/80 text-lg md:text-xl tracking-wide font-light">
              CANDELA, 젠틀맥스 프로 플러스&trade;
            </p>
            <div className="w-full max-w-md mx-auto mt-6 h-px bg-white/20" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── 포인트별 특장점 (블랙 배경, 이미지 좌 + 텍스트 우) ── */}
      <section className="bg-black py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-20 md:space-y-28">
          {POINTS.map((point, i) => (
            <div
              key={point.point}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center fade-up"
              data-scroll-animate
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* 왼쪽: 이미지 */}
              <div className="flex justify-center">
                {point.isLogo ? (
                  /* Point 4: CANDELA 로고 영역 */
                  <div className="w-full max-w-[400px] aspect-[4/3] rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Official Partner</p>
                      <p className="text-white/70 text-2xl md:text-3xl font-light tracking-[0.1em]">CANDELA</p>
                      <p className="text-white/30 text-xs tracking-wider mt-2">Authorized Equipment</p>
                    </div>
                  </div>
                ) : point.image ? (
                  <div className="w-full max-w-[400px] aspect-[4/3] rounded-2xl bg-[#141414] overflow-hidden relative">
                    <Image
                      src={point.image}
                      alt={point.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>

              {/* 오른쪽: 텍스트 */}
              <div className="flex flex-col gap-4">
                <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-medium">
                  {point.point}
                </p>
                <h3 className="text-[#E91E8C] text-xl md:text-2xl font-bold leading-snug">
                  {point.title}
                </h3>
                <p className="text-white/60 leading-[1.9] font-light text-sm md:text-base">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 하단 네비게이션 ── */}
      <section className="py-24 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="mb-12 text-center fade-up" data-scroll-animate>
            <p className="text-[11px] font-medium tracking-[0.35em] text-white/30 uppercase mb-3">
              Explore
            </p>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-white">더 알아보기</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-[#0a0a0a] px-6 py-10 flex flex-col items-center justify-center gap-3 group transition-colors hover:bg-[#1a1a1a] fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase group-hover:text-[#E91E8C]/60 transition-colors">
                  {link.sub}
                </span>
                <span className="text-sm md:text-base font-light tracking-[-0.01em] text-white/70 group-hover:text-white transition-colors text-center">
                  {link.label}
                </span>
                <svg
                  className="w-4 h-4 text-white/20 group-hover:text-[#E91E8C]/60 transition-colors"
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
