import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "병원소개",
  description:
    "모리스의원 2호점 — 레이저 제모 전문. 정품 장비, 맞춤 시술, 프라이버시를 최우선으로 하는 제모 전문 의원을 소개합니다.",
};

/* ─── OUR PROMISE 항목 ─── */
const PROMISES = [
  {
    title: "정품 장비만 사용",
    desc: "미국 Candela사의 젠틀맥스 프로 플러스, 어클레임의 아포지 엘리트 플러스 등 검증된 정품 장비만을 사용합니다.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
  },
  {
    title: "맞춤 시술",
    desc: "피부 타입, 모발 색상, 시술 부위에 따라 최적화된 파장과 에너지를 개인별로 설정합니다.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
        />
      </svg>
    ),
  },
  {
    title: "프라이버시 보호",
    desc: "1:1 전용 시술실과 분리된 동선으로 방문부터 귀가까지 완전한 프라이버시를 보장합니다.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── 풀스크린 B&W 히어로 ── */}
      <section className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
        {/* 배경 이미지 (흑백) */}
        <Image
          src="/images/original/about-hero-woman.jpg"
          alt="모리스의원 소개"
          fill
          priority
          className="object-cover grayscale"
          sizes="100vw"
        />

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

        {/* 텍스트 */}
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-white font-bold text-[clamp(2.2rem,6vw,5rem)] leading-[1.15] tracking-[-0.02em] fade-up"
            data-scroll-animate
          >
            <span className="block">레이저제모,</span>
            <span className="block">모리스의원</span>
          </h1>
        </div>

        {/* 스크롤 인디케이터 */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fade-up delay-300"
          data-scroll-animate
        >
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-white/30" />
        </div>
      </section>

      {/* ── OUR PROMISE ── */}
      <section className="section bg-white">
        <div className="container">
          {/* 섹션 헤딩 */}
          <div
            className="text-center mb-16 md:mb-24 fade-up"
            data-scroll-animate
          >
            <p className="text-[11px] font-medium tracking-[0.35em] text-[#a3a3a3] uppercase mb-4">
              Our Promise
            </p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.02em]">
              모리스의원의 약속
            </h2>
          </div>

          {/* 3개 약속 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 max-w-5xl mx-auto">
            {PROMISES.map((p, i) => (
              <div
                key={p.title}
                className="flex flex-col items-center text-center fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* 아이콘 */}
                <div className="w-20 h-20 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#0a0a0a] mb-6">
                  {p.icon}
                </div>

                {/* 제목 */}
                <h3 className="text-lg md:text-xl font-bold tracking-[-0.01em] mb-3">
                  {p.title}
                </h3>

                {/* 구분선 */}
                <div
                  className="w-8 h-px bg-[#d4d4d4] mb-4"
                  aria-hidden="true"
                />

                {/* 설명 */}
                <p className="text-sm text-[#737373] leading-[1.9] font-light max-w-[280px]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 의료진 소개 ── */}
      <section className="section bg-[#f9f9f9]">
        <div className="container">
          {/* 섹션 헤딩 */}
          <div
            className="text-center mb-16 md:mb-20 fade-up"
            data-scroll-animate
          >
            <p className="text-[11px] font-medium tracking-[0.35em] text-[#a3a3a3] uppercase mb-4">
              Medical Team
            </p>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.02em]">
              의료진 소개
            </h2>
          </div>

          {/* 의료진 카드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
            {/* 이미지 */}
            <div
              className="relative aspect-[3/4] max-w-md mx-auto w-full overflow-hidden fade-up"
              data-scroll-animate
            >
              <Image
                src="/images/original/clinic-interior-1.jpg"
                alt="모리스의원 의료진"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* 텍스트 */}
            <div
              className="flex flex-col gap-6 fade-up delay-200"
              data-scroll-animate
            >
              <div>
                <p className="text-[11px] font-medium tracking-[0.35em] text-[#a3a3a3] uppercase mb-3">
                  Moless Clinic
                </p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-2">
                  레이저제모는? 모리스의원.
                </h3>
              </div>

              <div className="w-10 h-px bg-[#d4d4d4]" aria-hidden="true" />

              <div className="space-y-5 text-[#525252] font-light leading-[1.9] text-[15px]">
                <p>
                  모리스의원은 제모 한 분야에 집중하는 레이저 제모 전문
                  의원입니다. 다양한 시술을 나열하는 대신, 레이저 제모만큼은
                  최고의 결과를 약속합니다.
                </p>
                <p>
                  검증된 정품 장비와 개인별 맞춤 에너지 설정, 전문 의료진의
                  시술로 안전하고 효과적인 레이저 제모를 경험하세요.
                </p>
                <p>
                  프라이버시를 최우선으로 설계된 공간에서, 불필요한 과정 없이
                  제모 시술에만 집중합니다.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  href="/equipment/gentlemax"
                  className="btn btn-outline text-sm tracking-[0.06em]"
                >
                  장비 소개 보기
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"
                    />
                  </svg>
                </Link>
                <Link
                  href="/reservation"
                  className="btn btn-primary text-sm tracking-[0.06em]"
                >
                  예약하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      <section className="section bg-[#0a0a0a] text-white text-center">
        <div className="container max-w-2xl">
          <p
            className="text-[11px] font-medium tracking-[0.35em] text-white/40 uppercase mb-6 fade-up"
            data-scroll-animate
          >
            Get Started
          </p>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] mb-8 fade-up delay-100"
            data-scroll-animate
          >
            지금 상담을 시작하세요
          </h2>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center fade-up delay-200"
            data-scroll-animate
          >
            <Link
              href="/reservation"
              className="btn btn-outline-white text-sm tracking-[0.06em] px-8 py-4"
            >
              네이버 예약
            </Link>
            <Link
              href="/pricing/female"
              className="btn border border-white/20 text-white/60 hover:text-white hover:border-white/60 text-sm tracking-[0.06em] px-8 py-4 transition-colors"
            >
              가격 안내 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
