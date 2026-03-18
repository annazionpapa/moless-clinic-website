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

/* ─── 시술 부위 데이터 ─── */
const treatmentAreas = [
  {
    title: "남성 수염",
    areas: ["윗입술", "아랫입술", "턱", "볼", "턱밑", "목"],
    description: "깊고 밀도 높은 수염 모낭을 정밀하게 처리합니다.",
  },
  {
    title: "여성 얼굴",
    areas: ["이마", "눈썹 주변", "볼", "윗입술", "턱선", "인중"],
    description: "섬세한 잔털부터 짙은 잔모까지, 빠짐없이 제거합니다.",
  },
  {
    title: "헤어라인",
    areas: ["이마 헤어라인", "구레나룻", "뒷목", "귀 주변"],
    description: "자연스러운 라인을 디자인하며 정리합니다.",
  },
];

/* ─── 시술 정보 테이블 데이터 ─── */
const treatmentInfo = [
  { label: "시술 시간", value: "부위별 약 15~45분 (마취 크림 도포 30분 별도)" },
  { label: "시술 간격", value: "2~6주 간격 (모발 성장 주기에 따라 조정)" },
  { label: "권장 횟수", value: "평균 5~10회 (개인 모발 밀도·색상에 따라 상이)" },
  { label: "마취", value: "마취 크림 기본 제공 + 쿨링 시스템 + 아이스팩 병행" },
  { label: "시술 전", value: "4주 전 왁싱·핀셋 제모 금지 / 전일 면도 / 자외선 차단" },
  { label: "시술 후", value: "당일 세안·화장 금지 / 48시간 사우나·운동 자제 / 보습·자외선 차단 필수" },
];

export default function FaceTreatmentPage() {
  const sectionRef = useScrollAnimation();

  return (
    <>
      {/* ─── 풀스크린 히어로 (B&W 배경) ─── */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* 배경 이미지 - B&W 처리 */}
        <div className="absolute inset-0">
          <Image
            src="/images/original/male-face.jpg"
            alt="얼굴제모"
            fill
            priority
            className="object-cover object-center grayscale"
            sizes="100vw"
          />
        </div>
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" aria-hidden="true" />

        {/* 히어로 콘텐츠 */}
        <div className="relative z-10 flex flex-col justify-end min-h-screen px-6 md:px-10 lg:px-16 pb-24 pt-[var(--header-height)] max-w-[1440px] mx-auto">
          <p className="text-white/40 text-[11px] font-medium tracking-[0.35em] uppercase mb-6">
            Treatment
          </p>
          <h1 className="text-white font-light text-[clamp(3rem,8vw,7rem)] leading-[1.0] tracking-[-0.03em] mb-6">
            얼굴제모
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-[480px] mb-10">
            남성 수염부터 여성 잔털까지,<br />
            피부 타입에 맞춘 1:1 맞춤 시술
          </p>
          <div>
            <Link
              href="/reservation"
              className="btn btn-outline-white text-sm tracking-[0.06em] px-8 py-4"
            >
              상담 예약
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 본문 ─── */}
      <div ref={sectionRef} className="bg-white">

        {/* ─── 인트로 섹션 ─── */}
        <section className="section container">
          <div className="max-w-3xl">
            <p
              data-scroll-animate
              className="fade-up text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-8"
            >
              Why Moless
            </p>
            <h2
              data-scroll-animate
              className="fade-up delay-100 text-3xl md:text-4xl lg:text-[2.8rem] font-bold tracking-tight leading-[1.3] mb-8"
            >
              얼굴은 가장 예민한 부위입니다.<br />
              그래서 가장 정밀하게 다룹니다.
            </h2>
            <p
              data-scroll-animate
              className="fade-up delay-200 text-gray-500 text-[15px] md:text-base leading-[1.8]"
            >
              얼굴 제모는 피부 민감도가 가장 높은 영역입니다. 모리스의원은 개인별
              피부 타입 분석을 바탕으로 장비 설정을 세분화하고, 마취 크림·쿨링·
              아이스팩을 단계적으로 적용해 통증과 부작용을 최소화합니다.
            </p>
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="border-t border-gray-100" />
        </div>

        {/* ─── 시술 부위 ─── */}
        <section className="section container">
          <p
            data-scroll-animate
            className="fade-up text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-4"
          >
            Treatment Areas
          </p>
          <h2
            data-scroll-animate
            className="fade-up delay-100 text-2xl md:text-3xl font-bold tracking-tight mb-16"
          >
            시술 부위
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-gray-200">
            {treatmentAreas.map((area, i) => (
              <div
                key={area.title}
                data-scroll-animate
                className={`fade-up border-b border-gray-200 py-10 md:py-12 md:px-8 first:md:pl-0 last:md:pr-0 ${
                  i < treatmentAreas.length - 1 ? "md:border-r" : ""
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-[11px] font-mono tracking-[0.3em] text-gray-300 uppercase mb-6">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black mb-4">
                  {area.title}
                </h3>
                <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.areas.map((a) => (
                    <span
                      key={a}
                      className="text-[12px] tracking-wide text-gray-600 bg-gray-50 px-3 py-1.5 border border-gray-100"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="border-t border-gray-100" />
        </div>

        {/* ─── 모리스의원의 차이 ─── */}
        <section className="section container">
          <p
            data-scroll-animate
            className="fade-up text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-4"
          >
            Our Difference
          </p>
          <h2
            data-scroll-animate
            className="fade-up delay-100 text-2xl md:text-3xl font-bold tracking-tight mb-16"
          >
            모리스의원이 다른 이유
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
            {[
              {
                num: "01",
                title: "남성 수염 전문",
                desc: "수염은 모낭이 깊고 밀도가 높아 일반 제모보다 높은 에너지와 세밀한 조준이 필요합니다. 부위별 특성을 파악해 빠짐없이 처리합니다.",
              },
              {
                num: "02",
                title: "여성 잔털 세심 케어",
                desc: "이마·볼·윗입술·턱선 등 여성 특유의 잔털 분포를 면밀히 분석해 밝은 솜털부터 짙은 잔모까지 하나도 놓치지 않습니다.",
              },
              {
                num: "03",
                title: "피부 타입별 맞춤 설정",
                desc: "피부색·모발 굵기·모낭 깊이를 사전 분석해 장비 파라미터를 개인 맞춤으로 설정합니다. 표준화된 프로토콜이 아닌, 당신만을 위한 시술입니다.",
              },
              {
                num: "04",
                title: "실시간 소통 시술",
                desc: "시술 중 통증 강도·피부 반응을 의료진이 지속적으로 확인합니다. 불편하면 즉시 장비 설정을 조정하고, 쿨링 강도를 높입니다.",
              },
            ].map((item, i) => (
              <div
                key={item.num}
                data-scroll-animate
                className="fade-up bg-white p-8 md:p-10 lg:p-12"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="text-[11px] font-mono tracking-[0.3em] text-gray-300 mb-6">
                  {item.num}
                </p>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[14px] leading-[1.8]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="border-t border-gray-100" />
        </div>

        {/* ─── 시술 정보 테이블 ─── */}
        <section className="section container">
          <p
            data-scroll-animate
            className="fade-up text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-4"
          >
            Treatment Info
          </p>
          <h2
            data-scroll-animate
            className="fade-up delay-100 text-2xl md:text-3xl font-bold tracking-tight mb-16"
          >
            시술 정보
          </h2>

          <div className="max-w-3xl">
            <dl>
              {treatmentInfo.map((row, i) => (
                <div
                  key={row.label}
                  data-scroll-animate
                  className="fade-up flex flex-col sm:flex-row border-b border-gray-100 py-6 gap-2 sm:gap-0"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <dt className="sm:w-32 text-[12px] font-semibold tracking-[0.1em] uppercase text-black shrink-0 pt-0.5">
                    {row.label}
                  </dt>
                  <dd className="text-gray-500 text-[14px] leading-[1.8]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─── 가격 CTA ─── */}
        <section className="section container border-t border-gray-100">
          <div
            data-scroll-animate
            className="fade-up flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div>
              <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-3">
                Pricing
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                얼굴 제모 가격 안내
              </h2>
              <p className="text-gray-400 mt-2 text-[13px]">VAT 별도 · 이벤트 가격은 기간 한정 적용</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/pricing/male"
                className="btn btn-primary text-sm tracking-[0.06em] px-8 py-4"
              >
                남성 가격 보기
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                </svg>
              </Link>
              <Link
                href="/pricing/female"
                className="btn btn-outline text-sm tracking-[0.06em] px-8 py-4"
              >
                여성 가격 보기
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                </svg>
              </Link>
            </div>
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
                지금 바로 상담을 시작하세요
              </h2>
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
