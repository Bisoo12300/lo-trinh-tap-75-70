"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/data/content";

type LogEntry = { date: string; kg: number };

const KEY = "fit-roadmap-weight-log-v1";

export function WeightTracker() {
  const [kg, setKg] = useState(PROFILE.startKg);
  const [log, setLog] = useState<LogEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const list: LogEntry[] = raw ? JSON.parse(raw) : [];
      setLog(list);
      if (list.length) setKg(list[list.length - 1].kg);
    } catch {
      /* ignore */
    }
  }, []);

  const current = log.length ? log[log.length - 1].kg : PROFILE.startKg;
  const progress = Math.min(
    1,
    Math.max(0, (PROFILE.startKg - current) / (PROFILE.startKg - PROFILE.goalKg)),
  );
  const left = Math.max(0, current - PROFILE.goalKg);
  const label =
    current <= PROFILE.goalKg
      ? "Đã chạm / dưới mục tiêu — chuyển duy trì"
      : `Còn ${left.toFixed(1)} kg`;

  function persist(next: LogEntry[]) {
    localStorage.setItem(KEY, JSON.stringify(next));
    setLog(next);
  }

  function save() {
    if (!Number.isFinite(kg) || kg < 40 || kg > 150) {
      alert("Nhập cân hợp lệ (kg).");
      return;
    }
    persist([...log, { date: new Date().toLocaleDateString("vi-VN"), kg }]);
  }

  function reset() {
    if (confirm("Xóa toàn bộ nhật ký cân?")) {
      localStorage.removeItem(KEY);
      setLog([]);
      setKg(PROFILE.startKg);
    }
  }

  return (
    <section id="tien-do" className="border-t border-[var(--line)] py-12">
      <div className="wrap">
        <div className="section-head reveal mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="display m-0 text-[clamp(1.8rem,4vw,2.6rem)]">Theo dõi tiến độ</h2>
          <p className="m-0 max-w-[42ch] text-[var(--muted)]">
            Lưu cục bộ trên trình duyệt của bạn — không gửi đi đâu cả.
          </p>
        </div>
        <div className="card reveal">
          <label htmlFor="weight" className="font-semibold">
            Cân tuần này (kg)
          </label>
          <div className="mt-2 flex flex-wrap gap-2.5">
            <input
              id="weight"
              type="number"
              min={50}
              max={120}
              step={0.1}
              value={kg}
              onChange={(e) => setKg(parseFloat(e.target.value))}
              className="min-w-[140px] flex-1 rounded-[10px] border border-[var(--line)] bg-[var(--bg-2)] px-3.5 py-2.5 text-[var(--text)]"
            />
            <button type="button" className="btn btn-primary" onClick={save}>
              Lưu tuần này
            </button>
            <button type="button" className="btn btn-ghost" onClick={reset}>
              Xóa nhật ký
            </button>
          </div>
          <div className="mt-5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg-2)] p-4">
            <div className="mb-2 flex justify-between gap-4 text-sm text-[var(--muted)]">
              <span>
                {PROFILE.startKg}kg → {PROFILE.goalKg}kg
              </span>
              <span>{label}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#2a3340]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--ok)]"
                style={{ width: `${(progress * 100).toFixed(1)}%` }}
              />
            </div>
          </div>
          <ul className="mt-4 list-disc pl-[1.1rem] text-[var(--muted)]">
            {log.length ? (
              [...log].reverse().map((r, i) => (
                <li key={`${r.date}-${r.kg}-${i}`}>
                  {r.date}: <strong className="text-[var(--text)]">{r.kg} kg</strong>
                </li>
              ))
            ) : (
              <li>Chưa có dữ liệu — lưu cân tuần đầu tiên.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
