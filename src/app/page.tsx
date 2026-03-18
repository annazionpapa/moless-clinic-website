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

/* ═══ For You 카드 ═══ */
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

/* ═══ 인테리어 ═══ */
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
          섹션 1: 히어로
          본사: 물 배경 (밝음), 검정 텍스트
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
        {/* 오버레이 제거 — 본사는 밝은 물 배경에 검정 텍스트 */}

        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          {/* 메인 타이틀 — 검정 */}
          <h1
            className="leading-[1] mb-8"
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

          {/* 서브타이틀 — 타이틀과 버튼 사이 중간 */}
          <p
            className="mb-8"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.2em",
              color: "rgba(0,0,0,0.55)",
            }}
          >
            毛 + LESS, 강남역 레이저제모
          </p>

          {/* CTA 버튼 — 서브타이틀과 가까이 (버튼 1개 높이 정도 간격) */}
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/pricing/male"
              className="group flex items-center gap-3 justify-center hover:bg-black/5 transition-all"
              style={{
                padding: "13px 40px",
                borderRadius: "200px",
                border: "1px solid rgba(0,0,0,0.3)",
                fontFamily: "var(--font-label)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "var(--color-black)",
                minWidth: "280px",
                transitionDuration: "var(--duration-normal)",
              }}
            >
              <span className="w-5 h-px bg-black/40" />
              남성제모 가격안내 바로가기
            </Link>
            <Link
              href="/pricing/female"
              className="group flex items-center gap-3 justify-center hover:bg-black/5 transition-all"
              style={{
                padding: "13px 40px",
                borderRadius: "200px",
                border: "1px solid rgba(0,0,0,0.3)",
                fontFamily: "var(--font-label)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "var(--color-black)",
                minWidth: "280px",
                transitionDuration: "var(--duration-normal)",
              }}
            >
              <span className="w-5 h-px bg-black/40" />
              여성제모 가격안내 바로가기
            </Link>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Image
            src="/images/original/scroll-down.png"
            alt="scroll down"
            width={50}
            height={50}
            className="animate-spin-slow opacity-50"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 2: 소개
          본사: 제목 + 걸어가는 사람(겹침) + 설명 + 카운터
      ══════════════════════════════════════════ */}
      <section className="bg-white">
        {/* 제목 + 걸어가는 사람 — 본사처럼 사람이 글자 아래 레이어로 겹침 */}
        <div className="relative pt-40 md:pt-56 pb-32 md:pb-44 text-center px-6">
          <h2
            className="font-bold fade-up relative z-10"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-black)",
            }}
          >
            제모를 위한 공간, 모리스의원 강남
          </h2>

          {/* 걸어가는 사람 — 제목과 겹침, 중앙 배치 */}
          <div
            className="absolute left-1/2 -translate-x-1/2 fade-up"
            data-scroll-animate
            style={{ top: "55%", transform: "translateX(-50%)" }}
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

        {/* 설명 텍스트 — 넉넉한 상하 여백 */}
        <div className="text-center px-6 pb-16 md:pb-24 space-y-3 fade-up" data-scroll-animate>
          <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "var(--color-sub)", lineHeight: 2 }}>
            <span style={{ color: "#c00", fontWeight: 700 }}>남성제모(9F)</span>,{" "}
            <span style={{ color: "#c00", fontWeight: 700 }}>여성제모(11F)</span>{" "}
            로 <span style={{ fontWeight: 700 }}>&quot;분리된 공간&quot;</span>
          </p>
          <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "var(--color-sub)", lineHeight: 2 }}>
            젠틀맥스프로플러스 <span className="font-bold underline">4대</span>, 아포지엘리트플러스{" "}
            <span className="font-bold underline">2대</span>
          </p>
          <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "var(--color-sub)", lineHeight: 2 }}>
            1인 대기실, 1인 시술실 보유
          </p>
          <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "#c00", fontWeight: 700, lineHeight: 2 }}>
            남/여 의료진 맞춤시술
          </p>
        </div>

        {/* 카운터 — 넉넉한 상하 여백 */}
        <div
          className="flex justify-end gap-16 md:gap-24 pb-32 md:pb-44"
          style={{ paddingInline: "var(--container-padding)" }}
        >
          <div ref={stat1.ref} className="text-right fade-up" data-scroll-animate>
            <p
              className="leading-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-black)",
              }}
            >
              {stat1.count.toLocaleString()}+
            </p>
            <p className="mt-3" style={{ fontSize: "13px", color: "var(--color-meta)", letterSpacing: "0.1em" }}>
              누적 고객수
            </p>
          </div>
          <div ref={stat2.ref} className="text-right fade-up delay-200" data-scroll-animate>
            <p
              className="leading-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-black)",
              }}
            >
              {stat2.count}%
            </p>
            <p className="mt-3" style={{ fontSize: "13px", color: "var(--color-meta)", letterSpacing: "0.1em" }}>
              정품정량
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 3: For You — 크림 배경, 카드 여백 충분히
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-36"
        style={{ backgroundColor: "#FFF8F0", paddingInline: "var(--container-padding)" }}
      >
        <div style={{ maxWidth: "var(--max-width)", marginInline: "auto" }}>
          <h2
            className="italic mb-14 md:mb-20 fade-up"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            For you
          </h2>

          {/* 상단 2열 — 카드 간격 넉넉 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            {FOR_YOU_CARDS_TOP.map((card, i) => (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-xl group fade-up bg-[#111]"
                data-scroll-animate
                style={{ transitionDelay: `${i * 100}ms`, aspectRatio: "16/10" }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover opacity-65 transition-transform group-hover:scale-105"
                  style={{ transitionDuration: "var(--duration-slow)" }}
                />
                {/* 카드 내부 텍스트 — 가장자리에서 충분히 떨어짐 */}
                <div className="absolute bottom-0 left-0 p-7 md:p-10 text-white z-10">
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                      fontWeight: 700,
                      marginBottom: "8px",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="whitespace-pre-line"
                    style={{
                      fontSize: "clamp(0.78rem, 1.1vw, 0.9rem)",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.8,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 3열 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {FOR_YOU_CARDS_BOTTOM.map((card, i) => (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-xl group fade-up bg-[#111]"
                data-scroll-animate
                style={{ transitionDelay: `${(i + 2) * 100}ms`, aspectRatio: "4/3" }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover opacity-55 transition-transform group-hover:scale-105"
                  style={{ transitionDuration: "var(--duration-slow)" }}
                />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white z-10">
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="whitespace-pre-line"
                    style={{
                      fontSize: "clamp(0.72rem, 1vw, 0.85rem)",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.8,
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

      {/* ═══ 섹션 구분선 ═══ */}
      <div style={{ backgroundColor: "#FFF8F0" }}>
        <div
          style={{
            maxWidth: "var(--max-width)",
            marginInline: "auto",
            paddingInline: "var(--container-padding)",
          }}
        >
          <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          섹션 4: Interior — For You와 구분선으로 분리
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-36"
        style={{ backgroundColor: "#FFF8F0", paddingInline: "var(--container-padding)" }}
      >
        <div style={{ maxWidth: "var(--max-width)", marginInline: "auto" }}>
          <h2
            className="italic mb-12 md:mb-16 fade-up"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Interior
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 fade-up" data-scroll-animate>
            {INTERIOR_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-lg ${i === 2 ? "md:col-span-2" : ""}`}
                style={{ aspectRatio: i === 2 ? "32/10" : "16/10" }}
              >
                <Image src={src} alt={`clinic interior ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 섹션 구분선 ═══ */}
      <div style={{ backgroundColor: "#FFF8F0" }}>
        <div
          style={{
            maxWidth: "var(--max-width)",
            marginInline: "auto",
            paddingInline: "var(--container-padding)",
          }}
        >
          <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          섹션 5: About Us — Interior와 구분선으로 분리
      ══════════════════════════════════════════ */}
      <section
        className="py-28 md:py-40"
        style={{ backgroundColor: "#FFF8F0", paddingInline: "var(--container-padding)" }}
      >
        <div style={{ maxWidth: "var(--max-width)", marginInline: "auto" }}>
          <h2
            className="italic mb-14 md:mb-20 fade-up"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            About us
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {ABOUT_CARDS.map((card, i) => (
              <Link
                key={card.title}
                href={card.href}
                className="group block fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    style={{ transitionDuration: "var(--duration-slow)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 md:p-6 text-white z-10">
                    <h3
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(0.85rem, 1.3vw, 1.05rem)",
                        fontWeight: 600,
                        marginBottom: "4px",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="link-underline"
                      style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)", color: "rgba(255,255,255,0.7)" }}
                    >
                      {card.sub}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 6: 스크롤 마퀴 — 본사 크기, 위아래 여백 충분
      ══════════════════════════════════════════ */}
      <section className="overflow-hidden py-16 md:py-24 bg-white">
        <div className="animate-scroll-left whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="inline-block mx-6 md:mx-12"
              style={{
                fontFamily: "var(--font-italic)",
                fontSize: "clamp(5rem, 14vw, 12rem)",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "-0.02em",
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
          섹션 7: 오시는 길 + 진료시간 — 충분한 여백
      ══════════════════════════════════════════ */}
      <section className="bg-white py-32 md:py-48">
        <div style={{ maxWidth: "1300px", marginInline: "auto", paddingInline: "var(--container-padding)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="fade-up" data-scroll-animate>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/original/gangnam-map.jpg" alt="모리스의원 위치" fill className="object-cover" />
              </div>
            </div>

            <div className="fade-up delay-200" data-scroll-animate>
              <h2
                className="mb-8"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                오시는 길
              </h2>
              <div className="space-y-2 mb-16" style={{ fontSize: "15px", color: "#333", lineHeight: 2 }}>
                <p>서울특별시 강남대로378, 준빌딩</p>
                <p className="font-bold">9층 &nbsp;남성제모</p>
                <p className="font-bold">11층 여성제모 &amp; 상담</p>
                <p style={{ color: "var(--color-meta)", fontSize: "13px" }}>(강남역 2, 3번출구 도보1분)</p>
              </div>

              <h3
                className="mb-8"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                진료 시간
              </h3>
              <div className="space-y-3" style={{ fontSize: "15px", color: "#333" }}>
                <div className="flex gap-10">
                  <span className="font-bold min-w-[3.5rem]">평일</span>
                  <span>11:00 – 21:00 &nbsp;&nbsp;(점심시간 14:00~15:00)</span>
                </div>
                <div className="flex gap-10">
                  <span className="font-bold min-w-[3.5rem]">주말</span>
                  <span>10:00 – 17:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 8: 상담안내 — 본사 구조: 여백의 미
          상담안내 제목 + 전화번호 + 예약 버튼들
      ══════════════════════════════════════════ */}
      <section className="bg-white py-28 md:py-40 border-t border-gray-100">
        <div
          className="text-center fade-up"
          data-scroll-animate
          style={{ maxWidth: "800px", marginInline: "auto", paddingInline: "var(--container-padding)" }}
        >
          {/* 상담안내 라벨 */}
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: "var(--color-meta)",
              textTransform: "uppercase",
            }}
          >
            상담안내
          </p>

          {/* 전화번호 — 크고 눈에 띄게 */}
          <a
            href="tel:025556231"
            className="inline-block mb-16 md:mb-20 link-underline"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 300,
              letterSpacing: "0.05em",
              color: "var(--color-black)",
            }}
          >
            TEL : &nbsp;&nbsp;02-555-6231
          </a>

          {/* 예약 버튼들 — 넉넉한 간격 */}
          <div className="flex flex-col items-center gap-5">
            <a
              href="https://booking.naver.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                fontWeight: 500,
                color: "var(--color-black)",
                letterSpacing: "-0.01em",
              }}
            >
              네이버 예약 바로가기
            </a>
            <a
              href="https://pf.kakao.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                fontWeight: 500,
                color: "var(--color-black)",
                letterSpacing: "-0.01em",
              }}
            >
              카카오톡 채널 바로가기
            </a>
            <a
              href="https://www.instagram.com/molessclinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                fontWeight: 500,
                color: "var(--color-black)",
                letterSpacing: "-0.01em",
              }}
            >
              인스타그램 바로가기
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 9: 밤하늘
      ══════════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden">
        <Image src="/images/original/night-sky.jpg" alt="night sky" fill className="object-cover" />
      </section>
    </>
  );
}
