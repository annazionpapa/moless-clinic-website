import { NextRequest, NextResponse } from 'next/server';
import { getAdminByUsername } from '@/lib/db';
import { comparePassword, generateToken } from '@/lib/auth';

// ─── POST /api/auth ────────────────────────────────────────────────
// 관리자 로그인 → JWT 토큰 반환
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 입력 검증
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '아이디를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length === 0) {
      return NextResponse.json(
        { success: false, error: '비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // DB에서 관리자 조회
    const admin = getAdminByUsername(username.trim());

    // 타이밍 공격 방지: 계정이 없어도 해싱 비교를 수행
    const dummyHash = '$2a$12$invalidhashfortimingatackprevention0000000000000';
    const passwordHash = admin?.password_hash ?? dummyHash;
    const isValid = await comparePassword(password, passwordHash);

    if (!admin || !isValid) {
      return NextResponse.json(
        { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // JWT 토큰 생성
    const token = generateToken(admin.username);

    // 응답: 토큰을 JSON과 HttpOnly 쿠키 모두에 포함
    const response = NextResponse.json(
      {
        success: true,
        token,
        username: admin.username,
      },
      { status: 200 }
    );

    // HttpOnly 쿠키 설정 (브라우저 기반 관리 페이지용)
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24시간
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[POST /api/auth]', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// ─── DELETE /api/auth ──────────────────────────────────────────────
// 로그아웃: 쿠키 삭제
export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: '로그아웃되었습니다.' },
    { status: 200 }
  );

  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return response;
}
