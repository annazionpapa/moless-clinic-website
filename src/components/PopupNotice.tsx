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

      {/* 노트패드 전체 — 살짝 기울어짐 (본사 동일) */}
      <div
        className="relative w-[88vw] max-w-[520px]"
        role="dialog"
        aria-modal="true"
        style={{ transform: "rotate(-1.5deg)" }}
      >
        {/* 스프링 고리 — 노트 상단 위에 걸침 */}
        <div className="relative" style={{ height: "20px", zIndex: 3 }}>
          <svg
            viewBox="0 0 520 30"
            className="absolute bottom-0 left-0 w-full"
            preserveAspectRatio="none"
            style={{ height: "30px", overflow: "visible" }}
          >
            {[70, 130, 190, 250, 310, 370, 430].map((x, i) => (
              <path
                key={i}
                d={`M ${x - 2},25 C ${x - 14},-5 ${x + 14},-5 ${x + 2},25`}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        {/* 노트 본체 — CSS 테두리 + 배경 */}
        <div
          style={{
            border: "4px solid #1a1a1a",
            borderRadius: "6px",
            overflow: "hidden",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* 크림색 콘텐츠 영역 */}
          <div
            style={{ backgroundColor: "#fafaf7" }}
            className="px-8 pt-10 pb-6 sm:px-12 sm:pt-12 sm:pb-8 text-center"
          >
            {/* 메가폰 + 확장완료 */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-[2.5rem] sm:text-[3rem] leading-none">📢</span>
              <h2
                className="font-black tracking-tight leading-none"
                style={{ fontSize: "clamp(1.8rem, 5.5vw, 2.6rem)" }}
              >
                확장완료
              </h2>
            </div>

            {/* 점선 구분 */}
            <div
              className="mx-auto my-4 sm:my-5"
              style={{
                width: "85%",
                height: "2.5px",
                backgroundImage:
                  "repeating-linear-gradient(to right, #555 0px, #555 8px, transparent 8px, transparent 14px)",
              }}
            />

            {/* 설명 */}
            <p style={{ fontSize: "clamp(0.85rem, 2.2vw, 1.05rem)", lineHeight: 1.7, marginBottom: "2px" }}>
              젠틀맥스프로플러스{" "}
              <span className="font-bold underline underline-offset-4 decoration-2">4대</span>
              , 아포지엘리트플러스{" "}
              <span className="font-bold underline underline-offset-4 decoration-2">2대</span>
            </p>
            <p style={{ fontSize: "clamp(0.85rem, 2.2vw, 1.05rem)", lineHeight: 1.7, marginBottom: "clamp(1.2rem, 3vw, 2rem)" }}>
              남/여 제모공간 분리 !
            </p>

            {/* 층별 안내 */}
            <div className="flex flex-col gap-5 sm:gap-7 items-center mb-6 sm:mb-8">
              {/* 11층 여성 */}
              <div className="flex items-center gap-4 sm:gap-7">
                <span
                  className="font-bold min-w-[3rem] text-right"
                  style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}
                >
                  11층
                </span>
                <svg width="30" height="55" viewBox="0 0 48 80" className="flex-shrink-0">
                  <circle cx="24" cy="10" r="10" fill="#E91E8C" />
                  <line x1="24" y1="24" x2="24" y2="52" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="10" y1="35" x2="38" y2="35" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                  <polygon points="12,35 36,35 30,50 18,50" fill="#E91E8C" />
                  <line x1="24" y1="52" x2="10" y2="75" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="24" y1="52" x2="38" y2="75" stroke="#E91E8C" strokeWidth="5.5" strokeLinecap="round" />
                </svg>
                <span className="font-bold" style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)" }}>
                  여성제모 &amp; 상담
                </span>
              </div>

              {/* 9층 남성 */}
              <div className="flex items-center gap-4 sm:gap-7">
                <span
                  className="font-bold min-w-[3rem] text-right"
                  style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}
                >
                  9층
                </span>
                <svg width="30" height="55" viewBox="0 0 48 80" className="flex-shrink-0">
                  <circle cx="24" cy="10" r="10" fill="#2196F3" />
                  <line x1="24" y1="24" x2="24" y2="52" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="10" y1="35" x2="38" y2="35" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="24" y1="52" x2="10" y2="75" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="24" y1="52" x2="38" y2="75" stroke="#2196F3" strokeWidth="5.5" strokeLinecap="round" />
                </svg>
                <span className="font-bold" style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)" }}>
                  남성제모
                </span>
              </div>
            </div>

            {/* @molessclinic */}
            <div className="flex items-center gap-3 px-2">
              <div className="flex-1 h-[1.5px] bg-[#333]" />
              <a
                href="https://www.instagram.com/molessclinic/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] sm:text-[13px] text-[#444] hover:text-black transition-colors whitespace-nowrap"
              >
                @molessclinic
              </a>
              <div className="flex-1 h-[1.5px] bg-[#333]" />
            </div>
          </div>

          {/* ══ 하단 바 — 노트 안에 일체형 (본사 동일) ══ */}
          <div
            className="flex items-center justify-between px-5 sm:px-8 py-3"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <button
              onClick={dismissToday}
              className="text-[11px] sm:text-[12px] text-gray-400 hover:text-white transition-colors cursor-pointer underline underline-offset-2"
            >
              오늘 하루 보지 않음
            </button>
            <button
              onClick={close}
              className="text-gray-400 hover:text-white transition-colors text-base leading-none cursor-pointer px-2"
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
