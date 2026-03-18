import { NextRequest, NextResponse } from 'next/server';
import { upsertPushSubscription, deletePushSubscription } from '@/lib/db';

// ─── POST /api/push ────────────────────────────────────────────────
// 웹 푸시 구독 등록 또는 갱신
// Body: { endpoint, keys: { p256dh, auth } }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, keys } = body;

    if (!endpoint || typeof endpoint !== 'string') {
      return NextResponse.json(
        { success: false, error: 'endpoint가 필요합니다.' },
        { status: 400 }
      );
    }

    if (!keys || typeof keys.p256dh !== 'string' || typeof keys.auth !== 'string') {
      return NextResponse.json(
        { success: false, error: 'keys.p256dh 및 keys.auth가 필요합니다.' },
        { status: 400 }
      );
    }

    // URL 형식 기본 검증
    try {
      new URL(endpoint);
    } catch {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 endpoint URL입니다.' },
        { status: 400 }
      );
    }

    const subscription = upsertPushSubscription(endpoint, keys.p256dh, keys.auth);

    return NextResponse.json(
      {
        success: true,
        message: '푸시 알림 구독이 등록되었습니다.',
        id: subscription.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/push]', error);
    return NextResponse.json(
      { success: false, error: '구독 등록 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// ─── DELETE /api/push ──────────────────────────────────────────────
// 웹 푸시 구독 해제
// Body: { endpoint }
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint } = body;

    if (!endpoint || typeof endpoint !== 'string') {
      return NextResponse.json(
        { success: false, error: 'endpoint가 필요합니다.' },
        { status: 400 }
      );
    }

    const deleted = deletePushSubscription(endpoint);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: '해당 구독을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '푸시 알림 구독이 해제되었습니다.',
    });
  } catch (error) {
    console.error('[DELETE /api/push]', error);
    return NextResponse.json(
      { success: false, error: '구독 해제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// ─── GET /api/push/vapid-public-key ───────────────────────────────
// 클라이언트가 구독 시 필요한 VAPID 공개키 반환
export async function GET() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  if (!publicKey) {
    return NextResponse.json(
      { success: false, error: 'VAPID 공개키가 설정되지 않았습니다.' },
      { status: 503 }
    );
  }

  return NextResponse.json({
    success: true,
    publicKey,
  });
}
