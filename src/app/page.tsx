"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ═══ 카운터 훅 ═══ */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const raf = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}

/* ═══ For You 카드 데이터 ═══ */
const FOR_YOU_CARDS_TOP = [
  {
    image: "/images/original/equipment-slide.png",
    title: "정품 제모 장비",
    desc: "젠틀맥스프로플러스 + AIO 핸드피스 4대\n아포지엘리트플러스 2대",
  },
  {
    image: "/images/original/gentlemax-handpiece.jpg",
    title: "맞춤 제모",
    desc: "남/여의사가 개인별 맞춤 시술 1:1로 진행",
  },
];

const FOR_YOU_CARDS_BOTTOM = [
  {
    image: "/images/original/nate-beach.jpg",
    title: "평일 야간/주말 진료",
    desc: "평일  11:00 – 21:00\n주말  10:00 – 17:30",
  },
  {
    image: "/images/original/clinic-interior-2.jpg",
    title: "프라이버시 존중",
    desc: "남/여 제모공간 분리 별도 대기실\n브라질리언 1인 대기실\n남/여의사",
  },
  {
    image: "/images/original/slide-002.png",
    title: "커스터마이징",
    desc: "개인의 모양 및 굵기에 따라 다른 파라미터",
  },
];

/* ═══ About Us 카드 ═══ */
const ABOUT_CARDS = [
  { image: "/images/original/male-face.jpg", title: "얼굴제모", sub: "시술안내 바로가기", href: "/treatment/face" },
  { image: "/images/original/female-body.jpg", title: "바디제모", sub: "시술안내 바로가기", href: "/treatment/body" },
  { image: "/images/original/equipment-slide.png", title: "젠틀맥스프로플러스", sub: "장비소개 바로가기", href: "/equipment/gentlemax" },
  { image: "/images/original/slide-001.png", title: "아포지엘리트플러스", sub: "장비소개 바로가기", href: "/equipment/apogee" },
];

/* ═══ 인테리어 이미지 ═══ */
const INTERIOR_IMAGES = [
  "/images/original/clinic-interior-1.jpg",
  "/images/original/clinic-interior-2.jpg",
  "/images/original/clinic-interior-3.jpg",
];

/* ═══════════════════════════════════════ */
export default function HomePage() {
  const stat1 = useCountUp(9999);
  const stat2 = useCountUp(100);

  return (
    <>
      {/* ══════════════════════════════════════════
          섹션 1 · 히어로
      ══════════════════════════════════════════ */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/original/hero-water.jpg"
            alt="water background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          {/* 메인 타이틀 */}
          <h1
            className="leading-[1] mb-6"
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              fontStyle: "normal",
              color: "var(--color-black)",
            }}
          >
            MOLESS CLINIC
          </h1>

          {/* 서브타이틀 */}
          <p
            className="mb-14 md:mb-16"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.25em",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            毛 + LESS, 강남역 레이저제모
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/pricing/male"
              className="group flex items-center gap-3 justify-center hover:bg-black/5 transition-all"
              style={{
                padding: "15px 44px",
                borderRadius: "200px",
                border: "1px solid rgba(0,0,0,0.25)",
                fontFamily: "var(--font-label)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "var(--color-black)",
                minWidth: "280px",
                transitionDuration: "var(--duration-normal)",
              }}
            >
              <span className="w-5 h-px bg-black/40 transition-all group-hover:w-8" style={{ transitionDuration: "var(--duration-normal)" }} />
              남성제모 가격안내 바로가기
            </Link>
            <Link
              href="/pricing/female"
              className="group flex items-center gap-3 justify-center hover:bg-black/5 transition-all"
              style={{
                padding: "15px 44px",
                borderRadius: "200px",
                border: "1px solid rgba(0,0,0,0.25)",
                fontFamily: "var(--font-label)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "var(--color-black)",
                minWidth: "280px",
                transitionDuration: "var(--duration-normal)",
              }}
            >
              <span className="w-5 h-px bg-black/40 transition-all group-hover:w-8" style={{ transitionDuration: "var(--duration-normal)" }} />
              여성제모 가격안내 바로가기
            </Link>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <Image
            src="/images/original/scroll-down.png"
            alt="scroll down"
            width={50}
            height={50}
            className="animate-spin-slow opacity-40"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 2 · 소개 — 걸어가는 사람 + 설명 + 카운터
      ══════════════════════════════════════════ */}
      <section className="bg-white">
        {/* 제목 + 걸어가는 사람 */}
        <div className="relative pt-48 md:pt-64 pb-40 md:pb-56 text-center px-6">
          <h2
            className="font-bold fade-up relative z-10"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              letterSpacing: "-0.01em",
              color: "var(--color-black)",
              lineHeight: 1.6,
            }}
          >
            제모를 위한 공간, 모리스의원 강남
          </h2>

          {/* 걸어가는 사람 */}
          <div
            className="absolute left-1/2 fade-up"
            data-scroll-animate
            style={{ top: "60%", transform: "translateX(-50%)" }}
          >
            <div className="relative w-[90px] md:w-[120px] aspect-[1/2.2]">
              <Image
                src="/images/original/walking-person.jpg"
                alt="walking person"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* 설명 텍스트 — 본사 원본과 동일한 구성, 넉넉한 여백 */}
        <div className="text-center px-6 pb-24 md:pb-32 space-y-5 fade-up" data-scroll-animate>
          <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: "var(--color-sub)", lineHeight: 2.4 }}>
            <span style={{ color: "#c00", fontWeight: 700 }}>남성제모(9F)</span>,{" "}
            <span style={{ color: "#c00", fontWeight: 700 }}>여성제모(11F)</span>{" "}
            로 <span style={{ fontWeight: 700 }}>&quot;분리된 공간&quot;</span>
          </p>
          <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: "var(--color-sub)", lineHeight: 2.4 }}>
            젠틀맥스프로플러스 <span className="font-bold underline underline-offset-4">4대</span>, 아포지엘리트플러스{" "}
            <span className="font-bold underline underline-offset-4">2대</span>
          </p>
          <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: "var(--color-sub)", lineHeight: 2.4 }}>
            1인 대기실, 1인 시술실 보유
          </p>
          <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: "#c00", fontWeight: 700, lineHeight: 2.4 }}>
            남/여 의료진 맞춤시술
          </p>
        </div>

        {/* 카운터 — 우측 정렬 */}
        <div
          className="flex justify-end gap-20 md:gap-32 pb-40 md:pb-52"
          style={{ paddingInline: "var(--container-padding)" }}
        >
          <div ref={stat1.ref} className="text-right fade-up" data-scroll-animate>
            <p
              className="leading-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-black)",
              }}
            >
              {stat1.count.toLocaleString()}+
            </p>
            <p className="mt-5" style={{ fontSize: "13px", color: "var(--color-meta)", letterSpacing: "0.12em", fontWeight: 400 }}>
              누적 고객수
            </p>
          </div>
          <div ref={stat2.ref} className="text-right fade-up delay-200" data-scroll-animate>
            <p
              className="leading-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-black)",
              }}
            >
              {stat2.count}%
            </p>
            <p className="mt-5" style={{ fontSize: "13px", color: "var(--color-meta)", letterSpacing: "0.12em", fontWeight: 400 }}>
              정품정량
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 3 · For You — 크림 배경
      ══════════════════════════════════════════ */}
      <section
        className="py-36 md:py-48"
        style={{ backgroundColor: "#FFF8F0", paddingInline: "var(--container-padding)" }}
      >
        <div style={{ maxWidth: "var(--max-width)", marginInline: "auto" }}>
          <h2
            className="italic mb-16 md:mb-24 fade-up"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              fontStyle: "italic",
            }}
          >
            For you
          </h2>

          {/* 상단 2열 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
            {FOR_YOU_CARDS_TOP.map((card, i) => (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-lg group fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 120}ms`, aspectRatio: "16/10" }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  style={{ transitionDuration: "var(--duration-slow)" }}
                />
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.08) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 lg:p-12 z-10">
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
                      fontWeight: 700,
                      marginBottom: "10px",
                      letterSpacing: "-0.01em",
                      color: "#ffffff",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="whitespace-pre-line"
                    style={{
                      fontSize: "clamp(0.8rem, 1.1vw, 0.92rem)",
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.9,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 3열 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {FOR_YOU_CARDS_BOTTOM.map((card, i) => (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-lg group fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${(i + 2) * 120}ms`, aspectRatio: "4/3" }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  style={{ transitionDuration: "var(--duration-slow)" }}
                />
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.05) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-9 z-10">
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                      fontWeight: 700,
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                      color: "#ffffff",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="whitespace-pre-line"
                    style={{
                      fontSize: "clamp(0.75rem, 1vw, 0.88rem)",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.9,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 4 · Interior — 백색 배경, 갤러리 레이아웃
      ══════════════════════════════════════════ */}
      <section
        className="py-36 md:py-48"
        style={{ backgroundColor: "#ffffff", paddingInline: "var(--container-padding)" }}
      >
        <div style={{ maxWidth: "var(--max-width)", marginInline: "auto" }}>
          <h2
            className="italic mb-14 md:mb-20 fade-up"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              fontStyle: "italic",
            }}
          >
            Interior
          </h2>

          {/* 상단 2열 — 동일 높이 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5 fade-up" data-scroll-animate>
            <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16/11" }}>
              <Image src={INTERIOR_IMAGES[0]} alt="clinic interior 1" fill className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16/11" }}>
              <Image src={INTERIOR_IMAGES[1]} alt="clinic interior 2" fill className="object-cover" />
            </div>
          </div>

          {/* 하단 1열 — 파노라마 */}
          <div className="fade-up" data-scroll-animate>
            <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "21/9" }}>
              <Image src={INTERIOR_IMAGES[2]} alt="clinic interior 3" fill className="object-cover" />
            </div>
          </div>

          {/* 인테리어 설명 */}
          <p
            className="mt-10 md:mt-14 fade-up"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
              color: "var(--color-meta)",
              lineHeight: 2,
            }}
          >
            프라이빗한 1인 시술실과 대기실로 구성된 편안하고 깨끗한 공간을 제공합니다.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 5 · About Us — 크림 배경, 가로형 4열 카드
      ══════════════════════════════════════════ */}
      <section
        className="py-36 md:py-52"
        style={{ backgroundColor: "#FFF8F0", paddingInline: "var(--container-padding)" }}
      >
        <div style={{ maxWidth: "var(--max-width)", marginInline: "auto" }}>
          <h2
            className="italic mb-16 md:mb-24 fade-up"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              fontStyle: "italic",
            }}
          >
            About us
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {ABOUT_CARDS.map((card, i) => (
              <Link
                key={card.title}
                href={card.href}
                className="group block fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* 카드 이미지 — 가로형 (본사 구조 매칭) */}
                <div className="relative overflow-hidden rounded-lg mb-0" style={{ aspectRatio: "5/4" }}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    style={{ transitionDuration: "var(--duration-slow)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                    <h3
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
                        fontWeight: 700,
                        marginBottom: "5px",
                        letterSpacing: "-0.01em",
                        color: "#ffffff",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(0.65rem, 0.85vw, 0.78rem)",
                        color: "rgba(255,255,255,0.6)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {card.sub} →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 6 · 마퀴 — 대형 스크롤링 텍스트 (본사처럼 거대하게)
      ══════════════════════════════════════════ */}
      <section className="overflow-hidden py-16 md:py-24 bg-white">
        <div className="animate-scroll-left whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="inline-block mx-6 md:mx-12"
              style={{
                fontFamily: "var(--font-italic)",
                fontSize: "clamp(6rem, 18vw, 16rem)",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "-0.03em",
                color: "var(--color-black)",
                lineHeight: 1.1,
              }}
            >
              Moless Clinic
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 7 · 오시는 길 + 진료시간 + 상담안내 (통합)
      ══════════════════════════════════════════ */}
      <section className="bg-white py-36 md:py-52">
        <div style={{ maxWidth: "1300px", marginInline: "auto", paddingInline: "var(--container-padding)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* 좌측: 지도 */}
            <div className="fade-up" data-scroll-animate>
              <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/original/gangnam-map.jpg" alt="모리스의원 위치" fill className="object-cover" />
              </div>
            </div>

            {/* 우측: 오시는 길 + 진료시간 */}
            <div className="fade-up delay-200" data-scroll-animate>
              <h3
                className="mb-10"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.4rem, 2.2vw, 1.7rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                오시는 길
              </h3>
              <div className="space-y-3 mb-16" style={{ fontSize: "15px", color: "#333", lineHeight: 2.4 }}>
                <p>서울특별시 강남대로378, 준빌딩</p>
                <p className="font-bold">9층 &nbsp;남성제모</p>
                <p className="font-bold">11층 여성제모 &amp; 상담</p>
                <p style={{ color: "var(--color-meta)", fontSize: "13px", marginTop: "12px" }}>
                  (강남역 2, 3번출구 도보1분)
                </p>
              </div>

              {/* 구분선 */}
              <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.08)", marginBottom: "2.5rem" }} />

              <h3
                className="mb-10"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.4rem, 2.2vw, 1.7rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                진료 시간
              </h3>
              <div className="space-y-4" style={{ fontSize: "15px", color: "#333" }}>
                <div className="flex gap-12">
                  <span className="font-bold min-w-[3.5rem]">평일</span>
                  <span>
                    11:00 – 21:00 &nbsp;&nbsp;
                    <span style={{ color: "var(--color-meta)", fontSize: "13px" }}>(점심시간 14:00~15:00)</span>
                  </span>
                </div>
                <div className="flex gap-12">
                  <span className="font-bold min-w-[3.5rem]">주말</span>
                  <span>10:00 – 17:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 8 · 상담안내 — 부드러운 크림 배경
      ══════════════════════════════════════════ */}
      <section
        className="py-40 md:py-52"
        style={{ backgroundColor: "#f8f6f3" }}
      >
        <div
          className="text-center fade-up"
          data-scroll-animate
          style={{ maxWidth: "800px", marginInline: "auto", paddingInline: "var(--container-padding)" }}
        >
          <h2
            className="italic mb-12 md:mb-14"
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.01em",
            }}
          >
            상담안내
          </h2>

          {/* 전화번호 */}
          <a
            href="tel:025556231"
            className="inline-block mb-20 md:mb-24"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 300,
              letterSpacing: "0.06em",
              color: "var(--color-black)",
            }}
          >
            TEL : &nbsp;&nbsp;02-555-6231
          </a>

          {/* 예약 버튼들 — 필 버튼 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <a
              href="https://booking.naver.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 40px",
                borderRadius: "200px",
                border: "1px solid rgba(0,0,0,0.12)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--color-black)",
                letterSpacing: "0.02em",
                minWidth: "200px",
                backgroundColor: "white",
                transitionDuration: "var(--duration-normal)",
              }}
            >
              네이버 예약 바로가기
            </a>
            <a
              href="https://pf.kakao.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 40px",
                borderRadius: "200px",
                border: "1px solid rgba(0,0,0,0.12)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--color-black)",
                letterSpacing: "0.02em",
                minWidth: "200px",
                backgroundColor: "white",
                transitionDuration: "var(--duration-normal)",
              }}
            >
              카카오톡 채널 바로가기
            </a>
            <a
              href="https://www.instagram.com/molessclinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 40px",
                borderRadius: "200px",
                border: "1px solid rgba(0,0,0,0.12)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--color-black)",
                letterSpacing: "0.02em",
                minWidth: "200px",
                backgroundColor: "white",
                transitionDuration: "var(--duration-normal)",
              }}
            >
              인스타그램 바로가기
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 9 · 밤하늘 + 걸어가는 사람 — 클로징 이미지
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "80vh" }}>
        <Image src="/images/original/night-sky.jpg" alt="night sky" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.25) 100%)" }} />

        {/* 메시지 */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <p
            className="fade-up"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.02em",
              lineHeight: 1.5,
            }}
          >
            Your Comfort, Our Priority
          </p>
        </div>
      </section>
    </>
  );
}
