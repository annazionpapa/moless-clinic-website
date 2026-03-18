"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ─── Props 타입 ─── */
export interface HeroProps {
  /** 메인 제목 (줄바꿈에 <br /> 또는 배열 사용 가능) */
  title: string | string[];
  /** 서브 타이틀 / 설명 문구 */
  subtitle?: string;
  /** 배경 이미지 URL (없으면 순수 검정 배경) */
  backgroundImage?: string;
  /** 배경 오버레이 강도 (0–1, 기본 0.5) */
  overlayOpacity?: number;
  /** CTA 버튼 (선택) */
  cta?: {
    label: string;
    href: string;
    variant?: "outline-white" | "white";
  };
  /** 페이지 상단 레이블 (예: "TREATMENT 01") */
  eyebrow?: string;
  /** 콘텐츠 정렬 (기본 center) */
  align?: "left" | "center" | "right";
  /** 높이 (기본 100vh) */
  fullHeight?: boolean;
  /** 스크롤 인디케이터 표시 여부 (기본 true) */
  showScrollIndicator?: boolean;
}

/* ─── SCROLL DOWN 회전 인디케이터 ─── */
function ScrollIndicator() {
  const SCROLL_TEXT = "SCROLL DOWN · SCROLL DOWN · SCROLL DOWN · ";

  return (
    <div
      className="absolute bottom-8 right-8 md:bottom-10 md:right-10 flex items-center justify-center cursor-pointer group"
      onClick={() => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }}
      aria-label="아래로 스크롤"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }
      }}
    >
      {/* 회전하는 텍스트 링 */}
      <div className="relative w-20 h-20 animate-spin-slow">
        <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
          <defs>
            <path
              id="circle-path"
              d="M40,40 m-30,0 a30,30 0 1,1 60,0 a30,30 0 1,1 -60,0"
            />
          </defs>
          <text
            fill="white"
            fontSize="7.5"
            fontFamily="var(--font-sans, sans-serif)"
            fontWeight="500"
            letterSpacing="2.2"
          >
            <textPath href="#circle-path">{SCROLL_TEXT}</textPath>
          </text>
        </svg>
      </div>

      {/* 중앙 화살표 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white group-hover:translate-y-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </div>
  );
}

/* ─── 메인 Hero 컴포넌트 ─── */
export default function Hero({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.5,
  cta,
  eyebrow,
  align = "center",
  fullHeight = true,
  showScrollIndicator = true,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  /* 패럴랙스 효과 (배경 이미지가 있을 때) */
  useEffect(() => {
    if (!backgroundImage || !heroRef.current) return;

    const el = heroRef.current;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxOffset = scrollY * 0.4;
      el.style.setProperty("--parallax-y", `${parallaxOffset}px`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [backgroundImage]);

  /* 텍스트 정렬 클래스 */
  const alignClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  /* 제목 배열 처리 */
  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <section
      ref={heroRef}
      className={[
        "relative overflow-hidden bg-black",
        fullHeight ? "min-h-screen" : "min-h-[60vh]",
      ].join(" ")}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundPositionY: "calc(50% + var(--parallax-y, 0px))",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: backgroundImage ? overlayOpacity : 0.85 }}
        aria-hidden="true"
      />

      {/* 그래디언트 (하단 어둡게) */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* 콘텐츠 */}
      <div
        className={[
          "relative z-10 h-full min-h-[inherit]",
          "flex flex-col justify-center",
          alignClasses[align],
          "px-6 md:px-10 lg:px-16",
          "pt-[var(--header-height)] pb-24",
          "max-w-[1440px] mx-auto w-full",
        ].join(" ")}
      >
        {/* 아이브로우 */}
        {eyebrow && (
          <p
            className="text-white/50 text-[11px] font-medium tracking-[0.35em] uppercase mb-6 fade-up"
            data-scroll-animate
          >
            {eyebrow}
          </p>
        )}

        {/* 구분선 */}
        {eyebrow && (
          <div
            className={[
              "w-px h-12 bg-white/30 mb-8 fade-up delay-100",
              align === "center" ? "self-center" : "",
            ].join(" ")}
            data-scroll-animate
            aria-hidden="true"
          />
        )}

        {/* 메인 타이틀 */}
        <h1
          className={[
            "text-white font-light leading-[1.05] tracking-[-0.02em]",
            "text-[clamp(2.5rem,7vw,6.5rem)]",
            "mb-6 fade-up delay-200",
          ].join(" ")}
          data-scroll-animate
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* 서브타이틀 */}
        {subtitle && (
          <p
            className={[
              "text-white/60 text-base md:text-lg font-light leading-relaxed",
              "max-w-[520px]",
              align === "center" ? "self-center" : "",
              "mb-8 fade-up delay-300",
            ].join(" ")}
            data-scroll-animate
          >
            {subtitle}
          </p>
        )}

        {/* CTA 버튼 */}
        {cta && (
          <div className="fade-up delay-400" data-scroll-animate>
            {cta.variant === "white" ? (
              <Link
                href={cta.href}
                className={[
                  "btn inline-flex",
                  "bg-white text-black hover:bg-white/90 transition-colors",
                  "text-sm font-medium tracking-[0.06em]",
                  "px-8 py-4",
                ].join(" ")}
              >
                {cta.label}
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                </svg>
              </Link>
            ) : (
              <Link
                href={cta.href}
                className={[
                  "btn btn-outline-white inline-flex",
                  "text-sm font-medium tracking-[0.06em]",
                  "px-8 py-4",
                ].join(" ")}
              >
                {cta.label}
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                </svg>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* SCROLL DOWN 회전 인디케이터 */}
      {showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}
