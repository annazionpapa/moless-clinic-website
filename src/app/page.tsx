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

/* ─── For You 카드 데이터 (본사 구조 그대로) ─── */
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

/* ─── 메인 페이지 ─── */
export default function HomePage() {
  const stat1 = useCountUp(9999);
  const stat2 = useCountUp(100);

  return (
    <>
      {/* ══════════════════════════════════════════
          섹션 1: 히어로 (본사 1:1)
          - 물 배경 풀스크린
          - MOLESS CLINIC 세리프
          - 毛 + LESS 서브타이틀
          - CTA 버튼 세로 정렬, 대시 접두사
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
          <h1
            className="font-serif text-[clamp(3rem,8vw,7rem)] font-light tracking-[0.04em] leading-[1] mb-8"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            MOLESS CLINIC
          </h1>
          <p className="text-sm md:text-base font-light tracking-[0.2em] text-white/80 mb-14">
            毛 + LESS, 강남역 레이저제모
          </p>

          {/* CTA 버튼 - 본사처럼 세로 정렬, 가운데, 타원형 테두리 */}
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/pricing/male"
              className="group flex items-center gap-3 px-10 py-3 rounded-full border border-white/50 text-white text-[13px] tracking-[0.12em] hover:bg-white/10 transition-all duration-400 min-w-[280px] justify-center"
            >
              <span className="w-5 h-px bg-white/60" />
              남성제모 가격안내 바로가기
            </Link>
            <Link
              href="/pricing/female"
              className="group flex items-center gap-3 px-10 py-3 rounded-full border border-white/50 text-white text-[13px] tracking-[0.12em] hover:bg-white/10 transition-all duration-400 min-w-[280px] justify-center"
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
          - 본사: 흰 배경, 센터 텍스트, 사람 실루엣 중앙, 우측 카운터
          - 세로로 길게 여백 많이
      ══════════════════════════════════════════ */}
      <section className="bg-white">
        {/* 상단 여백 + 타이틀 */}
        <div className="pt-32 md:pt-44 pb-8 text-center px-6">
          <h2
            className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-normal tracking-[0.05em] text-[#999] fade-up"
            data-scroll-animate
          >
            제모를 위한 공간, 모리스의원
          </h2>
        </div>

        {/* 걸어가는 사람 - 본사처럼 화면 중앙, 큰 여백 */}
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

        {/* 카운터 - 본사처럼 우측 정렬 */}
        <div className="flex justify-end gap-12 md:gap-20 pb-24 md:pb-32 px-8 md:px-20 lg:px-32">
          <div ref={stat1.ref} className="text-right fade-up" data-scroll-animate>
            <p className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] leading-none text-black">
              {stat1.count.toLocaleString()}+
            </p>
            <p className="text-xs text-[#999] mt-2 tracking-wider">누적 고객수</p>
          </div>
          <div ref={stat2.ref} className="text-right fade-up delay-200" data-scroll-animate>
            <p className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] leading-none text-black">
              {stat2.count}%
            </p>
            <p className="text-xs text-[#999] mt-2 tracking-wider">정품정량</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 3: For You 카드 그리드
          - 본사: 크림색 배경 #FFF8F0
          - "For you" 이탤릭 세리프
          - 상단 2열 (큰 카드) + 하단 3열 (작은 카드)
          - 카드: 이미지 배경 + 좌하단 텍스트 + 둥근 모서리
      ══════════════════════════════════════════ */}
      <section className="bg-[#FFF8F0] py-16 md:py-24 px-5 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <h2
            className="font-serif italic text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[-0.01em] mb-8 md:mb-12 fade-up"
            data-scroll-animate
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
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
                style={{
                  transitionDelay: `${i * 100}ms`,
                  aspectRatio: "16/10",
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 md:p-7 text-white z-10">
                  <h3 className="text-base md:text-lg font-bold mb-1">{card.title}</h3>
                  <p className="text-xs md:text-sm text-white/80 leading-relaxed whitespace-pre-line">
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
                style={{
                  transitionDelay: `${(i + 2) * 100}ms`,
                  aspectRatio: "4/3",
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 text-white z-10">
                  <h3 className="text-sm md:text-base font-bold mb-1">{card.title}</h3>
                  <p className="text-xs text-white/80 leading-relaxed whitespace-pre-line">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          섹션 4: 오시는 길
          - 본사: 흰 배경, 좌측 지도 + 우측 정보
          - 넉넉한 여백
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-36">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
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

            {/* 정보 - 본사 스타일 */}
            <div className="fade-up delay-200" data-scroll-animate>
              <h2 className="text-2xl md:text-[1.7rem] font-bold mb-6 tracking-tight">
                오시는 길
              </h2>
              <div className="space-y-1.5 text-[15px] text-[#333] mb-10 leading-relaxed">
                <p>서울특별시 강남대로378, 준빌딩</p>
                <p className="font-bold">9층 &nbsp;남성제모</p>
                <p className="font-bold">11층 여성제모 &amp; 상담</p>
                <p className="text-[#888]">(강남역 2, 3번출구 도보1분)</p>
              </div>

              <h3 className="text-2xl md:text-[1.7rem] font-bold mb-5 tracking-tight">
                진료 시간
              </h3>
              <div className="space-y-2 text-[15px] text-[#333]">
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
          섹션 5: 밤하늘 (본사: 풀 스크린 이미지, CTA 없음)
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
