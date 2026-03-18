import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "아포지엘리트플러스 | 모리스의원",
  description:
    "어클레임부터 아포지 엘리트 플러스까지 — 755nm + 1064nm 듀얼 파장과 Cryo6 쿨러 시스템으로 안전하고 효과적인 레이저 제모.",
};

/* ─── 진화 히스토리 ─── */
const HISTORY = [
  { name: "어클레임", gen: "1세대" },
  { name: "아포지", gen: "2세대" },
  { name: "엘리트 MPX", gen: "3세대" },
  { name: "아포지 플러스", gen: "4세대" },
  { name: "아포지 엘리트 플러스", gen: "5세대", highlight: true },
];

/* ─── 포인트별 특장점 데이터 ─── */
const POINTS = [
  {
    point: "Point 1",
    image: "/images/original/slide-002.png",
    imageAlt: "아포지 엘리트 플러스 장비",
    title: "5세대 기술 진화, Cynosure사",
    desc: "아포지 엘리트 플러스는 수십 년간 이어온 레이저 기술의 결정체입니다. 어클레임에서 시작해 5세대에 걸친 진화를 거치며 출력 안정성, 냉각 효율, 피부 타입 적용 범위가 지속적으로 개선되었습니다. 미국 Cynosure사의 기술력이 집약된 프리미엄 장비입니다.",
  },
  {
    point: "Point 2",
    image: "/images/original/gentlemax-handpiece.jpg",
    imageAlt: "듀얼 파장 핸드피스",
    title: "755nm + 1064nm 듀얼 파장 시스템",
    desc: "755nm 알렉산드라이트 파장은 멜라닌 흡수율이 높아 밝은 피부의 굵은 체모에 최적이며, 1064nm Nd:YAG 파장은 더 깊은 조직 침투와 어두운 피부 타입에도 안전하게 적용 가능합니다. 두 파장을 하나의 장비에서 구현하여 맞춤 시술이 가능합니다.",
  },
  {
    point: "Point 3",
    image: "/images/original/skin-texture.jpg",
    imageAlt: "Cryo6 냉각 시스템",
    title: "Cryo6 냉각 시스템, 통증 최소화",
    desc: "레이저 조사 전, 중, 후에 걸쳐 피부 표면을 지속적으로 냉각하여 열 손상과 통증을 동시에 억제합니다. 냉각 강도는 단계별로 조절 가능하여 부위별 민감도에 맞춰 최적화하며, 시술의 편안함을 극대화합니다.",
  },
  {
    point: "Point 4",
    image: null,
    imageAlt: "",
    title: "Apogee Elite Plus™ 정품 사용, 공식 인증",
    desc: "모리스의원은 공식 수입사를 통해 인증된 정품 장비만을 사용합니다. 아포지 엘리트 플러스 정품 구매 영수증과 보증서가 발급되는 공식 장비로, 유사품과 복제품과는 출력 안정성, 냉각 효율, 시술 결과 모두 다릅니다.",
    isLogo: true,
  },
];

/* ─── 하단 네비게이션 ─── */
const NAV_LINKS = [
  { label: "젠틀맥스프로플러스", href: "/equipment/gentlemax", sub: "Equipment 01" },
  { label: "여성 가격안내", href: "/pricing/female", sub: "Price" },
  { label: "남성 가격안내", href: "/pricing/male", sub: "Price" },
  { label: "시술 안내", href: "/treatment/face", sub: "Treatment" },
];

export default function ApogeePage() {
  return (
    <>
      {/* ── 히어로: 흑백 여성 사진 배경 ── */}
      <section className="relative min-h-[80vh] md:min-h-screen overflow-hidden flex items-center justify-center">
        {/* B&W 배경 이미지 */}
        <Image
          src="/images/original/about-hero-woman.jpg"
          alt="배경"
          fill
          className="object-cover object-[50%_30%] grayscale brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" aria-hidden="true" />

        {/* 텍스트 오버레이 */}
        <div className="relative z-10 text-center px-6 pt-[var(--header-height)]">
          <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 fade-up" data-scroll-animate>
            모리스의원
          </p>
          <h1
            className="text-white font-bold leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,7vw,5.5rem)] fade-up delay-200"
            data-scroll-animate
          >
            아포지엘리트플러스,
          </h1>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fade-up delay-400" data-scroll-animate>
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ── 브랜드명 섹션 (블랙 배경) ── */}
      <section className="bg-black py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 text-center fade-up" data-scroll-animate>
          <h2 className="text-[#E91E8C] text-[clamp(1.6rem,4vw,3rem)] font-light tracking-[0.05em]">
            Cynosure. Apogee Elite Plus&trade;
          </h2>
        </div>
      </section>

      {/* ── 장비 메인 이미지 (블랙 배경) ── */}
      <section className="bg-black py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 fade-up" data-scroll-animate>
          <div className="flex justify-center">
            <Image
              src="/images/original/slide-002.png"
              alt="아포지 엘리트 플러스 장비"
              width={700}
              height={700}
              className="w-full max-w-[600px] h-auto object-contain"
            />
          </div>
          <div className="text-center mt-12">
            <p className="text-white/80 text-lg md:text-xl tracking-wide font-light">
              Cynosure, 아포지 엘리트 플러스&trade;
            </p>
            <div className="w-full max-w-md mx-auto mt-6 h-px bg-white/20" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── 진화 타임라인 (블랙 배경) ── */}
      <section className="bg-black py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="mb-10 text-center fade-up" data-scroll-animate>
            <p className="text-white/30 text-[11px] font-medium tracking-[0.35em] uppercase mb-4">
              Evolution
            </p>
            <h2 className="text-white text-[clamp(1.4rem,3vw,2rem)] font-light tracking-wide">
              끊임없는 기술 진화
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-0 fade-up delay-100" data-scroll-animate>
            {HISTORY.map((item, i) => (
              <div key={item.name} className="flex-1 flex flex-row md:flex-col items-center">
                {/* 노드 + 라인 */}
                <div className="flex flex-col md:flex-row items-center w-full">
                  <div
                    className={[
                      "w-3.5 h-3.5 rounded-full shrink-0 border-2 transition-colors",
                      item.highlight
                        ? "bg-[#E91E8C] border-[#E91E8C] scale-125"
                        : "bg-transparent border-white/30",
                    ].join(" ")}
                  />
                  {i < HISTORY.length - 1 && (
                    <div className="w-px h-8 md:w-full md:h-px bg-white/20" aria-hidden="true" />
                  )}
                </div>
                {/* 레이블 */}
                <div className="ml-5 md:ml-0 md:mt-5 md:text-center pb-5 md:pb-0">
                  <p
                    className={[
                      "text-[10px] font-medium tracking-[0.2em] uppercase mb-1",
                      item.highlight ? "text-[#E91E8C]" : "text-white/40",
                    ].join(" ")}
                  >
                    {item.gen}
                  </p>
                  <p
                    className={[
                      "text-sm md:text-base",
                      item.highlight ? "text-white font-bold" : "text-white/50 font-light",
                    ].join(" ")}
                  >
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 포인트별 특장점 (블랙 배경, 이미지 좌 + 텍스트 우) ── */}
      <section className="bg-black py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-20 md:space-y-28">
          {POINTS.map((point, i) => (
            <div
              key={point.point}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center fade-up"
              data-scroll-animate
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* 왼쪽: 이미지 */}
              <div className="flex justify-center">
                {point.isLogo ? (
                  /* Point 4: Cynosure 로고 영역 */
                  <div className="w-full max-w-[400px] aspect-[4/3] rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Official Partner</p>
                      <p className="text-white/70 text-2xl md:text-3xl font-light tracking-[0.1em]">CYNOSURE</p>
                      <p className="text-white/30 text-xs tracking-wider mt-2">Authorized Equipment</p>
                    </div>
                  </div>
                ) : point.image ? (
                  <div className="w-full max-w-[400px] aspect-[4/3] rounded-2xl bg-[#141414] overflow-hidden relative">
                    <Image
                      src={point.image}
                      alt={point.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>

              {/* 오른쪽: 텍스트 */}
              <div className="flex flex-col gap-4">
                <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-medium">
                  {point.point}
                </p>
                <h3 className="text-[#E91E8C] text-xl md:text-2xl font-bold leading-snug">
                  {point.title}
                </h3>
                <p className="text-white/60 leading-[1.9] font-light text-sm md:text-base">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 하단 네비게이션 ── */}
      <section className="py-24 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="mb-12 text-center fade-up" data-scroll-animate>
            <p className="text-[11px] font-medium tracking-[0.35em] text-white/30 uppercase mb-3">
              Explore
            </p>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-white">더 알아보기</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-[#0a0a0a] px-6 py-10 flex flex-col items-center justify-center gap-3 group transition-colors hover:bg-[#1a1a1a] fade-up"
                data-scroll-animate
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase group-hover:text-[#E91E8C]/60 transition-colors">
                  {link.sub}
                </span>
                <span className="text-sm md:text-base font-light tracking-[-0.01em] text-white/70 group-hover:text-white transition-colors text-center">
                  {link.label}
                </span>
                <svg
                  className="w-4 h-4 text-white/20 group-hover:text-[#E91E8C]/60 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
