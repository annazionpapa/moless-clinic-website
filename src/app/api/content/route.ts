import { NextRequest, NextResponse } from 'next/server';
import { getContent, upsertContent } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

// ─── GET /api/content ──────────────────────────────────────────────
// 페이지/섹션별 콘텐츠 조회 (공개 API)
// 쿼리 파라미터: ?page=home&section=hero (section 생략 시 페이지 전체)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section') || undefined;

    if (!page || page.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'page 파라미터가 필요합니다.' },
        { status: 400 }
      );
    }

    const rows = getContent(page.trim(), section?.trim());

    // section이 지정된 경우 단일 객체, 아니면 배열 반환
    if (section) {
      return NextResponse.json({
        success: true,
        data: rows[0] ?? null,
      });
    }

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('[GET /api/content]', error);
    return NextResponse.json(
      { success: false, error: '콘텐츠 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// ─── PUT /api/content ──────────────────────────────────────────────
// 콘텐츠 수정 (인증 필요)
// Body: { page, section, content_type?, content_value }
export async function PUT(request: NextRequest) {
  // 인증 확인
  const payload = authenticateRequest(request);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { page, section, content_type = 'text', content_value } = body;

    // 필수 필드 검증
    if (!page || typeof page !== 'string' || page.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'page 값을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!section || typeof section !== 'string' || section.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'section 값을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (content_value === undefined || content_value === null) {
      return NextResponse.json(
        { success: false, error: 'content_value 값을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!['text', 'image'].includes(content_type)) {
      return NextResponse.json(
        { success: false, error: "content_type은 'text' 또는 'image'여야 합니다." },
        { status: 400 }
      );
    }

    const updated = upsertContent(
      page.trim(),
      section.trim(),
      content_type as 'text' | 'image',
      String(content_value)
    );

    return NextResponse.json({
      success: true,
      message: '콘텐츠가 수정되었습니다.',
      data: updated,
    });
  } catch (error) {
    console.error('[PUT /api/content]', error);
    return NextResponse.json(
      { success: false, error: '콘텐츠 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// ─── POST /api/content ─────────────────────────────────────────────
// 여러 콘텐츠 일괄 수정 (인증 필요)
// Body: { items: Array<{ page, section, content_type?, content_value }> }
export async function POST(request: NextRequest) {
  const payload = authenticateRequest(request);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'items 배열을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (items.length > 50) {
      return NextResponse.json(
        { success: false, error: '한 번에 최대 50개까지 수정할 수 있습니다.' },
        { status: 400 }
      );
    }

    const results = items.map((item) => {
      const { page, section, content_type = 'text', content_value } = item;
      if (!page || !section || content_value === undefined) {
        return { success: false, page, section, error: '필수 필드 누락' };
      }
      try {
        const updated = upsertContent(page, section, content_type, String(content_value));
        return { success: true, data: updated };
      } catch (err) {
        return { success: false, page, section, error: String(err) };
      }
    });

    const failedCount = results.filter((r) => !r.success).length;

    return NextResponse.json({
      success: failedCount === 0,
      message: `${results.length - failedCount}/${results.length}개 수정 완료`,
      results,
    });
  } catch (error) {
    console.error('[POST /api/content]', error);
    return NextResponse.json(
      { success: false, error: '일괄 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
