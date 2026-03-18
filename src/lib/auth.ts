import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'moless-clinic-jwt-secret-2026-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const BCRYPT_ROUNDS = 12;

// ─── 비밀번호 해싱 ─────────────────────────────────────────────────

/**
 * 비밀번호를 bcrypt로 해싱합니다.
 * DB 초기화 시 동기 방식으로 호출되므로 동기 버전 사용.
 */
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, BCRYPT_ROUNDS);
}

/**
 * 비밀번호와 해시를 비교합니다. (비동기)
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── JWT ──────────────────────────────────────────────────────────

export interface TokenPayload {
  username: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

/**
 * 관리자 JWT 토큰을 생성합니다.
 */
export function generateToken(username: string): string {
  const payload: Omit<TokenPayload, 'iat' | 'exp'> = {
    username,
    role: 'admin',
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

/**
 * JWT 토큰을 검증하고 페이로드를 반환합니다.
 * 유효하지 않으면 null을 반환합니다.
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

// ─── 요청에서 토큰 추출 ────────────────────────────────────────────

/**
 * Authorization 헤더 또는 쿠키에서 토큰을 추출합니다.
 * 헤더 형식: "Bearer <token>"
 */
export function extractToken(request: Request): string | null {
  // Authorization 헤더 우선
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  // 쿠키 폴백
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const match = cookieHeader.match(/admin_token=([^;]+)/);
    if (match) return match[1];
  }

  return null;
}

/**
 * 요청에서 토큰을 추출하고 검증합니다.
 * 유효한 페이로드 또는 null을 반환합니다.
 */
export function authenticateRequest(request: Request): TokenPayload | null {
  const token = extractToken(request);
  if (!token) return null;
  return verifyToken(token);
}
