import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';
import {
  insertConsultation,
  getConsultations,
  updateConsultationStatus,
  getAllPushSubscriptions,
} from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

// ─── Web Push 설정 ─────────────────────────────────────────────────
const VAPID_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY || '';
const VAPID_SUBJECT =
  process.env.VAPID_SUBJECT || 'mailto:admin@moless-clinic.com';

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

// ─── POST /api/consultation ────────────────────────────────────────
// 새 상담 접수 → DB 저장 → 웹 푸시 알림 발송
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 필수 필드 검증
    const { name, phone, email, treatment_type, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '이름을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '연락처를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 전화번호 간단 형식 검증 (숫자, -, + 허용)
    if (!/^[\d\-+\s()]{7,20}$/.test(phone.trim())) {
      return NextResponse.json(
        { success: false, error: '유효한 연락처를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증 (입력된 경우)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // DB 저장
    const consultation = insertConsultation({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || undefined,
      treatment_type: treatment_type?.trim() || '일반상담',
      message: message?.trim() || undefined,
    });

    // 웹 푸시 알림 발송 (비동기, 실패해도 응답에 영향 없음)
    sendPushNotifications(consultation).catch((err) => {
      console.error('[Push] 알림 발송 실패:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: '상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
        id: consultation.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/consultation]', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

// ─── GET /api/consultation ─────────────────────────────────────────
// 상담 목록 조회 (인증 필요)
export async function GET(request: NextRequest) {
  // 인증 확인
  const payload = authenticateRequest(request);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const offset = (page - 1) * limit;

    const { rows, total } = getConsultations({ status, limit, offset });

    return NextResponse.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[GET /api/consultation]', error);
    return NextResponse.json(
      { success: false, error: '데이터 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// ─── PATCH /api/consultation ───────────────────────────────────────
// 상담 상태 변경 (인증 필요)
export async function PATCH(request: NextRequest) {
  const payload = authenticateRequest(request);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { success: false, error: '유효한 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    if (!status || !['pending', 'confirmed', 'completed'].includes(status)) {
      return NextResponse.json(
        { success: false, error: '유효한 상태값이 필요합니다. (pending, confirmed, completed)' },
        { status: 400 }
      );
    }

    const updated = updateConsultationStatus(id, status);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: '해당 상담을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[PATCH /api/consultation]', error);
    return NextResponse.json(
      { success: false, error: '상태 변경 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// ─── 웹 푸시 알림 발송 헬퍼 ───────────────────────────────────────

interface ConsultationForPush {
  id: number;
  name: string;
  phone: string;
  treatment_type: string;
}

async function sendPushNotifications(consultation: ConsultationForPush): Promise<void> {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    console.log('[Push] VAPID 키가 설정되지 않아 푸시 알림을 건너뜁니다.');
    return;
  }

  const subscriptions = getAllPushSubscriptions();
  if (subscriptions.length === 0) return;

  const payload = JSON.stringify({
    title: '새 상담 접수',
    body: `${consultation.name}님 (${consultation.treatment_type}) - ${consultation.phone}`,
    url: '/admin',
    tag: `consultation-${consultation.id}`,
  });

  const results = await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth },
        },
        payload
      )
    )
  );

  const failed = results.filter((r) => r.status === 'rejected').length;
  if (failed > 0) {
    console.warn(`[Push] ${failed}/${subscriptions.length}개 구독에 알림 발송 실패`);
  }
}
