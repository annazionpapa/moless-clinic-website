"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  REGULAR_PRICING,
  formatKRW,
  type RegularPriceSection,
  type RegularPriceItem,
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

/* ─── 성별 뱃지 ─── */
function GenderBadge({ gender }: { gender: RegularPriceItem["gender"] }) {
  if (gender === "male")
    return (
      <span className="inline-block text-[10px] font-bold tracking-[0.05em] px-2.5 py-1 bg-black text-white">
        남성
      </span>
    );
  if (gender === "female")
    return (
      <span className="inline-block text-[10px] font-bold tracking-[0.05em] px-2.5 py-1 bg-gray-500 text-white">
        여성
      </span>
    );
  return (
    <span className="inline-block text-[10px] font-bold tracking-[0.05em] px-2.5 py-1 border border-black text-black">
      공통
    </span>
  );
}

/* ─── 정상가 테이블 ─── */
function RegularPriceTable({
  section,
  delay = 0,
}: {
  section: RegularPriceSection;
  delay?: number;
}) {
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
              <th className="text-left py-4 px-4 text-[13px] font-bold tracking-wide text-black uppercase w-[70px]">
                구분
              </th>
              <th className="text-left py-4 px-4 text-[13px] font-bold tracking-wide text-black uppercase">
                시술 부위
              </th>
              <th className="text-right py-4 px-4 text-[13px] font-bold tracking-wide text-black uppercase w-[140px]">
                1회 가격
              </th>
            </tr>
          </thead>
          <tbody>
            {section.items.map((item, idx) => (
              <tr
                key={`${item.name}-${item.gender}-${idx}`}
                className={`border-b border-gray-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                } hover:bg-gray-50 transition-colors`}
              >
                <td className="py-5 px-4">
                  <GenderBadge gender={item.gender} />
                </td>
                <td className="py-5 px-4">
                  <p className="font-semibold text-[15px] text-black">{item.name}</p>
                  {item.description && (
                    <p className="text-gray-400 text-[12px] mt-1">{item.description}</p>
                  )}
                </td>
                <td className="py-5 px-4 text-right">
                  <span className="text-[17px] font-bold text-black">
                    {formatKRW(item.price)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RegularPricingPage() {
  const sectionRef = useScrollAnimation();

  return (
    <>
      {/* ─── Fullscreen B&W Hero ─── */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/original/skin-texture.jpg"
          alt="1회 가격안내"
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
            1회 가격안내
          </h1>
        </div>
      </section>

      <div ref={sectionRef}>
        {/* ─── 안내 배너 ─── */}
        <section className="bg-gray-50 py-6 px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto flex flex-wrap gap-6 text-[13px] text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              VAT 별도
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              1회 기준 정상가 (이벤트 미적용)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              마취 크림 기본 제공
            </span>
          </div>
        </section>

        {/* ─── 성별 범례 ─── */}
        <section className="py-20 px-6 md:px-10 lg:px-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <div
              data-scroll-animate
              className="fade-up flex flex-wrap items-center gap-6 mb-14 pb-8 border-b border-gray-200"
            >
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
                범례
              </p>
              <span className="flex items-center gap-2 text-[13px] text-gray-600">
                <span className="inline-block text-[10px] font-bold px-2.5 py-1 bg-black text-white">
                  남성
                </span>
                남성 전용
              </span>
              <span className="flex items-center gap-2 text-[13px] text-gray-600">
                <span className="inline-block text-[10px] font-bold px-2.5 py-1 bg-gray-500 text-white">
                  여성
                </span>
                여성 전용
              </span>
              <span className="flex items-center gap-2 text-[13px] text-gray-600">
                <span className="inline-block text-[10px] font-bold px-2.5 py-1 border border-black text-black">
                  공통
                </span>
                남녀 공통
              </span>
            </div>

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
              1회 정상가 가격표
            </h2>
            <p
              data-scroll-animate
              className="fade-up text-gray-400 text-[14px] mb-14"
              style={{ transitionDelay: "200ms" }}
            >
              회차 패키지 할인은 남성&middot;여성 가격 안내를 참고하세요.
            </p>

            {REGULAR_PRICING.map((section, i) => (
              <RegularPriceTable
                key={section.category}
                section={section}
                delay={i * 100}
              />
            ))}
          </div>
        </section>

        {/* ─── 패키지 링크 ─── */}
        <section className="py-20 px-6 md:px-10 lg:px-16 border-t border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div
              data-scroll-animate
              className="fade-up flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
              <div>
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-3">
                  Package Pricing
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  5회 &middot; 10회 패키지 할인도 확인하세요
                </h2>
                <p className="text-gray-500 mt-2 text-sm">
                  이벤트 기간 패키지 할인 최대 50%
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/pricing/male"
                  className="inline-flex items-center justify-center bg-black text-white hover:bg-black/80 text-sm font-bold tracking-[0.06em] px-8 py-4 transition-colors"
                >
                  남성 패키지
                </Link>
                <Link
                  href="/pricing/female"
                  className="inline-flex items-center justify-center border-2 border-black text-black hover:bg-black hover:text-white text-sm font-bold tracking-[0.06em] px-8 py-4 transition-colors"
                >
                  여성 패키지
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 예약 CTA ─── */}
        <section className="bg-black py-24 px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div data-scroll-animate className="fade-up">
              <p className="text-white/50 text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
                Reservation
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                상담 후 나에게 맞는
                <br />
                플랜을 설계해드립니다
              </h2>
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
                온라인 상담
              </Link>
              <a
                href="https://booking.naver.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 text-sm font-bold tracking-[0.06em] px-8 py-4 transition-colors"
              >
                네이버 예약
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
