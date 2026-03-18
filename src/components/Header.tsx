"use client";

import { useEffect, useState } from "react";
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
  { label: "오시는길/진료시간", href: "/location" },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      {/* ═══ 고정 헤더 ═══ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all"
        style={{
          height: isScrolled ? "80px" : "var(--header-height)",
          paddingInline: "var(--container-padding)",
          backgroundColor: isScrolled ? "rgba(255,255,255,0.98)" : "transparent",
          backdropFilter: isScrolled ? "blur(8px)" : "none",
          boxShadow: isScrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
          transitionDuration: "var(--duration-normal)",
          transitionTimingFunction: "var(--ease-menu)",
        }}
      >
        {/* 로고 */}
        <Link href="/" onClick={closeMenu} className="relative z-[60]" aria-label="모리스의원 홈">
          <Image
            src={isScrolled ? "/images/original/logo-black.png" : "/images/original/logo-white.png"}
            alt="MOLESS CLINIC"
            width={160}
            height={80}
            className="w-auto object-contain transition-opacity duration-300"
            style={{ height: "var(--logo-height)" }}
            priority
          />
        </Link>

        {/* 햄버거/X 버튼 */}
        <button
          onClick={toggleMenu}
          className="relative z-[60] flex flex-col items-center justify-center w-12 h-12 cursor-pointer focus:outline-none"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
        >
          <span
            className="block transition-all origin-center"
            style={{
              width: "26px",
              height: "1.5px",
              backgroundColor: isMenuOpen ? "#fff" : isScrolled ? "var(--color-black)" : "var(--color-black)",
              transform: isMenuOpen ? "rotate(45deg) translateY(3.5px)" : "none",
              transitionDuration: "var(--duration-normal)",
            }}
          />
          <span
            className="block transition-all"
            style={{
              width: isMenuOpen ? "26px" : "18px",
              height: "1.5px",
              backgroundColor: isMenuOpen ? "#fff" : isScrolled ? "var(--color-black)" : "var(--color-black)",
              transform: isMenuOpen ? "rotate(-45deg) translateY(-3.5px)" : "none",
              marginTop: isMenuOpen ? "0" : "6px",
              transitionDuration: "var(--duration-normal)",
            }}
          />
        </button>
      </header>

      {/* ═══ 사이드 메뉴 패널 — 본사: 우측에서 슬라이드 ═══ */}
      {/* 배경 딤 */}
      <div
        className={`fixed inset-0 z-[55] transition-opacity ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          transitionDuration: "var(--duration-normal)",
        }}
        onClick={closeMenu}
      />

      {/* 메뉴 패널 */}
      <nav
        className="fixed top-0 right-0 h-full z-[58] flex flex-col justify-center transition-transform"
        style={{
          width: "min(420px, 85vw)",
          backgroundColor: "#000",
          transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          transitionDuration: "var(--duration-slow)",
          transitionTimingFunction: "var(--ease-menu)",
          paddingInline: "clamp(2rem, 5vw, 3.5rem)",
        }}
        aria-label="전체 메뉴"
        aria-hidden={!isMenuOpen}
      >
        {/* X 닫기 — 우상단 */}
        <button
          onClick={closeMenu}
          className="absolute top-6 right-6 hover:opacity-100 transition-opacity w-10 h-10 flex items-center justify-center cursor-pointer"
          style={{ fontSize: "24px", color: "rgba(255,255,255,0.6)", transitionDuration: "var(--duration-fast)" }}
          aria-label="메뉴 닫기"
        >
          ✕
        </button>

        {/* 네비게이션 항목 */}
        <ul className="space-y-2">
          {NAV_ITEMS.map((item, index) => (
            <li
              key={item.href}
            >
              <Link
                href={item.href}
                onClick={closeMenu}
                className="block hover:opacity-70 transition-opacity py-2"
                style={{
                  fontFamily: "var(--font-subpage)",
                  fontWeight: 600,
                  fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                  transitionDuration: "var(--duration-fast)",
                }}
              >
                {item.label}
              </Link>
              {"sub" in item && item.sub && (
                <div className="ml-1 mt-1 mb-3 flex flex-col gap-1.5">
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={closeMenu}
                      className="hover:opacity-80 transition-opacity"
                      style={{
                        fontSize: "14px",
                        fontFamily: "var(--font-body)",
                        color: "rgba(255,255,255,0.35)",
                        transitionDuration: "var(--duration-fast)",
                      }}
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

      {/* 모바일 대응 */}
      <style jsx>{`
        @media (max-width: 999px) {
          header {
            height: ${isScrolled ? "64px" : "var(--header-height-mobile)"} !important;
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
