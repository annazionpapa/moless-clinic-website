import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { hashPassword } from './auth';

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'moless.db');

// data 디렉토리가 없으면 생성
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;

  _db = new Database(DB_PATH);

  // WAL 모드 활성화 (성능 향상)
  _db.pragma('journal_mode = WAL');
  _db.pragma('foreign_keys = ON');

  initializeSchema(_db);

  return _db;
}

function initializeSchema(db: Database.Database): void {
  // ─── consultations 테이블 ───────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS consultations (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT    NOT NULL,
      phone         TEXT    NOT NULL,
      email         TEXT,
      treatment_type TEXT   NOT NULL DEFAULT '일반상담',
      message       TEXT,
      status        TEXT    NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'confirmed', 'completed')),
      created_at    TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // ─── content 테이블 ────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS content (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      page          TEXT    NOT NULL,
      section       TEXT    NOT NULL,
      content_type  TEXT    NOT NULL DEFAULT 'text'
                            CHECK (content_type IN ('text', 'image')),
      content_value TEXT    NOT NULL DEFAULT '',
      updated_at    TEXT    NOT NULL DEFAULT (datetime('now', 'localtime')),
      UNIQUE (page, section)
    )
  `);

  // ─── admin 테이블 ──────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      username      TEXT    NOT NULL UNIQUE,
      password_hash TEXT    NOT NULL,
      created_at    TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // ─── push_subscriptions 테이블 ────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS push_subscriptions (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      endpoint   TEXT    NOT NULL UNIQUE,
      p256dh     TEXT    NOT NULL,
      auth       TEXT    NOT NULL,
      created_at TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // ─── 초기 관리자 계정 생성 ────────────────────────────────────
  const adminExists = db.prepare(
    'SELECT id FROM admin WHERE username = ?'
  ).get('admin');

  if (!adminExists) {
    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || 'moless2026!';
    const passwordHash = hashPassword(initialPassword);

    db.prepare(
      'INSERT INTO admin (username, password_hash) VALUES (?, ?)'
    ).run('admin', passwordHash);

    console.log('[DB] 초기 관리자 계정이 생성되었습니다. (username: admin)');
  }
}

// ─── 헬퍼: consultation CRUD ────────────────────────────────────────

export interface Consultation {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  treatment_type: string;
  message: string | null;
  status: 'pending' | 'confirmed' | 'completed';
  created_at: string;
}

export interface ConsultationInsert {
  name: string;
  phone: string;
  email?: string;
  treatment_type?: string;
  message?: string;
}

export function insertConsultation(data: ConsultationInsert): Consultation {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO consultations (name, phone, email, treatment_type, message)
    VALUES (@name, @phone, @email, @treatment_type, @message)
  `);

  const result = stmt.run({
    name: data.name,
    phone: data.phone,
    email: data.email ?? null,
    treatment_type: data.treatment_type ?? '일반상담',
    message: data.message ?? null,
  });

  return db.prepare(
    'SELECT * FROM consultations WHERE id = ?'
  ).get(result.lastInsertRowid) as Consultation;
}

export interface ConsultationQueryOptions {
  status?: string;
  limit?: number;
  offset?: number;
}

export function getConsultations(options: ConsultationQueryOptions = {}): {
  rows: Consultation[];
  total: number;
} {
  const db = getDb();
  const { status, limit = 20, offset = 0 } = options;

  let whereClause = '';
  const params: (string | number)[] = [];

  if (status && ['pending', 'confirmed', 'completed'].includes(status)) {
    whereClause = 'WHERE status = ?';
    params.push(status);
  }

  const total = (
    db.prepare(`SELECT COUNT(*) as cnt FROM consultations ${whereClause}`).get(...params) as {
      cnt: number;
    }
  ).cnt;

  const rows = db
    .prepare(
      `SELECT * FROM consultations ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
    )
    .all(...params, limit, offset) as Consultation[];

  return { rows, total };
}

export function updateConsultationStatus(
  id: number,
  status: 'pending' | 'confirmed' | 'completed'
): boolean {
  const db = getDb();
  const result = db
    .prepare('UPDATE consultations SET status = ? WHERE id = ?')
    .run(status, id);
  return result.changes > 0;
}

// ─── 헬퍼: content CRUD ─────────────────────────────────────────────

export interface ContentRow {
  id: number;
  page: string;
  section: string;
  content_type: 'text' | 'image';
  content_value: string;
  updated_at: string;
}

export function getContent(page: string, section?: string): ContentRow[] {
  const db = getDb();

  if (section) {
    return db
      .prepare('SELECT * FROM content WHERE page = ? AND section = ?')
      .all(page, section) as ContentRow[];
  }

  return db
    .prepare('SELECT * FROM content WHERE page = ? ORDER BY section')
    .all(page) as ContentRow[];
}

export function upsertContent(
  page: string,
  section: string,
  contentType: 'text' | 'image',
  contentValue: string
): ContentRow {
  const db = getDb();
  db.prepare(`
    INSERT INTO content (page, section, content_type, content_value, updated_at)
    VALUES (?, ?, ?, ?, datetime('now', 'localtime'))
    ON CONFLICT (page, section) DO UPDATE SET
      content_type  = excluded.content_type,
      content_value = excluded.content_value,
      updated_at    = excluded.updated_at
  `).run(page, section, contentType, contentValue);

  return db
    .prepare('SELECT * FROM content WHERE page = ? AND section = ?')
    .get(page, section) as ContentRow;
}

// ─── 헬퍼: push subscriptions CRUD ────────────────────────────────

export interface PushSubscription {
  id: number;
  endpoint: string;
  p256dh: string;
  auth: string;
  created_at: string;
}

export function getAllPushSubscriptions(): PushSubscription[] {
  const db = getDb();
  return db.prepare('SELECT * FROM push_subscriptions').all() as PushSubscription[];
}

export function upsertPushSubscription(
  endpoint: string,
  p256dh: string,
  auth: string
): PushSubscription {
  const db = getDb();
  db.prepare(`
    INSERT INTO push_subscriptions (endpoint, p256dh, auth)
    VALUES (?, ?, ?)
    ON CONFLICT (endpoint) DO UPDATE SET
      p256dh = excluded.p256dh,
      auth   = excluded.auth
  `).run(endpoint, p256dh, auth);

  return db
    .prepare('SELECT * FROM push_subscriptions WHERE endpoint = ?')
    .get(endpoint) as PushSubscription;
}

export function deletePushSubscription(endpoint: string): boolean {
  const db = getDb();
  const result = db
    .prepare('DELETE FROM push_subscriptions WHERE endpoint = ?')
    .run(endpoint);
  return result.changes > 0;
}

// ─── 헬퍼: admin ───────────────────────────────────────────────────

export interface AdminRow {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export function getAdminByUsername(username: string): AdminRow | undefined {
  const db = getDb();
  return db
    .prepare('SELECT * FROM admin WHERE username = ?')
    .get(username) as AdminRow | undefined;
}
