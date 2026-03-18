"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ═══════════════════════════════════════════════════
   카운터 훅
═══════════════════════════════════════════════════ */
function useCountUp(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return { count, ref };
}

/* ═══════════════════════════════════════════════════
   데이터
═══════════════════════════════════════════════════ */
const FOR_YOU = [
  {
    img: "/images/original/equipment-slide.png",
    title: "정품 제모 장비",
    desc: "젠틀맥스프로플러스 + AIO 핸드피스 4대\n아포지엘리트플러스 2대",
    wide: true,
  },
  {
    img: "/images/original/gentlemax-handpiece.jpg",
    title: "맞춤 제모",
    desc: "남/여의사가 개인별 맞춤 시술\n1:1로 진행합니다",
    wide: true,
  },
  {
    img: "/images/original/nate-beach.jpg",
    title: "평일 야간 / 주말 진료",
    desc: "평일 11:00 – 21:00\n주말 10:00 – 17:30",
    wide: false,
  },
  {
    img: "/images/original/clinic-interior-2.jpg",
    title: "프라이버시 존중",
    desc: "남/여 제모공간 분리\n브라질리언 1인 대기실",
    wide: false,
  },
  {
    img: "/images/original/slide-002.png",
    title: "커스터마이징",
    desc: "개인의 모양 및 굵기에 따라\n다른 파라미터 적용",
    wide: false,
  },
];

const ABOUT_CARDS = [
  { img: "/images/original/male-face.jpg", label: "얼굴제모", sub: "시술안내 바로가기", href: "/treatment/face" },
  { img: "/images/original/female-body.jpg", label: "바디제모", sub: "시술안내 바로가기", href: "/treatment/body" },
  { img: "/images/original/equipment-slide.png", label: "젠틀맥스프로플러스", sub: "장비소개 바로가기", href: "/equipment/gentlemax" },
  { img: "/images/original/slide-001.png", label: "아포지엘리트플러스", sub: "장비소개 바로가기", href: "/equipment/apogee" },
];

const INTERIOR = [
  "/images/original/clinic-interior-1.jpg",
  "/images/original/clinic-interior-2.jpg",
  "/images/original/clinic-interior-3.jpg",
];

/* ═══════════════════════════════════════════════════
   공통 스타일
═══════════════════════════════════════════════════ */
const SECTION_PAD = { paddingInline: "var(--container-padding)" } as const;
const CONTAINER = { maxWidth: "var(--max-width)", marginInline: "auto" } as const;

const sectionLabel = (text: string) => (
  <p
    className="fade-up mb-5"
    data-scroll-animate
    style={{
      fontFamily: "var(--font-label)",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.22em",
      color: "var(--color-meta)",
      textTransform: "uppercase" as const,
    }}
  >
    {text}
  </p>
);

const sectionTitle = (text: string, className = "") => (
  <h2
    className={`fade-up ${className}`}
    data-scroll-animate
    style={{
      fontFamily: "var(--font-italic)",
      fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
      fontWeight: 400,
      fontStyle: "italic",
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
    }}
  >
    {text}
  </h2>
);

/* ═══════════════════════════════════════════════════
   메인 페이지
═══════════════════════════════════════════════════ */
export default function HomePage() {
  const s1 = useCountUp(9999);
  const s2 = useCountUp(100);

  return (
    <>
      {/* ─────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/original/hero-water.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />

        <div className="relative z-10 text-center px-6">
          <h1
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(2.6rem, 7.5vw, 6rem)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: "var(--color-black)",
              lineHeight: 1.05,
              marginBottom: "1.2rem",
            }}
          >
            MOLESS CLINIC
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
              fontWeight: 300,
              letterSpacing: "0.3em",
              color: "rgba(0,0,0,0.45)",
              marginBottom: "3.5rem",
            }}
          >
            毛 + LESS, 강남역 레이저제모
          </p>

          <div className="flex flex-col items-center gap-3">
            {[
              { href: "/pricing/male", text: "남성제모 가격안내 바로가기" },
              { href: "/pricing/female", text: "여성제모 가격안내 바로가기" },
            ].map((btn) => (
              <Link
                key={btn.href}
                href={btn.href}
                className="group flex items-center gap-3 justify-center transition-all hover:bg-black/5"
                style={{
                  padding: "14px 40px",
                  borderRadius: "200px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  fontFamily: "var(--font-label)",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  color: "var(--color-black)",
                  minWidth: "270px",
                  transitionDuration: "var(--duration-normal)",
                }}
              >
                <span className="w-5 h-px bg-black/30 transition-all group-hover:w-8" style={{ transitionDuration: "var(--duration-normal)" }} />
                {btn.text}
              </Link>
            ))}
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Image
            src="/images/original/scroll-down.png"
            alt="scroll"
            width={44}
            height={44}
            className="animate-spin-slow opacity-35"
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          INTRO — 걸어가는 사람 + 설명 + 카운터
      ───────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        {/* 타이틀 + 걸어가는 사람 (겹침 레이아웃 — 원본 매칭) */}
        <div className="relative text-center" style={{ paddingTop: "clamp(8rem, 16vh, 14rem)", paddingBottom: "clamp(6rem, 14vh, 12rem)" }}>
          <h2
            className="fade-up relative z-10"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--color-black)",
              lineHeight: 1.7,
            }}
          >
            제모를 위한 공간, 모리스의원 강남
          </h2>

          {/* 걸어가는 사람 — 타이틀 아래, 작고 섬세하게 */}
          <div className="flex justify-center fade-up" data-scroll-animate style={{ marginTop: "0.5rem" }}>
            <div className="relative" style={{ width: "clamp(100px, 12vw, 160px)", aspectRatio: "2/3" }}>
              <Image src="/images/original/walking-person.jpg" alt="" fill className="object-cover" style={{ objectPosition: "center 65%" }} />
            </div>
          </div>
        </div>

        {/* 설명 */}
        <div
          className="text-center px-6 fade-up"
          data-scroll-animate
          style={{ paddingBottom: "clamp(3rem, 6vh, 5rem)" }}
        >
          {[
            { text: <>
                <span style={{ color: "#c00", fontWeight: 700 }}>남성제모(9F)</span>,{" "}
                <span style={{ color: "#c00", fontWeight: 700 }}>여성제모(11F)</span>{" "}
                로 <strong>&quot;분리된 공간&quot;</strong>
              </> },
            { text: <>젠틀맥스프로플러스 <span className="font-bold underline underline-offset-4 decoration-1">4대</span>, 아포지엘리트플러스 <span className="font-bold underline underline-offset-4 decoration-1">2대</span></> },
            { text: "1인 대기실, 1인 시술실 보유" },
            { text: <span style={{ color: "#c00", fontWeight: 700 }}>남/여 의료진 맞춤시술</span> },
          ].map((line, i) => (
            <p
              key={i}
              style={{
                fontSize: "clamp(0.88rem, 1.3vw, 1.05rem)",
                color: "var(--color-sub)",
                lineHeight: 2.6,
                fontFamily: "var(--font-body)",
              }}
            >
              {line.text}
            </p>
          ))}
        </div>

        {/* 카운터 */}
        <div
          className="flex justify-end gap-16 md:gap-28"
          style={{ ...SECTION_PAD, paddingBottom: "clamp(5rem, 10vh, 9rem)" }}
        >
          {[
            { ref: s1.ref, value: `${s1.count.toLocaleString()}+`, label: "누적 고객수" },
            { ref: s2.ref, value: `${s2.count}%`, label: "정품정량" },
          ].map((stat) => (
            <div key={stat.label} ref={stat.ref} className="text-right fade-up" data-scroll-animate>
              <p style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-black)",
                lineHeight: 1,
              }}>
                {stat.value}
              </p>
              <p style={{ fontSize: "12px", color: "var(--color-meta)", letterSpacing: "0.15em", marginTop: "14px" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          FOR YOU — 크림 배경
      ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#FAF8F5", ...SECTION_PAD, paddingBlock: "clamp(5rem, 10vh, 9rem)" }}>
        <div style={CONTAINER}>
          {sectionTitle("For you", "mb-14 md:mb-20")}

          {/* 상단 2열 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {FOR_YOU.filter(c => c.wide).map((card, i) => (
              <div
                key={card.title}
                className="relative overflow-hidden group fade-up"
                data-scroll-animate
                style={{ aspectRatio: "16/10", transitionDelay: `${i * 100}ms` }}
              >
                <Image src={card.img} alt={card.title} fill className="object-cover transition-transform group-hover:scale-[1.04]" style={{ transitionDuration: "0.8s" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9 z-10">
                  <h3 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.4vw, 1.2rem)", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                    {card.title}
                  </h3>
                  <p className="whitespace-pre-line" style={{ fontSize: "clamp(0.75rem, 1vw, 0.88rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 3열 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FOR_YOU.filter(c => !c.wide).map((card, i) => (
              <div
                key={card.title}
                className="relative overflow-hidden group fade-up"
                data-scroll-animate
                style={{ aspectRatio: "4/3", transitionDelay: `${(i + 2) * 100}ms` }}
              >
                <Image src={card.img} alt={card.title} fill className="object-cover transition-transform group-hover:scale-[1.04]" style={{ transitionDuration: "0.8s" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  <h3 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                    {card.title}
                  </h3>
                  <p className="whitespace-pre-line" style={{ fontSize: "clamp(0.72rem, 0.9vw, 0.82rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          INTERIOR — 동일 크림 배경
      ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#FAF8F5", ...SECTION_PAD, paddingBottom: "clamp(5rem, 10vh, 9rem)" }}>
        <div style={CONTAINER}>
          {sectionTitle("Interior", "mb-12 md:mb-16")}

          {/* 사진 그리드 — 가로 스크롤 느낌 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-up" data-scroll-animate>
            {INTERIOR.map((src, i) => (
              <div key={src} className="relative overflow-hidden" style={{ aspectRatio: i === 0 ? "4/3" : "4/3" }}>
                <Image src={src} alt={`interior ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          ABOUT US — 동일 크림 배경
      ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#FAF8F5", ...SECTION_PAD, paddingBottom: "clamp(6rem, 12vh, 11rem)" }}>
        <div style={CONTAINER}>
          {sectionTitle("About us", "mb-12 md:mb-16")}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ABOUT_CARDS.map((card, i) => (
              <Link
                key={card.label}
                href={card.href}
                className="group block fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={card.img}
                    alt={card.label}
                    fill
                    className="object-cover transition-transform group-hover:scale-[1.04]"
                    style={{ transitionDuration: "0.8s" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                    <h3 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.82rem, 1.1vw, 1rem)", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                      {card.label}
                    </h3>
                    <p style={{ fontSize: "clamp(0.62rem, 0.8vw, 0.72rem)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.02em" }}>
                      {card.sub} →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          MARQUEE
      ───────────────────────────────────────────── */}
      <section className="overflow-hidden bg-white" style={{ paddingBlock: "clamp(2rem, 4vh, 4rem)" }}>
        <div className="animate-scroll-left whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="inline-block mx-4 md:mx-8"
              style={{
                fontFamily: "var(--font-italic)",
                fontSize: "clamp(5rem, 16vw, 14rem)",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "-0.04em",
                color: "var(--color-black)",
                lineHeight: 1.1,
              }}
            >
              Moless Clinic
            </span>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          LOCATION & HOURS
      ───────────────────────────────────────────── */}
      <section className="bg-white" style={{ ...SECTION_PAD, paddingBlock: "clamp(5rem, 10vh, 9rem)" }}>
        <div style={{ maxWidth: "1200px", marginInline: "auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* 지도 */}
            <div className="fade-up" data-scroll-animate>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/original/gangnam-map.jpg" alt="위치" fill className="object-cover" />
              </div>
            </div>

            {/* 정보 */}
            <div className="fade-up" data-scroll-animate>
              <h3 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
                오시는 길
              </h3>
              <div style={{ fontSize: "14px", color: "#444", lineHeight: 2.4, marginBottom: "3rem" }}>
                <p>서울특별시 강남대로378, 준빌딩</p>
                <p><strong>9층</strong> &nbsp;남성제모</p>
                <p><strong>11층</strong> 여성제모 &amp; 상담</p>
                <p style={{ color: "var(--color-meta)", fontSize: "12px", marginTop: "6px" }}>(강남역 2, 3번출구 도보 1분)</p>
              </div>

              <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", marginBottom: "2rem" }} />

              <h3 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
                진료 시간
              </h3>
              <div style={{ fontSize: "14px", color: "#444", lineHeight: 2.4 }}>
                <div className="flex gap-10">
                  <span className="font-bold" style={{ minWidth: "3rem" }}>평일</span>
                  <span>11:00 – 21:00 <span style={{ color: "var(--color-meta)", fontSize: "12px" }}>(점심 14:00~15:00)</span></span>
                </div>
                <div className="flex gap-10">
                  <span className="font-bold" style={{ minWidth: "3rem" }}>주말</span>
                  <span>10:00 – 17:30</span>
                </div>
              </div>

              {/* 전화 + 예약 */}
              <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <a
                  href="tel:025556231"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 300,
                    letterSpacing: "0.05em",
                    color: "var(--color-black)",
                    marginBottom: "1.5rem",
                  }}
                >
                  02-555-6231
                </a>
                <div className="flex flex-wrap gap-3">
                  {[
                    { href: "https://booking.naver.com/", label: "네이버 예약" },
                    { href: "https://pf.kakao.com/", label: "카카오톡 채널" },
                    { href: "https://www.instagram.com/molessclinic/", label: "Instagram" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all hover:shadow-md hover:-translate-y-px"
                      style={{
                        padding: "10px 24px",
                        borderRadius: "200px",
                        border: "1px solid rgba(0,0,0,0.12)",
                        fontSize: "12px",
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        color: "var(--color-black)",
                        letterSpacing: "0.03em",
                        transitionDuration: "var(--duration-normal)",
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          CLOSING — 감성 이미지
      ───────────────────────────────────────────── */}
      <section className="relative" style={{ height: "clamp(50vh, 65vh, 75vh)" }}>
        <Image src="/images/original/about-hero-woman.jpg" alt="" fill className="object-cover" style={{ filter: "grayscale(1)" }} />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-6">
          <p
            className="fade-up"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.01em",
              lineHeight: 1.6,
            }}
          >
            레이저제모, 모리스의원
          </p>
        </div>
      </section>
    </>
  );
}
