import Link from "next/link";
import Image from "next/image";

const CLINIC_INFO = {
  nameKo: "모리스의원",
  representative: "이은아",
  businessNo: "265-52-00886",
  address: "서울시 강남대로 378 준빌딩 9층, 11층",
  phone: "02-555-6231",
} as const;

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* 로고 */}
          <div>
            <Image
              src="/images/original/logo-white.png"
              alt="MOLESS CLINIC"
              width={80}
              height={60}
              className="h-[50px] w-auto object-contain mb-4"
            />
          </div>

          {/* 클리닉 정보 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 tracking-wide">
              {CLINIC_INFO.nameKo}
            </h3>
            <div className="text-white/50 text-sm leading-loose space-y-1">
              <p>대표 : {CLINIC_INFO.representative}</p>
              <p>사업자등록번호 : {CLINIC_INFO.businessNo}</p>
              <p>주소 : {CLINIC_INFO.address}</p>
            </div>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 tracking-wider">
              CONTACT
            </h3>
            <div className="text-white/50 text-sm leading-loose">
              <p>TEL : {CLINIC_INFO.phone}</p>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} {CLINIC_INFO.nameKo}. All rights reserved.
          </p>
          <p className="text-white/[0.12] text-[11px] mt-3 leading-relaxed">
            이 웹사이트에 게시된 의료정보는 일반적인 정보 제공을 목적으로 하며, 의학적 진단이나 치료를 대체하지 않습니다.
            시술 결과는 개인에 따라 다를 수 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
