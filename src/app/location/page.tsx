"use client";

import Image from "next/image";

export default function LocationPage() {
  return (
    <>
      {/* 히어로 */}
      <section
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: "url(/images/original/gangnam-map.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            오시는 길
          </h1>
          <p className="text-white/70 text-base tracking-wide">
            강남역 2, 3번출구 도보 1분
          </p>
        </div>
      </section>

      {/* 지도 + 정보 */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* 지도 */}
            <div className="fade-up" data-scroll-animate>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.354!2d127.028!3d37.498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI5JzUyLjgiTiAxMjfCsDAxJzQxLjIiRQ!5e0!3m2!1sko!2skr!4v1"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>

            {/* 정보 */}
            <div className="fade-up delay-200" data-scroll-animate>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">오시는 길</h2>

              <div className="space-y-2 text-base text-[#333] mb-10">
                <p className="font-medium text-lg">서울특별시 강남대로378, 준빌딩</p>
                <p>9층 남성제모</p>
                <p>11층 여성제모 &amp; 상담</p>
                <p className="text-[#737373]">(강남역 2, 3번출구 도보1분)</p>
              </div>

              <h3 className="text-2xl font-bold mb-6">진료 시간</h3>
              <div className="space-y-4 text-base">
                <div className="flex gap-6 pb-4 border-b border-gray-100">
                  <span className="font-bold min-w-[4rem]">평일</span>
                  <span>11:00 – 21:00 &nbsp;<span className="text-[#999]">(점심시간 14:00~15:00)</span></span>
                </div>
                <div className="flex gap-6 pb-4 border-b border-gray-100">
                  <span className="font-bold min-w-[4rem]">주말</span>
                  <span>10:00 – 17:30</span>
                </div>
              </div>

              {/* 층수 안내 */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="bg-[#f5f5f5] p-6 text-center">
                  <p className="text-3xl font-bold mb-1">9층</p>
                  <p className="text-[#333] text-sm">남성제모</p>
                </div>
                <div className="bg-[#f5f5f5] p-6 text-center">
                  <p className="text-3xl font-bold mb-1">11층</p>
                  <p className="text-[#333] text-sm">여성제모 &amp; 상담</p>
                </div>
              </div>

              {/* 주차 */}
              <div className="mt-8 p-6 border border-gray-200">
                <p className="font-bold mb-2">주차 안내</p>
                <p className="text-[#666] text-sm leading-relaxed">
                  준빌딩 건물 주차장 이용 가능<br />
                  시술 시 1시간 무료 주차 제공
                </p>
              </div>

              {/* 전화 */}
              <a
                href="tel:025556231"
                className="mt-6 block text-center bg-black text-white py-4 text-lg font-medium tracking-wider hover:bg-gray-800 transition-colors"
              >
                TEL : 02-555-6231
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
