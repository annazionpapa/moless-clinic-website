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

      {/* 노트패드 — 본사 크기 매칭, 살짝 기울어짐 */}
      <div
        className="relative w-[94vw] max-w-[680px]"
        role="dialog"
        aria-modal="true"
        style={{ transform: "rotate(-1.5deg)" }}
      >
        {/* 스프링 고리 */}
        <div className="relative" style={{ height: "22px", zIndex: 3 }}>
          <svg
            viewBox="0 0 680 35"
            className="absolute bottom-0 left-0 w-full"
            preserveAspectRatio="none"
            style={{ height: "35px", overflow: "visible" }}
          >
            {[90, 165, 240, 315, 390, 465, 540].map((x, i) => (
              <path
                key={i}
                d={`M ${x - 2},28 C ${x - 16},-6 ${x + 16},-6 ${x + 2},28`}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        {/* 노트 본체 */}
        <div
          style={{
            border: "5px solid #1a1a1a",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* 크림색 콘텐츠 — 넉넉한 내부 여백 */}
          <div
            style={{ backgroundColor: "#fafaf7" }}
            className="px-10 pt-14 pb-10 sm:px-16 sm:pt-16 sm:pb-12 text-center"
          >
            {/* 메가폰 + 확장완료 */}
            <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
              <span className="text-[3rem] sm:text-[4rem] leading-none">📢</span>
              <h2
                className="font-black tracking-tight leading-none"
                style={{ fontSize: "clamp(2.2rem, 6vw, 3.5rem)" }}
              >
                확장완료
              </h2>
            </div>

            {/* 점선 구분 — 위아래 넉넉한 간격 */}
            <div
              className="mx-auto"
              style={{
                width: "80%",
                height: "3px",
                marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
                backgroundImage:
                  "repeating-linear-gradient(to right, #555 0px, #555 8px, transparent 8px, transparent 14px)",
              }}
            />

            {/* 설명 — 점선과 충분히 떨어짐 */}
            <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", lineHeight: 1.8, marginBottom: "4px" }}>
              젠틀맥스프로플러스{" "}
              <span className="font-bold underline underline-offset-4 decoration-2">4대</span>
              , 아포지엘리트플러스{" "}
              <span className="font-bold underline underline-offset-4 decoration-2">2대</span>
            </p>
            <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", lineHeight: 1.8, marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
              남/여 제모공간 분리 !
            </p>

            {/* 층별 안내 — 넉넉한 간격 */}
            <div className="flex flex-col gap-8 sm:gap-10 items-center mb-10 sm:mb-14">
              {/* 11층 여성 */}
              <div className="flex items-center gap-6 sm:gap-8">
                <span
                  className="font-bold min-w-[3.5rem] text-right"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}
                >
                  11층
                </span>
                <svg width="36" height="62" viewBox="0 0 48 80" className="flex-shrink-0">
                  <circle cx="24" cy="10" r="10" fill="#E91E8C" />
                  <line x1="24" y1="24" x2="24" y2="52" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="10" y1="35" x2="38" y2="35" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                  <polygon points="12,35 36,35 30,50 18,50" fill="#E91E8C" />
                  <line x1="24" y1="52" x2="10" y2="75" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="24" y1="52" x2="38" y2="75" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                </svg>
                <span className="font-bold" style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}>
                  여성제모 &amp; 상담
                </span>
              </div>

              {/* 9층 남성 */}
              <div className="flex items-center gap-6 sm:gap-8">
                <span
                  className="font-bold min-w-[3.5rem] text-right"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}
                >
                  9층
                </span>
                <svg width="36" height="62" viewBox="0 0 48 80" className="flex-shrink-0">
                  <circle cx="24" cy="10" r="10" fill="#2196F3" />
                  <line x1="24" y1="24" x2="24" y2="52" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="10" y1="35" x2="38" y2="35" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="24" y1="52" x2="10" y2="75" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="24" y1="52" x2="38" y2="75" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                </svg>
                <span className="font-bold" style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}>
                  남성제모
                </span>
              </div>
            </div>

            {/* @molessclinic — 9층과 충분히 떨어짐, 하단 바와도 여유 */}
            <div className="flex items-center gap-3 px-4 mb-6 sm:mb-8">
              <div className="flex-1 h-[1.5px] bg-[#333]" />
              <a
                href="https://www.instagram.com/molessclinic/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] sm:text-[15px] text-[#444] hover:text-black transition-colors whitespace-nowrap"
              >
                @molessclinic
              </a>
              <div className="flex-1 h-[1.5px] bg-[#333]" />
            </div>
          </div>

          {/* 하단 바 — 노트 안에 일체형 */}
          <div
            className="flex items-center justify-between px-6 sm:px-10 py-3.5"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <button
              onClick={dismissToday}
              className="text-[12px] sm:text-[13px] text-gray-400 hover:text-white transition-colors cursor-pointer underline underline-offset-2"
            >
              오늘 하루 보지 않음
            </button>
            <button
              onClick={close}
              className="text-gray-400 hover:text-white transition-colors text-lg leading-none cursor-pointer px-2"
              aria-label="닫기"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
