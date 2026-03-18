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
        {/* ══ 전체를 SVG 노트패드로 감싸기 ══ */}
        <div className="relative">
          {/* SVG 스프링 + 테두리 (손그림 스타일) */}
          <svg
            viewBox="0 0 700 780"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            {/* 노트 본체 테두리 - 둥근 손그림 스타일 */}
            <path
              d="M 40,50
                 C 40,30 60,20 80,20
                 L 620,20
                 C 640,20 660,30 660,50
                 L 665,720
                 C 665,745 645,758 620,758
                 L 80,760
                 C 55,760 38,745 35,720
                 Z"
              fill="#fafaf7"
              stroke="#1a1a1a"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* 스프링 고리들 - 본사처럼 노트 위에 걸치는 곡선 */}
            {[120, 195, 270, 345, 420, 495, 570].map((x, i) => (
              <path
                key={i}
                d={`M ${x - 2},35 C ${x - 16},-5 ${x + 16},-5 ${x + 2},35`}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* 콘텐츠 영역 */}
          <div className="relative" style={{ zIndex: 2, minHeight: "65vh" }}>
            <div className="flex flex-col" style={{ minHeight: "65vh" }}>
              {/* 메인 콘텐츠 */}
              <div className="flex-1 flex flex-col justify-center px-12 pt-16 pb-8 text-center sm:px-20 sm:pt-20">
                {/* 메가폰 + GRAND OPEN */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-[3.5rem] sm:text-[5rem] leading-none">📢</span>
                  <h2 className="text-[2.8rem] sm:text-[4rem] font-black tracking-tight leading-none">
                    GRAND OPEN
                  </h2>
                </div>

                {/* 점선 구분 */}
                <div
                  className="mx-auto my-6 sm:my-8"
                  style={{
                    width: "85%",
                    height: "3px",
                    backgroundImage:
                      "repeating-linear-gradient(to right, #777 0px, #777 10px, transparent 10px, transparent 16px)",
                  }}
                />

                {/* 설명 */}
                <p className="text-[1.2rem] sm:text-[1.5rem] leading-relaxed mb-1">
                  젠틀맥스프로플러스{" "}
                  <span className="font-bold underline underline-offset-4 decoration-2">정품</span>{" "}
                  장비 보유
                </p>
                <p className="text-[1.2rem] sm:text-[1.5rem] leading-relaxed mb-10 sm:mb-14">
                  남/여 제모공간 분리 !
                </p>

                {/* 층별 안내 */}
                <div className="flex flex-col gap-8 sm:gap-12 items-center">
                  {/* 11층 여성 */}
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="text-[1.7rem] sm:text-[2.2rem] font-bold min-w-[4rem] text-right">11층</span>
                    <svg width="48" height="80" viewBox="0 0 48 80" className="flex-shrink-0">
                      <circle cx="24" cy="10" r="10" fill="#E91E8C" />
                      <line x1="24" y1="24" x2="24" y2="52" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                      <line x1="10" y1="35" x2="38" y2="35" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                      <polygon points="12,35 36,35 30,50 18,50" fill="#E91E8C" />
                      <line x1="24" y1="52" x2="10" y2="75" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                      <line x1="24" y1="52" x2="38" y2="75" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-[1.4rem] sm:text-[1.8rem] font-bold">여성제모 &amp; 상담</span>
                  </div>

                  {/* 9층 남성 */}
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="text-[1.7rem] sm:text-[2.2rem] font-bold min-w-[4rem] text-right">9층</span>
                    <svg width="48" height="80" viewBox="0 0 48 80" className="flex-shrink-0">
                      <circle cx="24" cy="10" r="10" fill="#2196F3" />
                      <line x1="24" y1="24" x2="24" y2="52" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                      <line x1="10" y1="35" x2="38" y2="35" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                      <line x1="24" y1="52" x2="10" y2="75" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                      <line x1="24" y1="52" x2="38" y2="75" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-[1.4rem] sm:text-[1.8rem] font-bold">남성제모</span>
                  </div>
                </div>
              </div>

              {/* @molessclinic - 하단 고정 */}
              <div className="flex items-center gap-4 px-12 pb-12 sm:px-20 sm:pb-14 mt-auto">
                <div className="flex-1 h-[2px] bg-[#222]" />
                <a
                  href="https://www.instagram.com/molessclinic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] sm:text-[16px] text-[#333] hover:text-black transition-colors whitespace-nowrap"
                >
                  @molessclinic
                </a>
                <div className="flex-1 h-[2px] bg-[#222]" />
              </div>
            </div>
          </div>
        </div>

        {/* 하단 검은 바 */}
        <div className="flex items-center justify-between bg-[#111] px-5 py-3.5 relative" style={{ zIndex: 3 }}>
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
