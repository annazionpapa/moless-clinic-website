"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "병원소개", href: "/about" },
  {
    label: "보유장비",
    href: "/equipment",
    sub: [
      { label: "젠틀맥스프로플러스", desc: "755nm+1064nm 듀얼", href: "/equipment/gentlemax" },
      { label: "아포지엘리트플러스", desc: "755nm+1064nm 듀얼", href: "/equipment/apogee" },
    ],
  },
  {
    label: "시술안내",
    href: "/treatment",
    sub: [
      { label: "얼굴제모", desc: "Face Hair Removal", href: "/treatment/face" },
      { label: "바디제모", desc: "Body Hair Removal", href: "/treatment/body" },
    ],
  },
  {
    label: "가격안내",
    href: "/pricing",
    sub: [
      { label: "남성제모", desc: "Male", href: "/pricing/male" },
      { label: "여성제모", desc: "Female", href: "/pricing/female" },
      { label: "1회 가격", desc: "Single Session", href: "/pricing/regular" },
    ],
  },
  { label: "예약/문의", href: "/reservation" },
  { label: "오시는 길", href: "/location" },
] as const;

const CONTACT_INFO = {
  phone: "02-555-6231",
  kakao: "https://pf.kakao.com/",
  instagram: "https://www.instagram.com/molessclinic/",
  naver: "https://booking.naver.com/",
} as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* ═══ 고정 헤더 — 디자인 토큰: 130px(데스크톱) / 74px(모바일), 투명→흰색 ═══ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all"
        style={{
          height: isScrolled || isMenuOpen ? "80px" : "var(--header-height)",
          paddingInline: "var(--container-padding)",
          backgroundColor: isScrolled || isMenuOpen ? "rgba(255,255,255,0.98)" : "transparent",
          backdropFilter: isScrolled ? "blur(8px)" : "none",
          boxShadow: isScrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
          transitionDuration: "var(--duration-normal)",
          transitionTimingFunction: "var(--ease-menu)",
        }}
      >
        {/* 로고 — 디자인 토큰: 80px(데스크톱) / 50px(모바일), margin 25px */}
        <Link href="/" onClick={closeMenu} className="relative z-10" aria-label="모리스의원 홈">
          <Image
            src={isScrolled || isMenuOpen ? "/images/original/logo-black.png" : "/images/original/logo-white.png"}
            alt="MOLESS CLINIC"
            width={160}
            height={80}
            className="w-auto object-contain transition-opacity duration-300"
            style={{ height: "var(--logo-height)" }}
            priority
          />
        </Link>

        {/* 햄버거 버튼 */}
        <button
          onClick={toggleMenu}
          className="relative z-10 flex flex-col items-center justify-center w-12 h-12 cursor-pointer focus:outline-none"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
        >
          <span
            className="block transition-all origin-center"
            style={{
              width: "26px",
              height: "1.5px",
              backgroundColor: isScrolled || isMenuOpen ? "var(--color-black)" : "var(--color-white)",
              transform: isMenuOpen ? "rotate(45deg) translateY(3.5px)" : "none",
              transitionDuration: "var(--duration-normal)",
              transitionTimingFunction: "var(--ease-menu)",
            }}
          />
          <span
            className="block transition-all mt-[6px]"
            style={{
              width: isMenuOpen ? "26px" : "18px",
              height: "1.5px",
              backgroundColor: isScrolled || isMenuOpen ? "var(--color-black)" : "var(--color-white)",
              transform: isMenuOpen ? "rotate(-45deg) translateY(-3.5px)" : "none",
              marginTop: isMenuOpen ? "0" : "6px",
              transitionDuration: "var(--duration-normal)",
              transitionTimingFunction: "var(--ease-menu)",
            }}
          />
        </button>
      </header>

      {/* ═══ 슬라이드아웃 메뉴 — 디자인 토큰: #000000 배경 ═══ */}
      <div
        ref={overlayRef}
        className={[
          "fixed inset-0 z-40 bg-black",
          "transition-all",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{
          transitionDuration: "var(--duration-slow)",
          transitionTimingFunction: "var(--ease-menu)",
        }}
        aria-hidden={!isMenuOpen}
      >
        <div className="h-full flex flex-col lg:flex-row">
          {/* 왼쪽: 상담 안내 */}
          <div
            className={[
              "flex flex-col justify-end",
              "lg:w-[380px] xl:w-[420px] shrink-0",
              "px-8 lg:px-12 pb-12 lg:pb-16 pt-24 lg:pt-0",
              "border-b lg:border-b-0 lg:border-r border-white/10",
              "transition-all",
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDuration: "var(--duration-slow)", transitionDelay: "200ms" }}
          >
            <p
              className="text-white/40 uppercase mb-8"
              style={{ fontSize: "10px", fontFamily: "var(--font-label)", fontWeight: 500, letterSpacing: "0.3em" }}
            >
              상담 안내
            </p>

            <a href={`tel:${CONTACT_INFO.phone.replace(/-/g, "")}`} className="group flex items-center gap-3 mb-6">
              <span
                className="text-white group-hover:text-white/80 transition-colors"
                style={{ fontSize: "22px", fontFamily: "var(--font-heading)", fontWeight: 300, letterSpacing: "0.05em" }}
              >
                {CONTACT_INFO.phone}
              </span>
            </a>

            <div className="flex flex-col gap-3 mb-10">
              {[
                { label: "네이버 예약", href: CONTACT_INFO.naver },
                { label: "카카오톡 상담", href: CONTACT_INFO.kakao },
                { label: "인스타그램", href: CONTACT_INFO.instagram },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                  onClick={closeMenu}
                >
                  <span className="text-white/70 text-sm tracking-wide group-hover:text-white transition-colors">
                    {link.label} →
                  </span>
                </a>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-white/30 uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.2em" }}>
                진료시간
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                평일 &nbsp;11:00 – 21:00<br />
                주말 &nbsp;10:00 – 17:30<br />
                점심 &nbsp;14:00 – 15:00
              </p>
            </div>
          </div>

          {/* 오른쪽: 네비게이션 — 디자인 토큰: Pretendard-SemiBold */}
          <nav className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-10 lg:py-0" aria-label="전체 메뉴">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.href}
                  className={[
                    "transition-all",
                    isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
                  ].join(" ")}
                  style={{
                    transitionDuration: "var(--duration-normal)",
                    transitionDelay: isMenuOpen ? `${300 + index * 80}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-baseline gap-4 py-3 border-b border-white/[0.06] hover:border-white/20 transition-colors"
                    style={{ transitionDuration: "var(--duration-fast)" }}
                  >
                    <span className="text-white/25 font-mono w-5" style={{ fontSize: "11px" }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-white group-hover:translate-x-2 transition-transform"
                      style={{
                        fontFamily: "var(--font-subpage)",
                        fontWeight: 600,
                        fontSize: "clamp(1.8rem, 4vw, 3rem)",
                        letterSpacing: "-0.02em",
                        transitionDuration: "var(--duration-fast)",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                  {"sub" in item && item.sub && (
                    <div className="ml-10 mt-1 mb-2 flex flex-wrap gap-x-6 gap-y-1">
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMenu}
                          className="text-white/40 text-sm hover:text-white transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ═══ 모바일 대응 CSS ═══ */}
      <style jsx>{`
        @media (max-width: 999px) {
          header {
            height: ${isScrolled || isMenuOpen ? "64px" : "var(--header-height-mobile)"} !important;
            padding-inline: 20px !important;
          }
          header img {
            height: var(--logo-height-mobile) !important;
          }
        }
      `}</style>
    </>
  );
}
