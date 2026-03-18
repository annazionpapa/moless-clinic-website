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
    desc: "남/여의사가 개인별 맞춤 시술 진행",
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
    desc: "남/여 제모공간 분리\n브라질리언 1인 대기실\n남/여의사",
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
    subtitle: "Face Hair Removal",
    href: "/treatment/face",
  },
  {
    image: "/images/original/female-body.jpg",
    title: "바디제모",
    subtitle: "Body Hair Removal",
    href: "/treatment/body",
  },
  {
    image: "/images/original/equipment-slide.png",
    title: "젠틀맥스프로플러스",
    subtitle: "GentleMax Pro Plus",
    href: "/equipment/gentlemax",
  },
  {
    image: "/images/original/slide-001.png",
    title: "아포지엘리트플러스",
    subtitle: "Apogee Elite Plus",
    href: "/equipment/apogee",
  },
];

/* ═══ 인테리어 갤러리 이미지 ═══ */
const INTERIOR_IMAGES = [
  "/images/original/clinic-interior-1.jpg",
  "/images/original/clinic-interior-2.jpg",
  "/images/original/clinic-interior-3.jpg",
];

/* ═══════════════════════════════════════
   메인 페이지 — 디자인 토큰 기반
   ═══════════════════════════════════════ */
export default function HomePage() {
  const stat1 = useCountUp(9999);
  const stat2 = useCountUp(100);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* 인테리어 슬라이더 자동 전환 */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % INTERIOR_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════
          섹션 1: 히어로 — 풀스크린
          디자인 토큰: Cormorant serif H1, 투명 오버레이
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

        <div className="relative z-10 text-center text-white px-6">
          {/* 메인 타이틀 — 디자인 토큰: Cormorant serif, light weight */}
          <h1
            className="leading-[1] mb-8"
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

          {/* 서브타이틀 — 디자인 토큰: H5 스타일, 0.2em spacing */}
          <p
            className="text-white/80 mb-14"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.2em",
            }}
          >
            毛 + LESS, 강남역 레이저제모
          </p>

          {/* CTA 버튼 — 디자인 토큰: rounded 200px, border-white/50 */}
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/pricing/male"
              className="group flex items-center gap-3 justify-center transition-all"
              style={{
                padding: "13px 40px",
                borderRadius: "200px",
                border: "1px solid rgba(255,255,255,0.5)",
                fontFamily: "var(--font-label)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "var(--color-white)",
                minWidth: "280px",
                transitionDuration: "var(--duration-normal)",
                transitionTimingFunction: "var(--ease-waypoint)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span className="w-5 h-px bg-white/60" />
              남성제모 가격안내 바로가기
            </Link>
            <Link
              href="/pricing/female"
              className="group flex items-center gap-3 justify-center transition-all"
              style={{
                padding: "13px 40px",
                borderRadius: "200px",
                border: "1px solid rgba(255,255,255,0.5)",
                fontFamily: "var(--font-label)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "var(--color-white)",
                minWidth: "280px",
                transitionDuration: "var(--duration-normal)",
                transitionTimingFunction: "var(--ease-waypoint)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span className="w-5 h-px bg-white/60" />
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
          섹션 2: 제모를 위한 공간 + 걸어가는 사람 + 카운터
          디자인 토큰: 흰 배경, 센터 텍스트
      ══════════════════════════════════════════ */}
      <section className="bg-white">
        {/* 상단 타이틀 */}
        <div className="pt-32 md:pt-44 pb-8 text-center px-6">
          <h2
            className="font-normal fade-up"
            data-scroll-animate
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
              letterSpacing: "0.05em",
              color: "var(--color-meta)",
            }}
          >
            제모를 위한 공간, 모리스의원
          </h2>
        </div>

        {/* 걸어가는 사람 */}
        <div className="flex justify-center py-20 md:py-32">
          <div
            className="relative w-[120px] md:w-[160px] aspect-[1/2] fade-up"
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

        {/* 카운터 — 본사 스타일: 우측 정렬 */}
        <div
          className="flex justify-end gap-12 md:gap-20 pb-24 md:pb-32"
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
            <p className="mt-2" style={{ fontSize: "12px", color: "var(--color-meta)", letterSpacing: "0.1em" }}>
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
            <p className="mt-2" style={{ fontSize: "12px", color: "var(--color-meta)", letterSpacing: "0.1em" }}>
              정품정량
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 3: For You 카드 그리드
          디자인 토큰: 크림색 배경, Cormorant 이탤릭 제목
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-5 md:px-10 lg:px-16" style={{ backgroundColor: "#FFF8F0" }}>
        <div style={{ maxWidth: "var(--max-width)", marginInline: "auto" }}>
          <h2
            className="italic mb-8 md:mb-12 fade-up"
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

          {/* 상단 2열 대형 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {FOR_YOU_CARDS_TOP.map((card, i) => (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-xl group fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 100}ms`, aspectRatio: "16/10" }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  style={{ transitionDuration: "var(--duration-slow)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 md:p-7 text-white z-10">
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                      fontWeight: 700,
                      marginBottom: "4px",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="whitespace-pre-line"
                    style={{
                      fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                      color: "rgba(255,255,255,0.8)",
                      lineHeight: 1.6,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 3열 소형 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FOR_YOU_CARDS_BOTTOM.map((card, i) => (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-xl group fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${(i + 2) * 100}ms`, aspectRatio: "4/3" }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  style={{ transitionDuration: "var(--duration-slow)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 text-white z-10">
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
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
                      color: "rgba(255,255,255,0.8)",
                      lineHeight: 1.6,
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
          섹션 4: 인테리어 갤러리/캐러셀
          디자인 토큰: 사진 갤러리, 슬라이드
      ══════════════════════════════════════════ */}
      <section className="relative bg-black overflow-hidden" style={{ height: "80vh" }}>
        {INTERIOR_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: currentSlide === i ? 1 : 0,
              transitionDuration: "1000ms",
              transitionTimingFunction: "var(--ease-waypoint)",
            }}
          >
            <Image
              src={src}
              alt={`clinic interior ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30" />

        {/* 슬라이드 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {INTERIOR_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="w-2 h-2 rounded-full transition-all cursor-pointer"
              style={{
                backgroundColor: currentSlide === i ? "var(--color-white)" : "rgba(255,255,255,0.4)",
                transform: currentSlide === i ? "scale(1.3)" : "scale(1)",
                transitionDuration: "var(--duration-normal)",
              }}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 5: About Us — 시술 안내
          디자인 토큰: 4개 카드, fancy box 스타일
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-36">
        <div style={{ maxWidth: "var(--max-width)", marginInline: "auto", paddingInline: "var(--container-padding)" }}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <h3
                  className="link-underline"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "18px",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    marginBottom: "4px",
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--color-meta)", letterSpacing: "0.02em" }}>
                  {card.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 6: 스크롤 텍스트 마퀴
          디자인 토큰: "Moless Clinic" 반복 스크롤
      ══════════════════════════════════════════ */}
      <section className="overflow-hidden py-12 md:py-16 bg-white border-y border-gray-100">
        <div className="animate-scroll-left whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="inline-block mx-8"
              style={{
                fontFamily: "var(--font-italic)",
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "-0.01em",
                color: i % 2 === 0 ? "var(--color-black)" : "var(--color-meta)",
                opacity: i % 2 === 0 ? 1 : 0.3,
              }}
            >
              Moless Clinic
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 7: 오시는 길 + 진료시간
          디자인 토큰: 2컬럼, 좌측 지도 + 우측 정보
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-36">
        <div style={{ maxWidth: "1300px", marginInline: "auto", paddingInline: "var(--container-padding)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* 지도 */}
            <div className="fade-up" data-scroll-animate>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.354!2d127.028!3d37.498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI5JzUyLjgiTiAxMjfCsDAxJzQxLjIiRQ!5e0!3m2!1sko!2skr!4v1"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>

            {/* 정보 */}
            <div className="fade-up delay-200" data-scroll-animate>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.5rem, 2vw, 1.7rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                오시는 길
              </h2>
              <div className="space-y-1.5 mb-10" style={{ fontSize: "15px", color: "#333", lineHeight: 1.7 }}>
                <p>서울특별시 강남대로378, 준빌딩</p>
                <p className="font-bold">9층 &nbsp;남성제모</p>
                <p className="font-bold">11층 여성제모 &amp; 상담</p>
                <p style={{ color: "var(--color-meta)" }}>(강남역 2, 3번출구 도보1분)</p>
              </div>

              <h3
                className="mb-5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.5rem, 2vw, 1.7rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                진료 시간
              </h3>
              <div className="space-y-2" style={{ fontSize: "15px", color: "#333" }}>
                <div className="flex gap-8">
                  <span className="font-bold min-w-[3rem]">평일</span>
                  <span>11:00 – 21:00 &nbsp;&nbsp;(점심시간 14:00~15:00)</span>
                </div>
                <div className="flex gap-8">
                  <span className="font-bold min-w-[3rem]">주말</span>
                  <span>10:00 – 17:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 8: 상담 안내 — CTA 섹션
          디자인 토큰: #ECEBE9 배경, #4B4F52 텍스트
      ══════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--color-cta-bg)" }}
      >
        <div
          className="text-center fade-up"
          data-scroll-animate
          style={{ maxWidth: "var(--max-width)", marginInline: "auto", paddingInline: "var(--container-padding)" }}
        >
          <h2
            className="italic mb-6"
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
            className="mb-10"
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

          {/* 전화번호 */}
          <a
            href="tel:025556231"
            className="inline-block mt-10 link-underline"
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
          섹션 9: 밤하늘 — 풀스크린 이미지
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
