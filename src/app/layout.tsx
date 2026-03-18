import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

/* ─── 메타데이터 ─── */
export const metadata: Metadata = {
  title: {
    default: "모리스의원 2호점 | 레이저 제모 전문",
    template: "%s | 모리스의원 2호점",
  },
  description:
    "모리스의원 2호점 — 레이저 제모 전문 의원. 최신 장비로 안전하고 효과적인 제모 시술을 제공합니다. 네이버 예약 및 카카오톡 상담 가능.",
  keywords: [
    "레이저 제모",
    "제모 전문",
    "모리스의원",
    "체모제거",
    "왁싱",
    "피부과",
    "레이저",
  ],
  authors: [{ name: "모리스의원" }],
  creator: "모리스의원",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "모리스의원 2호점",
    title: "모리스의원 2호점 | 레이저 제모 전문",
    description:
      "레이저 제모 전문 의원. 안전하고 효과적인 시술로 자신감 있는 피부를 선물합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "모리스의원 2호점 | 레이저 제모 전문",
    description: "레이저 제모 전문 의원. 안전하고 효과적인 시술.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── 루트 레이아웃 ─── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head />
      <body className="font-sans antialiased">
        {/* 고정 헤더 */}
        <Header />

        {/* 페이지 콘텐츠 */}
        <main>{children}</main>

        {/* 푸터 */}
        <Footer />

        {/* 스크롤 진입 애니메이션 처리 */}
        <ScrollAnimator />
      </body>
    </html>
  );
}
