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
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }}>
      <div className="absolute inset-0 bg-black/40" onClick={close} />

      <div className="relative w-[92vw] max-w-[700px]" role="dialog" aria-modal="true">
        {/* 스프링 바인딩 - 본사처럼 곡선 고리 */}
        <svg
          viewBox="0 0 700 50"
          className="relative w-full -mb-[6px]"
          style={{ zIndex: 3 }}
          preserveAspectRatio="xMidYMax meet"
        >
          {[95, 170, 245, 320, 395, 470, 545, 620].map((x, i) => (
            <g key={i}>
              <ellipse cx={x} cy="18" rx="14" ry="16" fill="none" stroke="#222" strokeWidth="4.5" />
              <line x1={x} y1="34" x2={x} y2="50" stroke="#222" strokeWidth="4.5" />
            </g>
          ))}
        </svg>

        {/* 노트 본체 - 두꺼운 손그림 테두리 */}
        <div
          className="flex flex-col"
          style={{
            background: "#fafaf7",
            border: "5px solid #222",
            borderRadius: "18px",
            boxShadow: "5px 8px 25px rgba(0,0,0,0.3)",
            position: "relative",
            zIndex: 2,
            minHeight: "65vh",
          }}
        >
          <div className="flex-1 flex flex-col justify-center px-10 pt-16 pb-12 text-center sm:px-16 sm:pt-20 sm:pb-16">
            {/* 메가폰 + 제목 */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-[3.5rem] sm:text-[5rem] leading-none">📢</span>
              <h2 className="text-[2.8rem] sm:text-[4rem] font-black tracking-tight leading-none">
                GRAND OPEN
              </h2>
            </div>

            {/* 점선 */}
            <div
              className="mx-auto my-8 sm:my-10"
              style={{
                width: "90%",
                height: "3px",
                backgroundImage:
                  "repeating-linear-gradient(to right, #777 0px, #777 10px, transparent 10px, transparent 16px)",
              }}
            />

            {/* 설명 텍스트 */}
            <p className="text-[1.3rem] sm:text-[1.6rem] leading-relaxed mb-1 tracking-tight">
              젠틀맥스프로플러스 <span className="font-bold underline underline-offset-4 decoration-2">정품</span> 장비 보유
            </p>
            <p className="text-[1.3rem] sm:text-[1.6rem] leading-relaxed mb-12 sm:mb-16 tracking-tight">
              남/여 제모공간 분리 !
            </p>

            {/* 층별 안내 */}
            <div className="flex flex-col gap-10 sm:gap-14 items-center mb-12 sm:mb-16">
              {/* 11층 여성 */}
              <div className="flex items-center gap-8">
                <span className="text-[1.8rem] sm:text-[2.2rem] font-bold min-w-[4.5rem] text-right">11층</span>
                <svg width="44" height="72" viewBox="0 0 44 72" className="flex-shrink-0">
                  <circle cx="22" cy="10" r="9" fill="#E91E8C" />
                  <line x1="22" y1="22" x2="22" y2="48" stroke="#E91E8C" strokeWidth="5" strokeLinecap="round" />
                  <line x1="10" y1="32" x2="34" y2="32" stroke="#E91E8C" strokeWidth="5" strokeLinecap="round" />
                  <polygon points="12,32 32,32 28,46 16,46" fill="#E91E8C" />
                  <line x1="22" y1="48" x2="10" y2="68" stroke="#E91E8C" strokeWidth="5" strokeLinecap="round" />
                  <line x1="22" y1="48" x2="34" y2="68" stroke="#E91E8C" strokeWidth="5" strokeLinecap="round" />
                </svg>
                <span className="text-[1.5rem] sm:text-[1.9rem] font-bold">여성제모 &amp; 상담</span>
              </div>

              {/* 9층 남성 */}
              <div className="flex items-center gap-8">
                <span className="text-[1.8rem] sm:text-[2.2rem] font-bold min-w-[4.5rem] text-right">9층</span>
                <svg width="44" height="72" viewBox="0 0 44 72" className="flex-shrink-0">
                  <circle cx="22" cy="10" r="9" fill="#2196F3" />
                  <line x1="22" y1="22" x2="22" y2="48" stroke="#2196F3" strokeWidth="5" strokeLinecap="round" />
                  <line x1="10" y1="32" x2="34" y2="32" stroke="#2196F3" strokeWidth="5" strokeLinecap="round" />
                  <line x1="22" y1="48" x2="10" y2="68" stroke="#2196F3" strokeWidth="5" strokeLinecap="round" />
                  <line x1="22" y1="48" x2="34" y2="68" stroke="#2196F3" strokeWidth="5" strokeLinecap="round" />
                </svg>
                <span className="text-[1.5rem] sm:text-[1.9rem] font-bold">남성제모</span>
              </div>
            </div>

            {/* 여백 */}
            <div className="h-10 sm:h-16" />
          </div>

          {/* @molessclinic */}
          <div className="flex items-center gap-4 px-10 pb-10 sm:px-16 sm:pb-12 mt-auto">
            <div className="flex-1 h-[2px] bg-[#222]" />
            <a
              href="https://www.instagram.com/molessclinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] sm:text-[17px] text-[#333] hover:text-black transition-colors whitespace-nowrap"
            >
              @molessclinic
            </a>
            <div className="flex-1 h-[2px] bg-[#222]" />
          </div>
        </div>

        {/* 하단 검은 바 */}
        <div className="flex items-center justify-between bg-[#111] px-5 py-3.5">
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
