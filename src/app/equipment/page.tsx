import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "보유 장비 | 모리스의원",
  description:
    "모리스의원이 보유한 프리미엄 레이저 제모 장비를 소개합니다. 젠틀맥스 프로 플러스, 아포지 엘리트 플러스.",
};

const EQUIPMENT = [
  {
    num: "01",
    name: "젠틀맥스프로플러스",
    nameEn: "GentleMax Pro Plus",
    maker: "Candela (USA)",
    spec: "755nm + 1064nm | Cryo 7",
    desc: "미국 Candela사의 플래그십 듀얼 파장 레이저. 최소 2ms 펄스와 최대 26mm 스팟 사이즈로 정밀하고 빠른 시술이 가능합니다.",
    href: "/equipment/gentlemax",
    image: "/images/original/equipment-slide.png",
  },
  {
    num: "02",
    name: "아포지엘리트플러스",
    nameEn: "Apogee Elite Plus",
    maker: "Cynosure (USA)",
    spec: "755nm + 1064nm | Cryo6",
    desc: "5세대 기술 진화의 결정체. 듀얼 파장과 Cryo6 통합 냉각 시스템으로 모든 피부 타입에 안전하고 효과적인 시술을 제공합니다.",
    href: "/equipment/apogee",
    image: "/images/original/slide-002.png",
  },
];

export default function EquipmentPage() {
  return (
    <>
      {/* ── 히어로 ── */}
      <section className="relative min-h-[60vh] overflow-hidden bg-[#0a0a0a] flex items-center">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#171717] to-[#0a0a0a]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-[var(--header-height)] pb-16">
          <div className="max-w-2xl">
            <p
              className="text-white/40 text-[11px] font-medium tracking-[0.35em] uppercase mb-6 fade-up"
              data-scroll-animate
            >
              Equipment
            </p>
            <div
              className="w-px h-10 bg-white/20 mb-8 fade-up delay-100"
              data-scroll-animate
              aria-hidden="true"
            />
            <h1
              className="text-white font-light leading-[1.1] tracking-[-0.02em] text-[clamp(2rem,5vw,4rem)] mb-6 fade-up delay-200"
              data-scroll-animate
            >
              보유 장비
            </h1>
            <p
              className="text-white/50 text-base md:text-lg font-light leading-relaxed fade-up delay-300"
              data-scroll-animate
            >
              모리스의원은 검증된 정품 레이저 장비만을 사용합니다.<br />
              두 대의 프리미엄 듀얼 파장 레이저로 최적의 시술 결과를 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── 장비 목록 ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="space-y-0">
            {EQUIPMENT.map((eq, i) => (
              <Link
                key={eq.num}
                href={eq.href}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 border-t border-[#e5e5e5] last:border-b transition-colors fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* 이미지 */}
                <div
                  className={[
                    "relative bg-[#f7f7f7] rounded-sm overflow-hidden flex items-center justify-center p-10 lg:p-16",
                    i % 2 === 1 ? "lg:order-2" : "",
                  ].join(" ")}
                >
                  <Image
                    src={eq.image}
                    alt={eq.name}
                    width={600}
                    height={600}
                    className="w-full max-w-[360px] h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* 텍스트 */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="text-[#d4d4d4] text-4xl font-light tracking-tight block mb-6">
                    {eq.num}
                  </span>
                  <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.02em] text-[#0a0a0a] mb-2">
                    {eq.name}
                  </h2>
                  <p className="text-sm text-[#a3a3a3] font-light tracking-wide mb-2">
                    {eq.nameEn} &mdash; {eq.maker}
                  </p>
                  <p className="text-sm text-[#a3a3a3] font-medium tracking-wide mb-6">
                    {eq.spec}
                  </p>
                  <p className="text-[#737373] leading-[1.9] font-light text-sm md:text-base mb-8">
                    {eq.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a] group-hover:gap-3 transition-all">
                    자세히 보기
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 정품 안내 배너 ── */}
      <section className="py-20 md:py-24 bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <div className="fade-up" data-scroll-animate>
            <p className="text-[11px] font-medium tracking-[0.35em] text-white/40 uppercase mb-4">
              Authenticity
            </p>
            <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-bold tracking-[-0.02em] mb-6">
              모든 장비는 정품 인증을 완료했습니다
            </h2>
            <p className="text-white/50 leading-[1.8] font-light text-sm md:text-base">
              모리스의원의 모든 레이저 장비는 공식 수입사를 통해 정품 구매하였으며,
              구매 확인서와 보증서를 원내에서 직접 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
