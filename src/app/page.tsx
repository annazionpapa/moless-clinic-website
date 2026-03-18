"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── 카운터 훅 ─── */
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

/* ─── For You 카드 데이터 ─── */
const FOR_YOU_CARDS = [
  {
    image: "/images/original/equipment-slide.png",
    title: "정품 제모 장비",
    desc: "젠틀맥스프로플러스 + AIO 핸드피스 4대\n아포지엘리트플러스 2대",
    size: "large",
  },
  {
    image: "/images/original/gentlemax-handpiece.jpg",
    title: "맞춤 제모",
    desc: "남/여의사가 개인별 맞춤 시술 진행",
    size: "large",
  },
  {
    image: "/images/original/nate-beach.jpg",
    title: "평일 야간/주말 진료",
    desc: "평일 11:00 – 21:00\n주말 10:00 – 17:30",
    size: "small",
  },
  {
    image: "/images/original/clinic-interior-2.jpg",
    title: "프라이버시 존중",
    desc: "남/여 제모공간 분리!\n브라질리언 1인 대기실\n남/여의사",
    size: "small",
  },
  {
    image: "/images/original/clinic-interior-1.jpg",
    title: "커스터마이징",
    desc: "개인의 모양 및 굵기에 따라 다른 파라미터",
    size: "small",
  },
];

/* ─── 메인 페이지 ─── */
export default function HomePage() {
  const stat1 = useCountUp(9999);
  const stat2 = useCountUp(100);

  return (
    <>
      {/* ── 섹션 1: 히어로 ── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/original/hero-water.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* 콘텐츠 */}
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] font-light tracking-[0.02em] leading-[1.05] mb-6">
            MOLESS CLINIC
          </h1>
          <p className="text-base md:text-lg font-light tracking-[0.15em] text-white/80 mb-12">
            毛 + LESS, 강남역 레이저제모
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing/male"
              className="group flex items-center gap-3 px-8 py-4 border border-white/40 text-white text-sm tracking-[0.1em] hover:bg-white hover:text-black transition-all duration-500"
            >
              <span className="w-6 h-px bg-white/50 group-hover:bg-black/50 transition-colors" />
              남성제모 가격안내 바로가기
            </Link>
            <Link
              href="/pricing/female"
              className="group flex items-center gap-3 px-8 py-4 border border-white/40 text-white text-sm tracking-[0.1em] hover:bg-white hover:text-black transition-all duration-500"
            >
              <span className="w-6 h-px bg-white/50 group-hover:bg-black/50 transition-colors" />
              여성제모 가격안내 바로가기
            </Link>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Image
            src="/images/original/scroll-down.png"
            alt="scroll down"
            width={60}
            height={60}
            className="animate-spin-slow opacity-60"
          />
        </div>
      </section>

      {/* ── 섹션 2: 제모를 위한 공간 + 카운터 ── */}
      <section className="bg-[#f5f5f5] py-0">
        <div className="container mx-auto">
          {/* 타이틀 + 걸어가는 사람 */}
          <div className="flex flex-col items-center pt-32 pb-16 px-6">
            <h2
              className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] text-center mb-20 fade-up"
              data-scroll-animate
            >
              제모를 위한 공간, 모리스의원
            </h2>

            <div
              className="relative w-full max-w-[200px] aspect-[3/5] mb-16 fade-up delay-200"
              data-scroll-animate
            >
              <Image
                src="/images/original/walking-person.jpg"
                alt="walking person"
                fill
                className="object-contain grayscale"
              />
            </div>
          </div>

          {/* 카운터 - 우측 정렬 */}
          <div className="flex justify-end gap-16 md:gap-24 pb-24 px-6 md:px-16">
            <div ref={stat1.ref} className="text-right">
              <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.03em] leading-none text-black">
                {stat1.count.toLocaleString()}+
              </p>
              <p className="text-sm text-[#737373] mt-2 tracking-wide">누적 고객수</p>
            </div>
            <div ref={stat2.ref} className="text-right">
              <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.03em] leading-none text-black">
                {stat2.count}%
              </p>
              <p className="text-sm text-[#737373] mt-2 tracking-wide">정품정량</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 섹션 3: For You 이미지 카드 그리드 ── */}
      <section className="bg-[#FFF8F0] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2
            className="font-serif italic text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.01em] mb-12 fade-up"
            data-scroll-animate
          >
            For you
          </h2>

          {/* 2열 대형 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {FOR_YOU_CARDS.filter((c) => c.size === "large").map((card, i) => (
              <div
                key={card.title}
                className="relative aspect-[4/3] overflow-hidden group fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white z-10">
                  <h3 className="text-lg md:text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 3열 소형 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FOR_YOU_CARDS.filter((c) => c.size === "small").map((card, i) => (
              <div
                key={card.title}
                className="relative aspect-[4/3] overflow-hidden group fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${(i + 2) * 100}ms` }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white z-10">
                  <h3 className="text-base md:text-lg font-bold mb-1">{card.title}</h3>
                  <p className="text-xs md:text-sm text-white/80 leading-relaxed whitespace-pre-line">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 섹션 4: 오시는 길 ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* 지도 */}
            <div className="fade-up" data-scroll-animate>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.354!2d127.028!3d37.498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI5JzUyLjgiTiAxMjfCsDAxJzQxLjIiRQ!5e0!3m2!1sko!2skr!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full grayscale"
              />
            </div>

            {/* 정보 */}
            <div className="fade-up delay-200" data-scroll-animate>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">오시는 길</h2>

              <div className="space-y-2 text-base text-[#333] mb-8">
                <p>서울특별시 강남대로378, 준빌딩</p>
                <p>9층 남성제모</p>
                <p>11층 여성제모 &amp; 상담</p>
                <p className="text-[#737373]">(강남역 2, 3번출구 도보1분)</p>
              </div>

              <h3 className="text-2xl font-bold mb-4">진료 시간</h3>
              <div className="space-y-2 text-base text-[#333]">
                <div className="flex gap-6">
                  <span className="font-bold min-w-[4rem]">평일</span>
                  <span>11:00 – 21:00 &nbsp;(점심시간 14:00~15:00)</span>
                </div>
                <div className="flex gap-6">
                  <span className="font-bold min-w-[4rem]">주말</span>
                  <span>10:00 – 17:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 섹션 5: 밤하늘 CTA ── */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url(/images/original/night-sky.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="relative z-10 text-center px-6 fade-up"
          data-scroll-animate
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light text-white tracking-[-0.02em] mb-8 leading-tight">
            지금 바로<br />상담 예약하세요
          </h2>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-3 px-10 py-4 border border-white/50 text-white text-sm tracking-[0.1em] hover:bg-white hover:text-black transition-all duration-500"
          >
            온라인 상담 예약
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
