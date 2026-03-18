"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── 스크롤 애니메이션 훅 ─── */
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-scroll-animate]");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const treatments = [
  {
    title: "얼굴제모",
    subtitle: "Face Hair Removal",
    description: "남성 수염부터 여성 잔털까지, 피부 타입에 맞춘 1:1 맞춤 시술",
    image: "/images/original/male-face.jpg",
    href: "/treatment/face",
  },
  {
    title: "바디제모",
    subtitle: "Body Hair Removal",
    description: "겨드랑이부터 브라질리언까지, 프라이버시가 보장되는 1인 시술실",
    image: "/images/original/female-body.jpg",
    href: "/treatment/body",
  },
];

export default function TreatmentIndexPage() {
  const sectionRef = useScrollAnimation();

  return (
    <>
      {/* ─── 히어로 ─── */}
      <section className="relative min-h-[60vh] overflow-hidden bg-black flex items-end">
        <div className="absolute inset-0 bg-black" aria-hidden="true" />
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-20 pt-[var(--header-height)] max-w-[1440px] mx-auto w-full">
          <p className="text-white/40 text-[11px] font-medium tracking-[0.35em] uppercase mb-6">
            Treatment
          </p>
          <h1 className="text-white font-light text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.03em] mb-4">
            시술 안내
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-[480px]">
            모리스의원의 의료 레이저 제모를 소개합니다
          </p>
        </div>
      </section>

      {/* ─── 시술 선택 ─── */}
      <div ref={sectionRef} className="bg-white">
        <section className="section container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {treatments.map((item, i) => (
              <Link
                key={item.title}
                href={item.href}
                data-scroll-animate
                className="fade-up group block relative overflow-hidden aspect-[4/5] md:aspect-[3/4]"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* 배경 이미지 */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* 오버레이 */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* 텍스트 */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 lg:p-12">
                  <p className="text-white/40 text-[11px] font-medium tracking-[0.3em] uppercase mb-3">
                    {item.subtitle}
                  </p>
                  <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                    {item.title}
                  </h2>
                  <p className="text-white/60 text-[14px] leading-relaxed mb-6 max-w-[320px]">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300">
                    <span className="text-[13px] tracking-wide">자세히 보기</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── 예약 CTA ─── */}
        <section className="bg-black py-24 px-6 md:px-10 lg:px-16">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div data-scroll-animate className="fade-up">
              <p className="text-white/40 text-[11px] font-medium tracking-[0.3em] uppercase mb-3">
                Reservation
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                어떤 시술이 맞는지 모르겠다면
              </h2>
              <p className="text-white/50 mt-2 text-[14px]">
                무료 상담으로 나에게 맞는 시술을 찾아보세요
              </p>
            </div>
            <div data-scroll-animate className="fade-up delay-200 flex flex-col sm:flex-row gap-3">
              <Link
                href="/reservation"
                className="btn bg-white text-black hover:bg-white/90 text-sm tracking-[0.06em] px-8 py-4"
              >
                온라인 예약
              </Link>
              <a
                href="https://booking.naver.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white text-sm tracking-[0.06em] px-8 py-4"
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
