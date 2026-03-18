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
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={close} />

      {/* 팝업 */}
      <div
        className="relative w-full max-w-[560px]"
        role="dialog"
        aria-modal="true"
        aria-label="공지사항 팝업"
      >
        {/* ── 스프링 바인딩 (본사 스타일 그대로) ── */}
        <div className="relative flex justify-between px-12 -mb-2" style={{ zIndex: 3 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-6 h-6 rounded-full bg-white border-[3px] border-[#333]"
                style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.15)" }}
              />
              <div className="w-[3px] h-4 bg-[#333] -mt-1 rounded-b-full" />
            </div>
          ))}
        </div>

        {/* ── 노트 본체 (손그림 테두리) ── */}
        <div
          className="relative bg-[#fafaf8] overflow-hidden"
          style={{
            border: "3px solid #222",
            borderRadius: "8px",
            boxShadow: "4px 6px 20px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(0,0,0,0.05)",
          }}
        >
          {/* 메인 콘텐츠 */}
          <div className="px-8 pt-10 pb-8 text-center sm:px-12 sm:pt-12 sm:pb-10">
            {/* 메가폰 + 제목 */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-[2.8rem] sm:text-[3.5rem] leading-none">📢</span>
              <h2
                className="text-[2.2rem] sm:text-[2.8rem] font-black tracking-tight leading-none"
                style={{ fontFamily: "'Pretendard', sans-serif" }}
              >
                GRAND OPEN
              </h2>
            </div>

            {/* 점선 구분 */}
            <div
              className="mx-auto my-5 sm:my-6"
              style={{
                width: "80%",
                height: "2px",
                backgroundImage: "repeating-linear-gradient(to right, #999 0px, #999 6px, transparent 6px, transparent 12px)",
              }}
            />

            {/* 장비 정보 */}
            <p className="text-[1.05rem] sm:text-[1.2rem] leading-relaxed mb-1">
              젠틀맥스프로플러스 <span className="font-bold underline underline-offset-4">정품</span> 장비 보유
            </p>
            <p className="text-[1.05rem] sm:text-[1.2rem] leading-relaxed mb-6">
              남/여 제모공간 분리 !
            </p>

            {/* 층별 안내 - 본사 스타일 */}
            <div className="flex flex-col gap-4 items-center mb-6">
              {/* 11층 여성 */}
              <div className="flex items-center gap-5">
                <span className="text-[1.4rem] sm:text-[1.6rem] font-bold min-w-[3.5rem] text-right">11층</span>
                <svg width="36" height="52" viewBox="0 0 36 52" fill="none" className="flex-shrink-0">
                  <circle cx="18" cy="8" r="7" fill="#E91E8C" />
                  <path d="M18 18 L18 38 M10 26 L26 26 M18 38 L10 52 M18 38 L26 52" stroke="#E91E8C" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M10 26 L26 26 L24 34 L12 34 Z" fill="#E91E8C" />
                </svg>
                <span className="text-[1.2rem] sm:text-[1.4rem] font-bold">여성제모 &amp; 상담</span>
              </div>

              {/* 9층 남성 */}
              <div className="flex items-center gap-5">
                <span className="text-[1.4rem] sm:text-[1.6rem] font-bold min-w-[3.5rem] text-right">9층</span>
                <svg width="36" height="52" viewBox="0 0 36 52" fill="none" className="flex-shrink-0">
                  <circle cx="18" cy="8" r="7" fill="#2196F3" />
                  <path d="M18 18 L18 38 M10 26 L26 26 M18 38 L10 52 M18 38 L26 52" stroke="#2196F3" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <span className="text-[1.2rem] sm:text-[1.4rem] font-bold">남성제모</span>
              </div>
            </div>
          </div>

          {/* @molessclinic - 본사 스타일 */}
          <div className="flex items-center justify-center gap-4 pb-8">
            <div className="flex-1 h-px bg-[#333] ml-8 sm:ml-12" />
            <a
              href="https://www.instagram.com/molessclinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-[#333] hover:text-black transition-colors whitespace-nowrap"
            >
              @molessclinic
            </a>
            <div className="flex-1 h-px bg-[#333] mr-8 sm:mr-12" />
          </div>
        </div>

        {/* ── 하단 검은 바 (본사 스타일 그대로) ── */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            backgroundColor: "#222",
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        >
          <button
            onClick={dismissToday}
            className="text-[13px] text-gray-300 hover:text-white transition-colors cursor-pointer underline underline-offset-2"
          >
            오늘 하루 보지 않음
          </button>
          <button
            onClick={close}
            className="text-gray-300 hover:text-white transition-colors text-xl leading-none cursor-pointer px-2"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
