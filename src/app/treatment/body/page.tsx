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
    title: "상체",
    areas: ["겨드랑이", "팔 전체", "손등·손가락", "가슴", "배"],
    description: "노출이 잦은 상체 부위를 깔끔하게 정리합니다.",
  },
  {
    title: "하체",
    areas: ["허벅지", "무릎", "종아리", "발등·발가락"],
    description: "넓은 면적도 균일하게, 빠짐없이 처리합니다.",
  },
  {
    title: "특수 부위",
    areas: ["비키니라인", "브라질리언", "등", "엉덩이"],
    description: "프라이버시가 보장되는 1인 시술실에서 진행합니다.",
  },
];

/* ─── 시술 정보 테이블 데이터 ─── */
const treatmentInfo = [
  { label: "시술 시간", value: "부위별 약 20~60분 (마취 크림 도포 30분 별도)" },
  { label: "시술 간격", value: "2~6주 간격 (모발 성장 주기에 따라 조정)" },
  { label: "권장 횟수", value: "평균 5~10회 (부위·모발 색상·피부 타입에 따라 상이)" },
  { label: "마취", value: "마취 크림 기본 제공 + 쿨링 시스템 + 아이스팩 병행" },
  { label: "시술 전", value: "4주 전 왁싱·핀셋 제모 금지 / 전일 면도 / 자외선 차단" },
  { label: "시술 후", value: "당일 미온수 샤워만 / 48시간 사우나·수영 자제 / 보습·자외선 차단 필수" },
];

export default function BodyTreatmentPage() {
  const sectionRef = useScrollAnimation();

  return (
    <>
      {/* ─── 풀스크린 히어로 (B&W 배경) ─── */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* 배경 이미지 - B&W 처리 */}
        <div className="absolute inset-0">
          <Image
            src="/images/original/female-body.jpg"
            alt="바디제모"
            fill
            priority
            className="object-cover object-center grayscale"
            sizes="100vw"
          />
        </div>
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" aria-hidden="true" />

        {/* 히어로 콘텐츠 */}
        <div className="relative z-10 flex flex-col justify-end min-h-screen px-6 md:px-10 lg:px-16 pb-24 pt-[var(--header-height)] max-w-[1440px] mx-auto">
          <p className="text-white/40 text-[11px] font-medium tracking-[0.35em] uppercase mb-6">
            Treatment
          </p>
          <h1 className="text-white font-light text-[clamp(3rem,8vw,7rem)] leading-[1.0] tracking-[-0.03em] mb-6">
            바디제모
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-[480px] mb-10">
            겨드랑이부터 브라질리언까지,<br />
            프라이버시가 보장되는 1인 시술실에서
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
              바디 제모, 편안함이<br />
              시술만큼 중요합니다.
            </h2>
            <p
              data-scroll-animate
              className="fade-up delay-200 text-gray-500 text-[15px] md:text-base leading-[1.8]"
            >
              모리스의원 바디 제모는 프라이버시를 최우선으로 설계했습니다.
              1인 대기실, 1인 시술실로 다른 환자와의 동선이 겹치지 않으며,
              민감한 부위는 동성 의사를 선택할 수 있어 안심하고 맡길 수 있습니다.
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
                title: "동성 의사 선택 가능",
                desc: "민감한 부위 시술은 동성 의료진을 선택할 수 있습니다. 예약 시 희망 의료진을 지정하면, 해당 의사가 처음부터 끝까지 시술을 진행합니다.",
              },
              {
                num: "02",
                title: "완전 독립 1인 공간",
                desc: "대기실부터 시술실까지 완전 분리된 1인 공간을 운영합니다. 다른 환자와의 시선 교차 없이 독립된 동선으로 이동하며, 시술실 문은 이중 잠금됩니다.",
              },
              {
                num: "03",
                title: "부위별 최적화 세팅",
                desc: "바디 부위마다 피부 두께와 모낭 깊이가 다릅니다. 겨드랑이·팔다리·특수 부위 각각에 적합한 에너지·파장·쿨링 세팅을 개별 적용합니다.",
              },
              {
                num: "04",
                title: "실시간 소통 시술",
                desc: "시술 중 통증 강도와 피부 반응을 의료진이 직접 확인합니다. 실시간 피드백을 즉각 반영해 장비 설정을 조정합니다. 당신의 목소리가 시술의 방향을 결정합니다.",
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
                바디 제모 가격 안내
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
                편안한 상담으로 시작하세요
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
