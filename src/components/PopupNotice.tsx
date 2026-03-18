"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "moless-popup-dismissed";

export default function PopupNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const ts = Number(dismissed);
      if (Date.now() - ts < 24 * 60 * 60 * 1000) return; // 24시간 이내
    }
    // 약간의 딜레이 후 표시 (페이지 로드 직후가 아니라 자연스럽게)
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
      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease]"
        onClick={close}
      />

      {/* 팝업 카드 */}
      <div
        className="relative w-full max-w-[420px] animate-[slideUp_0.4s_var(--ease-out-expo)]"
        role="dialog"
        aria-modal="true"
        aria-label="공지사항 팝업"
      >
        {/* ── 스프링 바인딩 장식 ── */}
        <div className="relative flex justify-center gap-6 -mb-3" style={{ zIndex: 2 }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-gray-300 border-2 border-gray-400 shadow-inner" />
              <div className="w-[2px] h-3 bg-gray-400 -mt-[2px]" />
            </div>
          ))}
        </div>

        {/* ── 메모장 본체 ── */}
        <div
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{ zIndex: 1 }}
        >
          {/* 상단 장식 라인 */}
          <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" />

          {/* 본문 */}
          <div className="px-6 pt-8 pb-6 text-center">
            {/* 메가폰 아이콘 + GRAND OPEN */}
            <div className="mb-4">
              <span className="text-3xl">📢</span>
              <h2
                className="text-2xl font-black tracking-wider mt-2"
                style={{ color: "var(--color-black)" }}
              >
                GRAND OPEN
              </h2>
            </div>

            {/* 구분선 */}
            <div className="w-16 h-[2px] bg-gray-300 mx-auto my-4" />

            {/* 병원 이름 */}
            <p className="text-lg font-bold mb-5" style={{ color: "var(--color-black)" }}>
              모리스의원 2호점 (강남점)
            </p>

            {/* 공지 항목 */}
            <div className="space-y-3 text-[15px] leading-relaxed">
              <div className="flex items-center justify-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-500 text-xs flex-shrink-0">
                  ✦
                </span>
                <span className="text-gray-800 font-medium">
                  젠틀맥스프로플러스 정품 장비 보유
                </span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-50 text-pink-500 text-xs flex-shrink-0">
                  ♀
                </span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-500 text-xs flex-shrink-0">
                  ♂
                </span>
                <span className="text-gray-800 font-medium">
                  남/여 제모공간 완벽 분리
                </span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-50 text-amber-500 text-xs flex-shrink-0">
                  ★
                </span>
                <span className="text-gray-800 font-bold">
                  오픈 기념 특별 할인 진행중!
                </span>
              </div>
            </div>

            {/* 구분선 */}
            <div className="w-16 h-[2px] bg-gray-300 mx-auto my-5" />

            {/* 인스타그램 링크 */}
            <a
              href="https://www.instagram.com/molessclinic/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @molessclinic
            </a>
          </div>

          {/* ── 하단 검은 바 ── */}
          <div className="flex items-center justify-between bg-gray-900 px-4 py-3">
            <button
              onClick={dismissToday}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-4 h-4 border border-gray-500 rounded-sm text-[10px]">
                ✓
              </span>
              오늘 하루 보지 않음
            </button>
            <button
              onClick={close}
              className="text-gray-300 hover:text-white transition-colors text-xl leading-none cursor-pointer px-1"
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
