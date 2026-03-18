"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "moless-popup-dismissed";

export default function PopupNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const ts = Number(dismissed);
      if (Date.now() - ts < 24 * 60 * 60 * 1000) return;
    }
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const close = () => setVisible(false);

  const dismissToday = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40" onClick={close} />

      {/* 팝업 - 화면의 대부분을 차지하도록 크게 */}
      <div
        className="relative w-[90vw] max-w-[620px]"
        role="dialog"
        aria-modal="true"
        aria-label="공지사항 팝업"
      >
        {/* ── 스프링 바인딩 (본사처럼 큰 고리) ── */}
        <div className="relative flex justify-between px-[10%] -mb-3" style={{ zIndex: 3 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* 고리 - 위쪽 반원 */}
              <div
                className="w-[22px] h-[22px] rounded-full border-[3.5px] border-[#1a1a1a]"
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
                }}
              />
              {/* 고리 아래 수직선 */}
              <div className="w-[3.5px] h-[14px] bg-[#1a1a1a] -mt-[3px]" />
            </div>
          ))}
        </div>

        {/* ── 노트 본체 (두꺼운 손그림 테두리) ── */}
        <div
          className="relative bg-[#fafaf7] overflow-hidden"
          style={{
            border: "4px solid #1a1a1a",
            borderRadius: "12px 12px 6px 6px",
            boxShadow: "6px 8px 30px rgba(0,0,0,0.3)",
          }}
        >
          {/* 메인 콘텐츠 - 넉넉한 패딩 */}
          <div className="px-10 pt-12 pb-10 text-center sm:px-16 sm:pt-16 sm:pb-12">
            {/* 메가폰 + GRAND OPEN */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="text-[3rem] sm:text-[4rem] leading-none">📢</span>
              <h2 className="text-[2.5rem] sm:text-[3.2rem] font-black tracking-tight leading-none">
                GRAND OPEN
              </h2>
            </div>

            {/* 점선 구분 (본사 스타일) */}
            <div
              className="mx-auto my-6 sm:my-8"
              style={{
                width: "85%",
                height: "2px",
                backgroundImage:
                  "repeating-linear-gradient(to right, #888 0px, #888 8px, transparent 8px, transparent 14px)",
              }}
            />

            {/* 장비 정보 - 본사 크기 */}
            <p className="text-[1.15rem] sm:text-[1.35rem] leading-relaxed mb-1">
              젠틀맥스프로플러스{" "}
              <span className="font-bold underline underline-offset-4 decoration-2">정품</span>{" "}
              장비 보유
            </p>
            <p className="text-[1.15rem] sm:text-[1.35rem] leading-relaxed mb-10">
              남/여 제모공간 분리 !
            </p>

            {/* 층별 안내 - 본사 크기와 레이아웃 */}
            <div className="flex flex-col gap-6 items-center mb-8">
              {/* 11층 여성 */}
              <div className="flex items-center gap-6">
                <span className="text-[1.6rem] sm:text-[1.9rem] font-bold min-w-[4rem] text-right">
                  11층
                </span>
                {/* 여성 아이콘 (핑크) */}
                <svg
                  width="40"
                  height="60"
                  viewBox="0 0 40 60"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <circle cx="20" cy="9" r="8" fill="#E91E8C" />
                  <path d="M20 20 L20 42" stroke="#E91E8C" strokeWidth="4" strokeLinecap="round" />
                  <path d="M10 28 L30 28" stroke="#E91E8C" strokeWidth="4" strokeLinecap="round" />
                  <path d="M20 42 L10 58" stroke="#E91E8C" strokeWidth="4" strokeLinecap="round" />
                  <path d="M20 42 L30 58" stroke="#E91E8C" strokeWidth="4" strokeLinecap="round" />
                  {/* 치마 */}
                  <path d="M11 28 L29 28 L26 38 L14 38 Z" fill="#E91E8C" />
                </svg>
                <span className="text-[1.3rem] sm:text-[1.6rem] font-bold">
                  여성제모 &amp; 상담
                </span>
              </div>

              {/* 9층 남성 */}
              <div className="flex items-center gap-6">
                <span className="text-[1.6rem] sm:text-[1.9rem] font-bold min-w-[4rem] text-right">
                  9층
                </span>
                {/* 남성 아이콘 (파랑) */}
                <svg
                  width="40"
                  height="60"
                  viewBox="0 0 40 60"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <circle cx="20" cy="9" r="8" fill="#2196F3" />
                  <path d="M20 20 L20 42" stroke="#2196F3" strokeWidth="4" strokeLinecap="round" />
                  <path d="M10 28 L30 28" stroke="#2196F3" strokeWidth="4" strokeLinecap="round" />
                  <path d="M20 42 L10 58" stroke="#2196F3" strokeWidth="4" strokeLinecap="round" />
                  <path d="M20 42 L30 58" stroke="#2196F3" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <span className="text-[1.3rem] sm:text-[1.6rem] font-bold">남성제모</span>
              </div>
            </div>
          </div>

          {/* ── @molessclinic (본사 스타일: 양쪽 라인) ── */}
          <div className="flex items-center justify-center gap-4 pb-10 px-10 sm:px-16">
            <div className="flex-1 h-px bg-[#222]" />
            <a
              href="https://www.instagram.com/molessclinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-[#333] hover:text-black transition-colors whitespace-nowrap"
            >
              @molessclinic
            </a>
            <div className="flex-1 h-px bg-[#222]" />
          </div>
        </div>

        {/* ── 하단 검은 바 ── */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ backgroundColor: "#111" }}
        >
          <button
            onClick={dismissToday}
            className="text-[13px] text-gray-400 hover:text-white transition-colors cursor-pointer underline underline-offset-2"
          >
            오늘 하루 보지 않음
          </button>
          <button
            onClick={close}
            className="text-gray-400 hover:text-white transition-colors text-xl leading-none cursor-pointer px-2"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
