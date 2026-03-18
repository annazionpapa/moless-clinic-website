"use client";

import { useEffect } from "react";

/**
 * 스크롤 진입 시 [data-scroll-animate] 속성을 가진 요소들에
 * 'is-visible' 클래스를 추가해 CSS 트랜지션을 트리거합니다.
 *
 * globals.css의 .fade-up / .fade-in 클래스와 함께 사용합니다.
 */
export default function ScrollAnimator() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-scroll-animate]"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // 한번 보이면 관찰 중단 (반복 재생 원하면 아래 줄 주석 해제)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null; // UI 없는 순수 동작 컴포넌트
}
