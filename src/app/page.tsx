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

/* ═══ About Us 카드 데이터 ═══ */
const ABOUT_CARDS = [
  {
    image: "/images/original/male-face.jpg",
    title: "얼굴제모",
    sub: "시술안내 바로가기",
    href: "/treatment/face",
  },
  {
    image: "/images/original/female-body.jpg",
    title: "바디제모",
    sub: "시술안내 바로가기",
    href: "/treatment/body",
  },
  {
    image: "/images/original/equipment-slide.png",
    title: "젠틀맥스프로플러스",
    sub: "장비소개 바로가기",
    href: "/equipment/gentlemax",
  },
  {
    image: "/images/original/slide-001.png",
    title: "아포지엘리트플러스",
    sub: "장비소개 바로가기",
    href: "/equipment/apogee",
  },
];

/* ═══ 인테리어 갤러리 ═══ */
const INTERIOR_IMAGES = [
  "/images/original/clinic-interior-1.jpg",
  "/images/original/clinic-interior-2.jpg",
  "/images/original/clinic-interior-3.jpg",
];

/* ═══════════════════════════════════════
   메인 페이지
   ═══════════════════════════════════════ */
export default function HomePage() {
  const stat1 = useCountUp(9999);
  const stat2 = useCountUp(100);

  return (
    <>
      {/* ══════════════════════════════════════════
          섹션 1: 히어로 — 풀스크린
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
        <div className="absolute inset-0 bg-black/20" />

        {/* 타이틀 그룹 — 화면 중앙 */}
        <div className="relative z-10 text-center text-white px-6">
          <h1
            className="leading-[1] mb-10"
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              fontStyle: "normal",
            }}
          >
            MOLESS CLINIC
          </h1>

          <p
            className="text-white/80"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.2em",
            }}
          >
            毛 + LESS, 강남역 레이저제모
          </p>
        </div>

        {/* CTA 버튼 — 화면 하단 쪽에 분리 배치 */}
        <div className="absolute bottom-[15vh] left-1/2 -translate-x-1/2 z-10 w-full px-6">
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/pricing/male"
              className="group flex items-center gap-3 justify-center hover:bg-white/10 transition-all"
              style={{
                padding: "14px 44px",
                borderRadius: "200px",
                border: "1px solid rgba(255,255,255,0.5)",
                fontFamily: "var(--font-label)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "var(--color-white)",
                minWidth: "300px",
                transitionDuration: "var(--duration-normal)",
              }}
            >
              <span className="w-5 h-px bg-white/60" />
              남성제모 가격안내 바로가기
            </Link>
            <Link
              href="/pricing/female"
              className="group flex items-center gap-3 justify-center hover:bg-white/10 transition-all"
              style={{
                padding: "14px 44px",
                borderRadius: "200px",
                border: "1px solid rgba(255,255,255,0.5)",
                fontFamily: "var(--font-label)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "var(--color-white)",
                minWidth: "300px",
                transitionDuration: "var(--duration-normal)",
              }}
            >
              <span className="w-5 h-px bg-white/60" />
              여성제모 가격안내 바로가기
            </Link>
          </div>
        </div>

        {/* 스크롤 인디케이터 — 버튼 아래 */}
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
          본사: 제목 → 넉넉한 여백 → 걸어가는 사람 → 여백 → 설명 → 여백 → 카운터
      ══════════════════════════════════════════ */}
      <section className="bg-white">
        {/* 타이틀 — 넉넉한 상단 여백 */}
        <div className="pt-36 md:pt-52 pb-16 md:pb-20 text-center px-6">
          <h2
            className="font-bold fade-up"
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
        </div>

        {/* 걸어가는 사람 — 상하 여백 넉넉 */}
        <div className="flex justify-center py-16 md:py-24">
          <div
            className="relative w-[80px] md:w-[110px] aspect-[1/2.2] fade-up"
            data-scroll-animate
          >
            <Image
              src="/images/original/walking-person.jpg"
              alt="walking person"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 설명 텍스트 — 사람과 카운터 사이 충분한 여백 */}
        <div className="text-center px-6 pb-20 md:pb-28 space-y-3 fade-up" data-scroll-animate>
          <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", color: "var(--color-sub)", lineHeight: 1.8 }}>
            <span style={{ color: "#c00", fontWeight: 700 }}>남성제모(9F)</span>,{" "}
            <span style={{ color: "#c00", fontWeight: 700 }}>여성제모(11F)</span>{" "}
            로 <span style={{ fontWeight: 700 }}>&quot;분리된 공간&quot;</span>
          </p>
          <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", color: "var(--color-sub)", lineHeight: 1.8 }}>
            젠틀맥스프로플러스 <span className="font-bold underline">4대</span>, 아포지엘리트플러스{" "}
            <span className="font-bold underline">2대</span>
          </p>
          <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", color: "var(--color-sub)", lineHeight: 1.8 }}>
            1인 대기실, 1인 시술실 보유
          </p>
          <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", color: "#c00", fontWeight: 700, lineHeight: 1.8 }}>
            남/여 의료진 맞춤시술
          </p>
        </div>

        {/* 카운터 — 설명과 분리, 넉넉한 하단 여백 */}
        <div
          className="flex justify-end gap-16 md:gap-24 pb-28 md:pb-40"
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
          섹션 3: For You
      ══════════════════════════════════════════ */}
      <section
        className="py-20 md:py-32"
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
            For you
          </h2>

          {/* 상단 2열 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {FOR_YOU_CARDS_TOP.map((card, i) => (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-lg group fade-up bg-black"
                data-scroll-animate
                style={{ transitionDelay: `${i * 100}ms`, aspectRatio: "16/10" }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover opacity-70 transition-transform group-hover:scale-105"
                  style={{ transitionDuration: "var(--duration-slow)" }}
                />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white z-10">
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="whitespace-pre-line"
                    style={{
                      fontSize: "clamp(0.75rem, 1vw, 0.85rem)",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.7,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 3열 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FOR_YOU_CARDS_BOTTOM.map((card, i) => (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-lg group fade-up bg-black"
                data-scroll-animate
                style={{ transitionDelay: `${(i + 2) * 100}ms`, aspectRatio: "4/3" }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover opacity-60 transition-transform group-hover:scale-105"
                  style={{ transitionDuration: "var(--duration-slow)" }}
                />
                <div className="absolute bottom-0 left-0 p-5 md:p-6 text-white z-10">
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                      fontWeight: 700,
                      marginBottom: "4px",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="whitespace-pre-line"
                    style={{
                      fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.7,
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
          섹션 4: Interior
      ══════════════════════════════════════════ */}
      <section
        className="py-20 md:py-32"
        style={{ backgroundColor: "#FFF8F0", paddingInline: "var(--container-padding)" }}
      >
        <div style={{ maxWidth: "var(--max-width)", marginInline: "auto" }}>
          <h2
            className="italic mb-10 md:mb-14 fade-up"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 fade-up" data-scroll-animate>
            {INTERIOR_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-lg ${i === 2 ? "md:col-span-2" : ""}`}
                style={{ aspectRatio: i === 2 ? "32/10" : "16/10" }}
              >
                <Image
                  src={src}
                  alt={`clinic interior ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 5: About Us
      ══════════════════════════════════════════ */}
      <section
        className="py-28 md:py-40"
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
            About us
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
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
                  <div className="absolute bottom-0 left-0 p-5 text-white z-10">
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
                      style={{
                        fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)",
                        color: "rgba(255,255,255,0.7)",
                      }}
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
          섹션 6: 스크롤 마퀴
      ══════════════════════════════════════════ */}
      <section className="overflow-hidden py-10 md:py-16 bg-white">
        <div className="animate-scroll-left whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="inline-block mx-6 md:mx-10"
              style={{
                fontFamily: "var(--font-italic)",
                fontSize: "clamp(4rem, 12vw, 10rem)",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "-0.02em",
                color: "var(--color-black)",
              }}
            >
              Moless Clinic
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 7: 오시는 길 + 진료시간
      ══════════════════════════════════════════ */}
      <section className="bg-white py-28 md:py-40">
        <div style={{ maxWidth: "1300px", marginInline: "auto", paddingInline: "var(--container-padding)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* 지도 */}
            <div className="fade-up" data-scroll-animate>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/original/gangnam-map.jpg"
                  alt="모리스의원 위치"
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
            </div>

            {/* 정보 */}
            <div className="fade-up delay-200" data-scroll-animate>
              <h2
                className="mb-8"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.3rem, 2vw, 1.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                오시는 길
              </h2>
              <div className="space-y-2 mb-14" style={{ fontSize: "15px", color: "#333", lineHeight: 1.9 }}>
                <p>서울특별시 강남대로378, 준빌딩</p>
                <p className="font-bold">9층 &nbsp;남성제모</p>
                <p className="font-bold">11층 여성제모 &amp; 상담</p>
                <p style={{ color: "var(--color-meta)", fontSize: "13px" }}>(강남역 2, 3번출구 도보1분)</p>
              </div>

              <h3
                className="mb-6"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.3rem, 2vw, 1.5rem)",
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
          섹션 8: 상담 CTA
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-36"
        style={{ backgroundColor: "var(--color-cta-bg)" }}
      >
        <div
          className="text-center fade-up"
          data-scroll-animate
          style={{ maxWidth: "var(--max-width)", marginInline: "auto", paddingInline: "var(--container-padding)" }}
        >
          <h2
            className="italic mb-8"
            style={{
              fontFamily: "var(--font-italic)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "var(--color-cta-text)",
            }}
          >
            Get in touch
          </h2>
          <p
            className="mb-12"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "var(--color-cta-text)",
              lineHeight: 1.8,
            }}
          >
            편하게 상담받으세요. 네이버 예약, 카카오톡, 전화 상담이 가능합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://booking.naver.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontFamily: "var(--font-label)" }}
            >
              네이버 예약
            </a>
            <a
              href="https://pf.kakao.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontFamily: "var(--font-label)" }}
            >
              카카오톡 상담
            </a>
            <Link
              href="/reservation"
              className="btn btn-outline"
              style={{ fontFamily: "var(--font-label)" }}
            >
              온라인 예약
            </Link>
          </div>

          <a
            href="tel:025556231"
            className="inline-block mt-14 link-underline"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 300,
              letterSpacing: "0.05em",
              color: "var(--color-cta-text)",
            }}
          >
            02-555-6231
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 9: 밤하늘 — 풀스크린
      ══════════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="/images/original/night-sky.jpg"
          alt="night sky"
          fill
          className="object-cover"
        />
      </section>
    </>
  );
}
