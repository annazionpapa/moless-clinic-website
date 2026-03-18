"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FEMALE_PRICING,
  EVENT_INFO,
  NO_ANESTHESIA_CHALLENGE,
  formatKRW,
  type PriceSection,
  type PriceItem,
} from "@/data/pricing";

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-scroll-animate]");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── 가격 테이블 ─── */
function PriceTable({ section, delay = 0 }: { section: PriceSection; delay?: number }) {
  return (
    <div
      data-scroll-animate
      className="fade-up mb-16"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-lg font-bold tracking-tight text-black mb-6 pb-3 border-b-2 border-black">
        {section.category}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black">
              <th className="text-left py-4 px-4 text-[13px] font-bold tracking-wide text-black uppercase">
                시술 부위
              </th>
              <th className="text-center py-4 px-4 text-[13px] font-bold tracking-wide text-black uppercase w-[140px]">
                5회
              </th>
              <th className="text-center py-4 px-4 text-[13px] font-bold tracking-wide text-black uppercase w-[140px]">
                10회
              </th>
            </tr>
          </thead>
          <tbody>
            {section.items.map((item, idx) => (
              <tr
                key={item.name}
                className={`border-b border-gray-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                } hover:bg-gray-50 transition-colors`}
              >
                <td className="py-5 px-4">
                  <p className="font-semibold text-[15px] text-black">{item.name}</p>
                  {item.description && (
                    <p className="text-gray-400 text-[12px] mt-1">{item.description}</p>
                  )}
                </td>
                {item.sessions?.map((s) => (
                  <td key={s.label} className="py-5 px-4 text-center">
                    <span className="block text-[12px] text-gray-400 line-through">
                      {formatKRW(s.original)}
                    </span>
                    <span className="block text-[17px] font-bold text-black mt-0.5">
                      {formatKRW(s.sale)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function FemalePricingPage() {
  const sectionRef = useScrollAnimation();

  return (
    <>
      {/* ─── Fullscreen B&W Hero ─── */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/original/about-hero-woman.jpg"
          alt="여성제모 가격안내"
          fill
          priority
          className="object-cover grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <p className="text-white/60 text-[13px] tracking-[0.4em] uppercase font-medium mb-4">
            모리스의원
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">
            여성제모 가격안내
          </h1>
        </div>
      </section>

      <div ref={sectionRef}>
        {/* ─── 이벤트 배너 ─── */}
        <section className="bg-black py-10 px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div
              data-scroll-animate
              className="fade-up flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div>
                <p className="text-white/50 text-[10px] font-medium tracking-[0.3em] uppercase mb-1">
                  Event
                </p>
                <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                  {EVENT_INFO.title}
                </h2>
              </div>
              <div className="md:text-right">
                <p className="text-white/60 text-sm">{EVENT_INFO.period}</p>
                <p className="text-white/40 text-[13px] mt-0.5">{EVENT_INFO.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 안내 배너 ─── */}
        <section className="bg-gray-50 py-6 px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto flex flex-wrap gap-6 text-[13px] text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              VAT 별도
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              여자 의사 시술
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              1인 시술실 &middot; 1인 대기실
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              이벤트 가격 기간 한정
            </span>
          </div>
        </section>

        {/* ─── No 마취 챌린지 ─── */}
        <section className="py-20 px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div
              data-scroll-animate
              className="fade-up border-2 border-black p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1">
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-2">
                    Challenge
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                    {NO_ANESTHESIA_CHALLENGE.title}
                  </h3>
                  <p className="text-gray-500 text-[14px] leading-relaxed">
                    {NO_ANESTHESIA_CHALLENGE.description}
                  </p>
                </div>
                <div className="flex flex-col gap-4 md:min-w-[240px]">
                  {NO_ANESTHESIA_CHALLENGE.rules.map((rule) => (
                    <div
                      key={rule.sessions}
                      className="flex items-center gap-4 border border-black px-5 py-4"
                    >
                      <span className="text-3xl font-bold text-black">{rule.sessions}회</span>
                      <div>
                        <span className="text-[11px] text-gray-400 block">성공 시</span>
                        <span className="text-lg font-bold text-black">+{rule.bonus}회 추가</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 가격표 ─── */}
        <section className="py-20 px-6 md:px-10 lg:px-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <p
              data-scroll-animate
              className="fade-up text-[11px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-4"
            >
              Price List
            </p>
            <h2
              data-scroll-animate
              className="fade-up text-3xl md:text-4xl font-bold tracking-tight mb-3"
              style={{ transitionDelay: "100ms" }}
            >
              여성 제모 가격표
            </h2>
            <p
              data-scroll-animate
              className="fade-up text-gray-400 text-[14px] mb-14"
              style={{ transitionDelay: "200ms" }}
            >
              이벤트 가격 &middot; VAT 별도
            </p>

            {FEMALE_PRICING.map((section, i) => (
              <PriceTable key={section.category} section={section} delay={i * 100} />
            ))}
          </div>
        </section>

        {/* ─── 하단 CTA ─── */}
        <section className="bg-black py-24 px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div data-scroll-animate className="fade-up">
              <p className="text-white/50 text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
                Reservation
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                지금 바로 예약하세요
              </h2>
              <p className="text-white/50 text-sm mt-2">
                1회 정상가는 정상가 가격표에서 확인하세요
              </p>
            </div>
            <div
              data-scroll-animate
              className="fade-up flex flex-col sm:flex-row gap-3"
              style={{ transitionDelay: "200ms" }}
            >
              <Link
                href="/reservation"
                className="inline-flex items-center justify-center bg-white text-black hover:bg-white/90 text-sm font-bold tracking-[0.06em] px-8 py-4 transition-colors"
              >
                온라인 예약
              </Link>
              <Link
                href="/pricing/regular"
                className="inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 text-sm font-bold tracking-[0.06em] px-8 py-4 transition-colors"
              >
                1회 정상가 보기
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
