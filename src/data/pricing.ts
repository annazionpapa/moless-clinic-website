/* ─────────────────────────────────────────
   모리스의원 가격 데이터 (2025.03 기준)
   VAT 별도
───────────────────────────────────────── */

export interface PriceItem {
  name: string;
  description?: string;
  /** 회차별 가격 (없으면 undefined) */
  sessions?: {
    label: string;   // "5회", "10회" 등
    original: number;
    sale: number;
  }[];
  /** 1회 단일 가격 */
  single?: {
    original: number;
    sale: number;
  };
}

export interface PriceSection {
  category: string;
  items: PriceItem[];
}

/* ─── 이벤트 정보 ─── */
export const EVENT_INFO = {
  title: "3월 젠틀맥스프로플러스 이벤트",
  period: "2025.03.01 ~ 2025.03.31",
  description: "젠틀맥스프로플러스 장비를 활용한 3월 한정 특가 이벤트입니다.",
} as const;

/* ─── No 마취 챌린지 ─── */
export const NO_ANESTHESIA_CHALLENGE = {
  title: "No 마취 챌린지",
  rules: [
    { sessions: 5, bonus: 1, label: "5회 성공 시 +1회 추가 제공" },
    { sessions: 10, bonus: 2, label: "10회 성공 시 +2회 추가 제공" },
  ],
  description:
    "마취 크림 없이 시술 완료 시 인정됩니다. 아이스팩·쿨링만 사용 가능.",
} as const;

/* ─────────────────────────────────────────
   남성 가격표
───────────────────────────────────────── */
export const MALE_PRICING: PriceSection[] = [
  {
    category: "얼굴 제모",
    items: [
      {
        name: "남성 수염 제모 (전체)",
        description: "윗입술·아랫입술·턱·볼 전체 포함",
        sessions: [
          { label: "5회", original: 500_000, sale: 350_000 },
          { label: "10회", original: 900_000, sale: 500_000 },
        ],
      },
      {
        name: "크라이오 추가관리",
        description: "냉각 쿨링 집중 케어 (피부 민감 부위 병행)",
        sessions: [
          { label: "5회", original: 150_000, sale: 100_000 },
          { label: "10회", original: 250_000, sale: 170_000 },
        ],
      },
      {
        name: "인중 + 앞턱",
        description: "인중·입술 주변·앞턱 한정",
        sessions: [
          { label: "5회", original: 200_000, sale: 130_000 },
          { label: "10회", original: 350_000, sale: 220_000 },
        ],
      },
      {
        name: "이마",
        description: "헤어라인·이마 상단 잔털",
        sessions: [
          { label: "5회", original: 180_000, sale: 120_000 },
          { label: "10회", original: 300_000, sale: 200_000 },
        ],
      },
    ],
  },
  {
    category: "상체 제모",
    items: [
      {
        name: "겨드랑이",
        sessions: [
          { label: "5회", original: 150_000, sale: 100_000 },
          { label: "10회", original: 250_000, sale: 160_000 },
        ],
      },
      {
        name: "팔 상완",
        sessions: [
          { label: "5회", original: 200_000, sale: 140_000 },
          { label: "10회", original: 350_000, sale: 240_000 },
        ],
      },
      {
        name: "팔 하완",
        sessions: [
          { label: "5회", original: 200_000, sale: 140_000 },
          { label: "10회", original: 350_000, sale: 240_000 },
        ],
      },
      {
        name: "팔 전체 (상완 + 하완)",
        sessions: [
          { label: "5회", original: 350_000, sale: 230_000 },
          { label: "10회", original: 600_000, sale: 390_000 },
        ],
      },
      {
        name: "손등 + 손가락",
        sessions: [
          { label: "5회", original: 120_000, sale: 80_000 },
          { label: "10회", original: 200_000, sale: 140_000 },
        ],
      },
      {
        name: "가슴",
        sessions: [
          { label: "5회", original: 300_000, sale: 200_000 },
          { label: "10회", original: 500_000, sale: 330_000 },
        ],
      },
      {
        name: "복부",
        sessions: [
          { label: "5회", original: 250_000, sale: 170_000 },
          { label: "10회", original: 430_000, sale: 290_000 },
        ],
      },
      {
        name: "등",
        sessions: [
          { label: "5회", original: 350_000, sale: 230_000 },
          { label: "10회", original: 600_000, sale: 390_000 },
        ],
      },
      {
        name: "유륜",
        sessions: [
          { label: "5회", original: 120_000, sale: 80_000 },
          { label: "10회", original: 200_000, sale: 140_000 },
        ],
      },
    ],
  },
  {
    category: "하체 제모",
    items: [
      {
        name: "종아리 + 무릎",
        sessions: [
          { label: "5회", original: 250_000, sale: 170_000 },
          { label: "10회", original: 430_000, sale: 290_000 },
        ],
      },
      {
        name: "허벅지 + 무릎",
        sessions: [
          { label: "5회", original: 300_000, sale: 200_000 },
          { label: "10회", original: 500_000, sale: 330_000 },
        ],
      },
      {
        name: "다리 전체",
        sessions: [
          { label: "5회", original: 500_000, sale: 330_000 },
          { label: "10회", original: 850_000, sale: 560_000 },
        ],
      },
      {
        name: "발등 + 발가락",
        sessions: [
          { label: "5회", original: 120_000, sale: 80_000 },
          { label: "10회", original: 200_000, sale: 140_000 },
        ],
      },
    ],
  },
  {
    category: "특수 부위",
    items: [
      {
        name: "남성 브라질리언 + 항문",
        description: "음모 전체 + 항문 주변 포함",
        sessions: [
          { label: "5회", original: 450_000, sale: 300_000 },
          { label: "10회", original: 780_000, sale: 520_000 },
        ],
      },
      {
        name: "항문",
        sessions: [
          { label: "5회", original: 200_000, sale: 130_000 },
          { label: "10회", original: 340_000, sale: 220_000 },
        ],
      },
      {
        name: "배럿 나루 (구렛나루)",
        sessions: [
          { label: "5회", original: 150_000, sale: 100_000 },
          { label: "10회", original: 250_000, sale: 170_000 },
        ],
      },
      {
        name: "엉덩이",
        sessions: [
          { label: "5회", original: 250_000, sale: 170_000 },
          { label: "10회", original: 430_000, sale: 290_000 },
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────
   여성 가격표
───────────────────────────────────────── */
export const FEMALE_PRICING: PriceSection[] = [
  {
    category: "특수 부위",
    items: [
      {
        name: "여성 브라질리언 (음모 전체)",
        description: "여자 의사 전담 시술",
        sessions: [
          { label: "5회", original: 350_000, sale: 230_000 },
          { label: "10회", original: 600_000, sale: 390_000 },
        ],
      },
      {
        name: "항문",
        sessions: [
          { label: "5회", original: 150_000, sale: 100_000 },
          { label: "10회", original: 250_000, sale: 170_000 },
        ],
      },
      {
        name: "브라질리언 + 항문",
        sessions: [
          { label: "5회", original: 450_000, sale: 290_000 },
          { label: "10회", original: 780_000, sale: 490_000 },
        ],
      },
      {
        name: "엉덩이",
        sessions: [
          { label: "5회", original: 200_000, sale: 140_000 },
          { label: "10회", original: 340_000, sale: 230_000 },
        ],
      },
    ],
  },
  {
    category: "패키지",
    items: [
      {
        name: "패키지 A (겨드랑이 + 다리 전체)",
        sessions: [
          { label: "5회", original: 500_000, sale: 310_000 },
          { label: "10회", original: 850_000, sale: 520_000 },
        ],
      },
      {
        name: "패키지 B (겨드랑이 + 브라질리언 + 다리 전체)",
        sessions: [
          { label: "5회", original: 720_000, sale: 470_000 },
          { label: "10회", original: 1_200_000, sale: 770_000 },
        ],
      },
      {
        name: "패키지 C (팔 + 다리 전체)",
        sessions: [
          { label: "5회", original: 650_000, sale: 420_000 },
          { label: "10회", original: 1_100_000, sale: 700_000 },
        ],
      },
      {
        name: "패키지 D (겨드랑이 + 팔 + 다리 전체)",
        sessions: [
          { label: "5회", original: 780_000, sale: 490_000 },
          { label: "10회", original: 1_300_000, sale: 820_000 },
        ],
      },
      {
        name: "전신 패키지 (얼굴 제외)",
        description: "겨드랑이·팔·상하체·브라질리언 포함",
        sessions: [
          { label: "5회", original: 1_500_000, sale: 950_000 },
          { label: "10회", original: 2_500_000, sale: 1_580_000 },
        ],
      },
    ],
  },
  {
    category: "상체 제모",
    items: [
      {
        name: "겨드랑이",
        sessions: [
          { label: "5회", original: 100_000, sale: 60_000 },
          { label: "10회", original: 170_000, sale: 100_000 },
        ],
      },
      {
        name: "팔 상완",
        sessions: [
          { label: "5회", original: 180_000, sale: 120_000 },
          { label: "10회", original: 300_000, sale: 200_000 },
        ],
      },
      {
        name: "팔 하완",
        sessions: [
          { label: "5회", original: 180_000, sale: 120_000 },
          { label: "10회", original: 300_000, sale: 200_000 },
        ],
      },
      {
        name: "팔 전체 (상완 + 하완)",
        sessions: [
          { label: "5회", original: 300_000, sale: 200_000 },
          { label: "10회", original: 510_000, sale: 330_000 },
        ],
      },
      {
        name: "손등 + 손가락",
        sessions: [
          { label: "5회", original: 100_000, sale: 70_000 },
          { label: "10회", original: 170_000, sale: 110_000 },
        ],
      },
    ],
  },
  {
    category: "하체 제모",
    items: [
      {
        name: "종아리 + 무릎",
        sessions: [
          { label: "5회", original: 200_000, sale: 130_000 },
          { label: "10회", original: 340_000, sale: 220_000 },
        ],
      },
      {
        name: "허벅지 + 무릎",
        sessions: [
          { label: "5회", original: 250_000, sale: 170_000 },
          { label: "10회", original: 430_000, sale: 280_000 },
        ],
      },
      {
        name: "다리 전체",
        sessions: [
          { label: "5회", original: 400_000, sale: 260_000 },
          { label: "10회", original: 680_000, sale: 440_000 },
        ],
      },
      {
        name: "발등 + 발가락",
        sessions: [
          { label: "5회", original: 100_000, sale: 70_000 },
          { label: "10회", original: 170_000, sale: 110_000 },
        ],
      },
    ],
  },
  {
    category: "얼굴 제모",
    items: [
      {
        name: "얼굴 잔털 (전체)",
        description: "이마·볼·턱·윗입술 등 얼굴 전체 잔털",
        sessions: [
          { label: "5회", original: 300_000, sale: 200_000 },
          { label: "10회", original: 500_000, sale: 330_000 },
        ],
      },
      {
        name: "이마",
        sessions: [
          { label: "5회", original: 150_000, sale: 100_000 },
          { label: "10회", original: 250_000, sale: 170_000 },
        ],
      },
      {
        name: "윗입술 (인중)",
        sessions: [
          { label: "5회", original: 100_000, sale: 70_000 },
          { label: "10회", original: 170_000, sale: 110_000 },
        ],
      },
    ],
  },
  {
    category: "크라이오 추가관리",
    items: [
      {
        name: "크라이오 냉각 케어",
        description: "피부 민감 부위 병행 냉각 집중 케어",
        sessions: [
          { label: "5회", original: 120_000, sale: 80_000 },
          { label: "10회", original: 200_000, sale: 130_000 },
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────
   1회 정상가표 (부위별)
───────────────────────────────────────── */
export interface RegularPriceItem {
  name: string;
  description?: string;
  gender: "male" | "female" | "both";
  price: number; // 1회 정상가
}

export interface RegularPriceSection {
  category: string;
  items: RegularPriceItem[];
}

export const REGULAR_PRICING: RegularPriceSection[] = [
  {
    category: "얼굴 제모",
    items: [
      { name: "남성 수염 제모 (전체)", gender: "male", price: 120_000 },
      { name: "인중 + 앞턱", gender: "male", price: 50_000 },
      { name: "이마", gender: "both", price: 45_000 },
      { name: "얼굴 잔털 전체", gender: "female", price: 70_000 },
      { name: "윗입술 (인중)", gender: "female", price: 25_000 },
      { name: "크라이오 추가관리", gender: "both", price: 35_000 },
    ],
  },
  {
    category: "상체 제모",
    items: [
      { name: "겨드랑이", gender: "male", price: 35_000 },
      { name: "겨드랑이", gender: "female", price: 25_000 },
      { name: "팔 상완", gender: "both", price: 50_000 },
      { name: "팔 하완", gender: "both", price: 50_000 },
      { name: "팔 전체", gender: "both", price: 85_000 },
      { name: "손등 + 손가락", gender: "both", price: 25_000 },
      { name: "가슴", gender: "male", price: 65_000 },
      { name: "복부", gender: "male", price: 55_000 },
      { name: "등", gender: "male", price: 75_000 },
      { name: "유륜", gender: "male", price: 25_000 },
    ],
  },
  {
    category: "하체 제모",
    items: [
      { name: "종아리 + 무릎", gender: "both", price: 55_000 },
      { name: "허벅지 + 무릎", gender: "both", price: 65_000 },
      { name: "다리 전체", gender: "male", price: 110_000 },
      { name: "다리 전체", gender: "female", price: 90_000 },
      { name: "발등 + 발가락", gender: "both", price: 25_000 },
    ],
  },
  {
    category: "특수 부위",
    items: [
      { name: "남성 브라질리언 + 항문", gender: "male", price: 110_000 },
      { name: "항문", gender: "male", price: 50_000 },
      { name: "배럿 나루", gender: "male", price: 35_000 },
      { name: "엉덩이", gender: "male", price: 60_000 },
      { name: "여성 브라질리언", gender: "female", price: 85_000 },
      { name: "브라질리언 + 항문", gender: "female", price: 110_000 },
      { name: "항문", gender: "female", price: 35_000 },
      { name: "엉덩이", gender: "female", price: 50_000 },
    ],
  },
];

/* ─── 숫자 → 원화 포맷 ─── */
export function formatKRW(value: number): string {
  return value.toLocaleString("ko-KR") + "원";
}
