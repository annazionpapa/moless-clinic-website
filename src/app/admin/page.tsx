"use client";

import { useState, useEffect, useCallback } from "react";

/* ─── 타입 ─── */
interface Consultation {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  treatment_type: string;
  message: string | null;
  status: "pending" | "confirmed" | "completed";
  created_at: string;
}

type StatusFilter = "all" | "pending" | "confirmed" | "completed";

const STATUS_LABELS: Record<string, { text: string; color: string }> = {
  pending: { text: "대기중", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { text: "확인됨", color: "bg-blue-100 text-blue-800" },
  completed: { text: "완료", color: "bg-green-100 text-green-800" },
};

/* ─── 메인 ─── */
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  // 로그인 상태 확인
  useEffect(() => {
    fetch("/api/consultation", { credentials: "include" })
      .then((res) => {
        if (res.ok) setIsLoggedIn(true);
      })
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">확인 중...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginForm onSuccess={() => setIsLoggedIn(true)} />;
  }

  return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
}

/* ─── 로그인 폼 ─── */
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (res.ok) {
        onSuccess();
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch {
      setError("서버 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold tracking-tight">모리스의원</h1>
          <p className="text-gray-400 text-sm mt-1">관리자 로그인</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디"
            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
            autoComplete="current-password"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── 대시보드 ─── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Consultation | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.set("status", filter);
      params.set("limit", "50");

      const res = await fetch(`/api/consultation?${params}`, {
        credentials: "include",
      });

      if (res.ok) {
        const json = await res.json();
        setConsultations(json.data || []);
        setTotal(json.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch consultations:", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/consultation`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
        credentials: "include",
      });
      if (res.ok) {
        fetchData();
        if (selectedItem?.id === id) {
          setSelectedItem((prev) =>
            prev ? { ...prev, status: newStatus as Consultation["status"] } : null
          );
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE", credentials: "include" });
    onLogout();
  };

  const pendingCount = consultations.filter((c) => c.status === "pending").length;

  const enablePush = async () => {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      const res = await fetch("/api/push");
      const { publicKey } = await res.json();
      if (!publicKey) return alert("푸시 알림 키가 설정되지 않았습니다.");

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      const json = sub.toJSON();
      await fetch("/api/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: json.endpoint,
          keys: json.keys,
        }),
      });
      alert("푸시 알림이 활성화되었습니다.");
    } catch {
      alert("푸시 알림 설정에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">모리스의원 관리자</h1>
          <p className="text-xs text-gray-400">상담 접수 관리</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={enablePush}
            className="text-xs text-gray-400 hover:text-black transition-colors"
          >
            알림 설정
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-black transition-colors"
          >
            로그아웃
          </button>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="전체 접수" value={total} />
          <StatCard label="대기중" value={pendingCount} highlight={pendingCount > 0} />
          <StatCard
            label="확인됨"
            value={consultations.filter((c) => c.status === "confirmed").length}
          />
          <StatCard
            label="완료"
            value={consultations.filter((c) => c.status === "completed").length}
          />
        </div>

        {/* 필터 */}
        <div className="flex gap-2 mb-6">
          {(["all", "pending", "confirmed", "completed"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={[
                "px-4 py-2 text-xs font-medium tracking-wider transition-colors",
                filter === s
                  ? "bg-black text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-black",
              ].join(" ")}
            >
              {s === "all" ? "전체" : STATUS_LABELS[s].text}
            </button>
          ))}
          <button
            onClick={fetchData}
            className="ml-auto px-4 py-2 text-xs bg-white border border-gray-200 text-gray-600 hover:border-black transition-colors"
          >
            새로고침
          </button>
        </div>

        {/* 테이블 */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm">불러오는 중...</div>
        ) : consultations.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">접수된 상담이 없습니다.</div>
        ) : (
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs tracking-wider">번호</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs tracking-wider">이름</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs tracking-wider">전화번호</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs tracking-wider">관심 시술</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs tracking-wider">상태</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs tracking-wider">접수일</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs tracking-wider">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedItem(c)}
                    >
                      <td className="px-4 py-3 text-gray-400">{c.id}</td>
                      <td className="px-4 py-3 font-medium">{c.name}</td>
                      <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                      <td className="px-4 py-3 text-gray-600">{c.treatment_type}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${STATUS_LABELS[c.status]?.color}`}>
                          {STATUS_LABELS[c.status]?.text}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{c.created_at}</td>
                      <td className="px-4 py-3">
                        <select
                          value={c.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleStatusChange(c.id, e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs border border-gray-200 px-2 py-1 focus:outline-none focus:border-black"
                        >
                          <option value="pending">대기중</option>
                          <option value="confirmed">확인됨</option>
                          <option value="completed">완료</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 상세 모달 */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white w-full max-w-md mx-4 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">상담 상세</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-black text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs tracking-wider mb-1">이름</p>
                <p className="font-medium">{selectedItem.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs tracking-wider mb-1">전화번호</p>
                <a href={`tel:${selectedItem.phone}`} className="text-blue-600 hover:underline">
                  {selectedItem.phone}
                </a>
              </div>
              {selectedItem.email && (
                <div>
                  <p className="text-gray-400 text-xs tracking-wider mb-1">이메일</p>
                  <p>{selectedItem.email}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-xs tracking-wider mb-1">관심 시술</p>
                <p>{selectedItem.treatment_type}</p>
              </div>
              {selectedItem.message && (
                <div>
                  <p className="text-gray-400 text-xs tracking-wider mb-1">문의 내용</p>
                  <p className="whitespace-pre-wrap leading-relaxed text-gray-700 bg-gray-50 p-4">
                    {selectedItem.message}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-xs tracking-wider mb-1">접수일시</p>
                <p>{selectedItem.created_at}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs tracking-wider mb-1">상태</p>
                <select
                  value={selectedItem.status}
                  onChange={(e) => handleStatusChange(selectedItem.id, e.target.value)}
                  className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black w-full"
                >
                  <option value="pending">대기중</option>
                  <option value="confirmed">확인됨</option>
                  <option value="completed">완료</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="mt-8 w-full bg-black text-white py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── VAPID 키 변환 ─── */
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

/* ─── 통계 카드 ─── */
function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-white border px-5 py-4 ${highlight ? "border-yellow-400" : "border-gray-200"}`}>
      <p className="text-xs text-gray-400 tracking-wider mb-1">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? "text-yellow-600" : "text-black"}`}>
        {value}
      </p>
    </div>
  );
}
