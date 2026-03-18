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
      { label: "젠틀맥스프로플러스", href: "/equipment/gentlemax" },
      { label: "아포지엘리트플러스", href: "/equipment/apogee" },
    ],
  },
  {
    label: "시술안내",
    href: "/treatment",
    sub: [
      { label: "얼굴제모", href: "/treatment/face" },
      { label: "바디제모", href: "/treatment/body" },
    ],
  },
  {
    label: "가격안내",
    href: "/pricing",
    sub: [
      { label: "남성제모", href: "/pricing/male" },
      { label: "여성제모", href: "/pricing/female" },
      { label: "1회 가격", href: "/pricing/regular" },
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
      {/* 고정 헤더 */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "flex items-center justify-between",
          "px-6 md:px-10 lg:px-16",
          "transition-all duration-500",
          isScrolled || isMenuOpen
            ? "bg-white/95 backdrop-blur-sm h-[64px]"
            : "bg-transparent h-[72px]",
        ].join(" ")}
      >
        {/* 로고 */}
        <Link href="/" onClick={closeMenu} className="relative z-10" aria-label="모리스의원 홈">
          <Image
            src={isScrolled || isMenuOpen ? "/images/original/logo-black.png" : "/images/original/logo-white.png"}
            alt="MOLESS CLINIC"
            width={80}
            height={60}
            className="h-[45px] w-auto object-contain transition-opacity duration-300"
            priority
          />
        </Link>

        {/* 햄버거 */}
        <button
          onClick={toggleMenu}
          className="relative z-10 flex flex-col items-center justify-center w-10 h-10 cursor-pointer focus:outline-none"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
        >
          <span
            className={[
              "block h-[1.5px] w-6 transition-all duration-500 origin-center",
              isScrolled || isMenuOpen ? "bg-black" : "bg-white",
              isMenuOpen ? "rotate-45 translate-y-[3.5px]" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-[1.5px] transition-all duration-500 mt-[5px]",
              isScrolled || isMenuOpen ? "bg-black" : "bg-white",
              isMenuOpen ? "w-6 -rotate-45 -translate-y-[3.5px] mt-0" : "w-4",
            ].join(" ")}
          />
        </button>
      </header>

      {/* 풀스크린 메뉴 오버레이 */}
      <div
        ref={overlayRef}
        className={[
          "fixed inset-0 z-40 bg-black",
          "transition-all duration-700",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
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
              "transition-all duration-700 delay-200",
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            <p className="text-white/40 text-[10px] font-medium tracking-[0.3em] uppercase mb-8">
              상담 안내
            </p>

            <a href={`tel:${CONTACT_INFO.phone.replace(/-/g, "")}`} className="group flex items-center gap-3 mb-6">
              <span className="text-white text-xl font-light tracking-wider group-hover:text-white/80 transition-colors">
                {CONTACT_INFO.phone}
              </span>
            </a>

            <div className="flex flex-col gap-3 mb-10">
              <a href={CONTACT_INFO.naver} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" onClick={closeMenu}>
                <span className="text-white/70 text-sm tracking-wide group-hover:text-white transition-colors">네이버 예약 →</span>
              </a>
              <a href={CONTACT_INFO.kakao} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" onClick={closeMenu}>
                <span className="text-white/70 text-sm tracking-wide group-hover:text-white transition-colors">카카오톡 상담 →</span>
              </a>
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" onClick={closeMenu}>
                <span className="text-white/70 text-sm tracking-wide group-hover:text-white transition-colors">인스타그램 →</span>
              </a>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-3">진료시간</p>
              <p className="text-white/60 text-sm leading-relaxed">
                평일 &nbsp;11:00 – 21:00<br />
                주말 &nbsp;10:00 – 17:30<br />
                점심 &nbsp;14:00 – 15:00
              </p>
            </div>
          </div>

          {/* 오른쪽: 네비게이션 */}
          <nav className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-10 lg:py-0" aria-label="전체 메뉴">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.href}
                  className={[
                    "transition-all duration-500",
                    isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
                  ].join(" ")}
                  style={{ transitionDelay: isMenuOpen ? `${300 + index * 80}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-baseline gap-4 py-3 border-b border-white/[0.06] hover:border-white/20 transition-colors duration-300"
                  >
                    <span className="text-white/25 text-[11px] font-mono w-5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">
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
    </>
  );
}
