import Link from "next/link";
import Image from "next/image";

const CLINIC_INFO = {
  nameKo: "모리스의원",
  representative: "이은아",
  businessNo: "265-52-00886",
  address: "서울시 강남대로 378 준빌딩 9층, 11층",
  phone: "02-555-6231",
} as const;

const FOOTER_LINKS = [
  { label: "병원소개", href: "/about" },
  { label: "보유장비", href: "/equipment" },
  { label: "시술안내", href: "/treatment" },
  { label: "가격안내", href: "/pricing" },
  { label: "예약/문의", href: "/reservation" },
  { label: "오시는 길", href: "/location" },
] as const;

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-black)" }} className="text-white">
      <div
        className="py-16 lg:py-20"
        style={{ maxWidth: "var(--max-width)", marginInline: "auto", paddingInline: "var(--container-padding)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* 로고 + 링크 */}
          <div>
            <Image
              src="/images/original/logo-white.png"
              alt="MOLESS CLINIC"
              width={160}
              height={80}
              className="w-auto object-contain mb-8"
              style={{ height: "50px" }}
            />
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/40 hover:text-white/70 transition-colors link-underline"
                  style={{
                    fontSize: "13px",
                    fontFamily: "var(--font-body)",
                    transitionDuration: "var(--duration-fast)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 클리닉 정보 */}
          <div>
            <h3
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              {CLINIC_INFO.nameKo}
            </h3>
            <div className="text-white/40 leading-loose space-y-1" style={{ fontSize: "13px" }}>
              <p>대표 : {CLINIC_INFO.representative}</p>
              <p>사업자등록번호 : {CLINIC_INFO.businessNo}</p>
              <p>주소 : {CLINIC_INFO.address}</p>
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h3
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              CONTACT
            </h3>
            <div className="text-white/40 leading-loose" style={{ fontSize: "13px" }}>
              <p>TEL : {CLINIC_INFO.phone}</p>
            </div>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/molessclinic/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/60 transition-colors"
                style={{ fontSize: "13px", transitionDuration: "var(--duration-fast)" }}
              >
                Instagram
              </a>
              <a
                href="https://pf.kakao.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/60 transition-colors"
                style={{ fontSize: "13px", transitionDuration: "var(--duration-fast)" }}
              >
                KakaoTalk
              </a>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <p className="text-white/20" style={{ fontSize: "12px" }}>
            © {new Date().getFullYear()} {CLINIC_INFO.nameKo}. All rights reserved.
          </p>
          <p className="text-white/[0.12] mt-3 leading-relaxed" style={{ fontSize: "11px" }}>
            이 웹사이트에 게시된 의료정보는 일반적인 정보 제공을 목적으로 하며, 의학적 진단이나 치료를 대체하지 않습니다.
            시술 결과는 개인에 따라 다를 수 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
