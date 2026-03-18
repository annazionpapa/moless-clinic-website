"use client";

import { useEffect } from "react";

export default function ScrollAnimator() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const observe = () => {
      document
        .querySelectorAll<HTMLElement>("[data-scroll-animate]:not(.is-visible)")
        .forEach((el) => io.observe(el));
    };

    // 초기 관찰
    observe();

    // 동적으로 추가되는 요소도 감지
    const mo = new MutationObserver(() => observe());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
