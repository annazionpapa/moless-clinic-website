"use client";

import { useEffect, useRef, useState } from "react";

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-animate]");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── 연락처 아이콘 ─── */
function IconPhone() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}
function IconMap() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
function IconSubway() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}
function IconNaver() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
    </svg>
  );
}
function IconKakao() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.716 1.562 5.11 3.938 6.535l-1 3.665 4.252-2.814A11.5 11.5 0 0012 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ─── 폼 데이터 타입 ─── */
interface FormData {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  message: string;
  agree: boolean;
}

const TREATMENT_OPTIONS = [
  "선택해주세요",
  "남성 수염 제모",
  "남성 바디 제모",
  "여성 얼굴 잔털 제모",
  "여성 브라질리언",
  "여성 바디 제모",
  "패키지 상담",
  "기타 문의",
];

export default function ReservationPage() {
  const sectionRef = useScrollAnimation();

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    treatment: TREATMENT_OPTIONS[0],
    message: "",
    agree: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // 유효성 검사
    if (!form.name.trim()) { setErrorMsg("이름을 입력해주세요."); return; }
    if (!form.phone.trim()) { setErrorMsg("전화번호를 입력해주세요."); return; }
    if (form.treatment === TREATMENT_OPTIONS[0]) { setErrorMsg("관심 시술을 선택해주세요."); return; }
    if (!form.agree) { setErrorMsg("개인정보 수집·이용에 동의해주세요."); return; }

    setStatus("loading");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          treatment_type: form.treatment,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", treatment: TREATMENT_OPTIONS[0], message: "", agree: false });
      } else {
        throw new Error("서버 오류");
      }
    } catch {
      setStatus("error");
      setErrorMsg("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const inputCls =
    "w-full border border-gray-200 bg-white px-4 py-3.5 text-[15px] text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-200";

  return (
    <>
      {/* 히어로 */}
      <section
        className="relative h-[50vh] min-h-[350px] flex items-center justify-center"
        style={{
          backgroundImage: "url(/images/original/clinic-interior-3.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            예약 / 문의
          </h1>
          <p className="text-white/70 text-base tracking-wide">
            毛 + LESS, 당신을 위한 레이저제모 클리닉
          </p>
        </div>
      </section>

      <div ref={sectionRef}>
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20">

              {/* ─── 왼쪽: 상담 폼 ─── */}
              <div>
                <div data-animate className="fade-up mb-10">
                  <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-3">
                    Consultation Form
                  </p>
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                    온라인 상담 신청
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">
                    접수 후 영업일 기준 1일 이내 연락드립니다.
                  </p>
                </div>

                {status === "success" ? (
                  <div data-animate className="fade-up border border-black p-10 text-center">
                    <p className="text-2xl font-light mb-3">감사합니다</p>
                    <p className="text-gray-500 text-[15px]">
                      상담 신청이 접수되었습니다.<br />
                      영업일 기준 1일 이내로 연락드리겠습니다.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="btn btn-outline mt-8 text-sm tracking-[0.06em] px-8 py-3"
                    >
                      다시 작성하기
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    data-animate
                    className="fade-up delay-100 space-y-4"
                  >
                    {/* 이름 */}
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">
                        이름 <span className="text-black">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="홍길동"
                        className={inputCls}
                        autoComplete="name"
                      />
                    </div>

                    {/* 전화번호 */}
                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">
                        전화번호 <span className="text-black">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="010-0000-0000"
                        className={inputCls}
                        autoComplete="tel"
                      />
                    </div>

                    {/* 이메일 (선택) */}
                    <div>
                      <label htmlFor="email" className="block text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">
                        이메일 <span className="text-gray-400 normal-case tracking-normal text-[11px]">(선택)</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className={inputCls}
                        autoComplete="email"
                      />
                    </div>

                    {/* 관심 시술 */}
                    <div>
                      <label htmlFor="treatment" className="block text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">
                        관심 시술 <span className="text-black">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="treatment"
                          name="treatment"
                          value={form.treatment}
                          onChange={handleChange}
                          className={`${inputCls} appearance-none cursor-pointer pr-10`}
                        >
                          {TREATMENT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} disabled={opt === TREATMENT_OPTIONS[0]}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* 문의 내용 */}
                    <div>
                      <label htmlFor="message" className="block text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">
                        문의 내용
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="문의하실 내용을 자유롭게 입력해주세요."
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {/* 개인정보 동의 */}
                    <div className="flex items-start gap-3 py-4 border-t border-gray-100">
                      <input
                        id="agree"
                        name="agree"
                        type="checkbox"
                        checked={form.agree}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 border border-gray-300 cursor-pointer accent-black"
                      />
                      <label htmlFor="agree" className="text-[13px] text-gray-600 leading-relaxed cursor-pointer">
                        <span className="font-medium text-black">개인정보 수집·이용에 동의합니다.</span>
                        <br />
                        수집항목: 이름, 전화번호, 이메일 / 목적: 상담 및 예약 안내 / 보유기간: 상담 완료 후 1년
                      </label>
                    </div>

                    {/* 에러 메시지 */}
                    {errorMsg && (
                      <p className="text-red-500 text-[13px]">{errorMsg}</p>
                    )}

                    {/* 제출 버튼 */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn btn-primary w-full text-sm tracking-[0.1em] py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? "전송 중…" : "상담 신청하기"}
                      {status !== "loading" && (
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                        </svg>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* ─── 오른쪽: 연락처 정보 + 외부 링크 ─── */}
              <div className="space-y-10">

                {/* 연락처 */}
                <div data-animate className="fade-up delay-200">
                  <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-6">
                    Contact
                  </p>
                  <div className="space-y-5">
                    <a
                      href="tel:025556231"
                      className="flex items-start gap-4 group"
                    >
                      <span className="text-gray-400 group-hover:text-black transition-colors mt-0.5 shrink-0">
                        <IconPhone />
                      </span>
                      <div>
                        <p className="text-[11px] text-gray-400 tracking-[0.15em] uppercase mb-0.5">Phone</p>
                        <p className="text-lg font-light group-hover:text-gray-600 transition-colors">
                          02-555-6231
                        </p>
                      </div>
                    </a>
                    <div className="flex items-start gap-4">
                      <span className="text-gray-400 mt-0.5 shrink-0">
                        <IconMap />
                      </span>
                      <div>
                        <p className="text-[11px] text-gray-400 tracking-[0.15em] uppercase mb-0.5">Address</p>
                        <p className="text-[15px] font-light leading-relaxed">
                          서울특별시 강남구 강남대로 지하 396<br />
                          준빌딩 9층 (남성) / 11층 (여성)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-gray-400 mt-0.5 shrink-0">
                        <IconSubway />
                      </span>
                      <div>
                        <p className="text-[11px] text-gray-400 tracking-[0.15em] uppercase mb-0.5">Subway</p>
                        <p className="text-[15px] font-light leading-relaxed">
                          2호선·신분당선 강남역 2번·3번 출구<br />
                          도보 1분
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 구분선 */}
                <div className="border-t border-gray-100" />

                {/* 외부 링크 */}
                <div data-animate className="fade-up delay-300">
                  <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-6">
                    Quick Links
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://booking.naver.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-gray-200 px-5 py-4 hover:border-black transition-colors duration-200 group"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-[#03C75A]"><IconNaver /></span>
                        <span className="font-medium text-[15px]">네이버 예약</span>
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                      </svg>
                    </a>
                    <a
                      href="https://pf.kakao.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-gray-200 px-5 py-4 hover:border-black transition-colors duration-200 group"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-[#FEE500]"><IconKakao /></span>
                        <span className="font-medium text-[15px]">카카오톡 상담</span>
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/molessclinic/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-gray-200 px-5 py-4 hover:border-black transition-colors duration-200 group"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-gray-700"><IconInstagram /></span>
                        <span className="font-medium text-[15px]">인스타그램</span>
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* 진료시간 요약 */}
                <div data-animate className="fade-up delay-400 bg-gray-50 p-6">
                  <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gray-400 mb-4">
                    Hours
                  </p>
                  <div className="space-y-2 text-[14px]">
                    <div className="flex justify-between">
                      <span className="text-gray-600">평일 (월–금)</span>
                      <span className="font-medium">11:00 – 21:00</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-[13px]">
                      <span>점심시간</span>
                      <span>14:00 – 15:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">주말 (토·일)</span>
                      <span className="font-medium">10:00 – 17:30</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-[13px]">
                      <span>공휴일</span>
                      <span>휴진</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
