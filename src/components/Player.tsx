"use client";

import Image from "next/image";
import { useEffect, useMemo, useReducer, useState } from "react";
import type { Day } from "@/data/content";
import { beep, speak, stopSpeech } from "@/lib/cues";
import { bandTone, buildSession, fmt, totalSec, type Step } from "@/lib/session";

type State = { i: number; endAt: number; left: number; paused: boolean; done: boolean; now: number };
type Action =
  | { type: "tick" | "next" | "prev" | "toggle"; now: number }
  | { type: "add"; now: number; ms: number };

function reducer(steps: Step[]) {
  const go = (s: State, i: number, now: number): State => {
    if (i >= steps.length) return { ...s, done: true, now };
    const j = Math.max(0, i);
    const ms = steps[j].sec * 1000;
    return { ...s, i: j, endAt: now + ms, left: ms, paused: false, now };
  };

  return (s: State, a: Action): State => {
    switch (a.type) {
      case "tick":
        if (s.paused || s.done) return s;
        return a.now >= s.endAt ? go(s, s.i + 1, a.now) : { ...s, now: a.now };
      case "next":
        return go(s, s.i + 1, a.now);
      case "prev":
        return go(s, s.i - 1, a.now);
      case "toggle":
        return s.paused
          ? { ...s, paused: false, endAt: a.now + s.left, now: a.now }
          : { ...s, paused: true, left: Math.max(0, s.endAt - a.now), now: a.now };
      case "add":
        return s.paused ? { ...s, left: s.left + a.ms } : { ...s, endAt: s.endAt + a.ms, now: a.now };
    }
  };
}

const nextWork = (steps: Step[], from: number) => steps.slice(from + 1).find((s) => s.kind === "work");

export function ExImage({ img, alt, small }: { img?: string; alt: string; small?: boolean }) {
  const cls = `p-img ${small ? "p-img-sm" : ""}`;
  if (!img) return <div className={`${cls} p-img-empty`}>Không có hình</div>;
  return (
    <Image className={cls} src={`/ex/${img}.gif`} alt={alt} width={360} height={270} unoptimized loading={small ? "lazy" : "eager"} />
  );
}

function Gear({ gear }: { gear?: string }) {
  if (!gear) return null;
  return <div className={`p-gear tone-${bandTone(gear) ?? "none"}`}>{gear}</div>;
}

export function Player({ day, startedAt, onExit }: { day: Day; startedAt: number; onExit: () => void }) {
  const steps = useMemo(() => buildSession(day), [day]);
  const [s, dispatch] = useReducer(reducer(steps), {
    i: 0,
    endAt: startedAt + steps[0].sec * 1000,
    left: steps[0].sec * 1000,
    paused: false,
    done: false,
    now: startedAt,
  });
  const [sound, setSound] = useState(true);
  const [confirmExit, setConfirmExit] = useState(false);

  const step = steps[s.i];
  const remainMs = s.paused ? s.left : Math.max(0, s.endAt - s.now);
  const secLeft = Math.ceil(remainMs / 1000);
  const upcoming = nextWork(steps, s.i);
  const after = steps[s.i + 1];
  const show = step.kind === "work" ? step : upcoming; // màn nghỉ hiển thị bài sắp tới
  const secondHalf = step.perSide && secLeft <= Math.ceil(step.sec / 2);

  const allSec = totalSec(steps);
  const doneSec = steps.slice(0, s.i).reduce((t, x) => t + x.sec, 0) + step.sec - remainMs / 1000;

  // đồng hồ: tính theo mốc thời gian nên không bị lệch khi máy chậm
  useEffect(() => {
    if (s.done) return;
    const id = setInterval(() => dispatch({ type: "tick", now: Date.now() }), 200);
    return () => clearInterval(id);
  }, [s.done]);

  // giữ màn hình luôn sáng trong lúc tập
  useEffect(() => {
    let lock: WakeLockSentinel | null = null;
    const request = () => {
      if (document.visibilityState !== "visible" || !navigator.wakeLock) return;
      navigator.wakeLock
        .request("screen")
        .then((l) => (lock = l))
        .catch(() => {});
    };
    request();
    document.addEventListener("visibilitychange", request);
    return () => {
      document.removeEventListener("visibilitychange", request);
      void lock?.release();
      stopSpeech();
    };
  }, []);

  // báo khi sang bước mới
  useEffect(() => {
    if (!sound || s.done) return;
    if (step.kind === "work") {
      beep(1320, 350);
      speak(`${step.title}. ${step.target ?? ""}${step.perSide ? ". Bên thứ nhất" : ""}`);
    } else if (upcoming) {
      beep(660, 300);
      const what = step.label === "Chuyển động tác" ? "" : `${step.label}, ${step.sec} giây. `;
      speak(`${what}Tiếp theo: ${upcoming.title}`);
    }
    // chỉ chạy khi đổi bước
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.i, s.done]);

  // đếm ngược 3-2-1, đổi bên, nhắc 10 giây cuối khi nghỉ
  useEffect(() => {
    if (!sound || s.paused || s.done) return;
    if (secLeft >= 1 && secLeft <= 3) beep(880, 120);
    if (step.perSide && step.sec >= 20 && secLeft === Math.ceil(step.sec / 2)) {
      beep(1100, 250);
      speak("Đổi bên");
    }
    if (step.kind === "rest" && step.sec >= 30 && secLeft === 10) speak("Còn 10 giây");
    // chỉ chạy mỗi khi số giây thay đổi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secLeft]);

  useEffect(() => {
    if (s.done && sound) speak("Hoàn thành buổi tập. Làm tốt lắm!");
  }, [s.done, sound]);

  const act = (type: "next" | "prev" | "toggle") => dispatch({ type, now: Date.now() });

  if (s.done) {
    const snack = day.menu.find((m) => m.name.startsWith("Phụ"));
    return (
      <div className="player p-done">
        <div className="p-phase">XONG BUỔI TẬP</div>
        <div className="p-title">
          {Math.max(1, Math.round((s.now - startedAt) / 60000))} phút · {day.focus}
        </div>
        {snack && (
          <p className="p-note">
            {snack.name}: {snack.foods.map((f) => `${f.name} ${f.amount}`).join(", ")}
          </p>
        )}
        <button type="button" className="p-btn p-primary p-wide" onClick={onExit}>
          Về trang chính
        </button>
      </div>
    );
  }

  const urgent = secLeft <= 3;

  return (
    <div className={`player ${step.kind === "rest" ? "is-rest" : "is-work"} ${s.paused ? "is-paused" : ""}`}>
      <div className="p-top">
        <div className="p-progress">
          <div style={{ width: `${Math.min(100, (doneSec / allSec) * 100)}%` }} />
        </div>
        <div className="p-meta">
          <span>
            {step.section} · {step.label}
          </span>
          <span>còn ~{Math.ceil((allSec - doneSec) / 60)} phút</span>
        </div>
      </div>

      <div className="p-main">
        <div className="p-visual">{show && <ExImage img={show.img} alt={show.title ?? ""} />}</div>

        <div className="p-info">
          {step.kind === "rest" ? (
            <>
              <div className="p-phase">{step.label === "Chuẩn bị" ? "CHUẨN BỊ" : "NGHỈ"}</div>
              <div className={`p-timer ${urgent ? "urgent" : ""}`}>{fmt(remainMs / 1000)}</div>
              {upcoming && (
                <div className="p-next">
                  <div className="p-next-label">Tiếp theo · {upcoming.label}</div>
                  <div className="p-title">{upcoming.title}</div>
                  <div className="p-target">{upcoming.target}</div>
                  <Gear gear={upcoming.gear} />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="p-title">{step.title}</div>
              <div className="p-target">
                {step.target}
                {step.perSide && <span className="p-side">{secondHalf ? "BÊN 2" : "BÊN 1"}</span>}
              </div>
              <div className={`p-timer ${urgent ? "urgent" : ""}`}>{fmt(remainMs / 1000)}</div>
              <Gear gear={step.gear} />
              {step.note && <p className="p-note">{step.note}</p>}
              {upcoming && (
                <div className="p-after">
                  Sau đó: {after?.kind === "rest" && `nghỉ ${after.sec}s → `}
                  <strong>{upcoming.title === step.title ? upcoming.label : upcoming.title}</strong>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="p-controls">
        <button type="button" className="p-btn" onClick={() => act("prev")} disabled={s.i === 0} aria-label="Bước trước">
          ◀
        </button>
        <button type="button" className="p-btn" onClick={() => dispatch({ type: "add", now: Date.now(), ms: 15000 })}>
          +15s
        </button>
        <button type="button" className="p-btn p-wide" onClick={() => act("toggle")}>
          {s.paused ? "▶ Tiếp tục" : "❚❚ Dừng"}
        </button>
        <button type="button" className="p-btn p-primary p-wide" onClick={() => act("next")}>
          {step.kind === "work" ? "Xong ▶" : "Bỏ nghỉ ▶"}
        </button>
      </div>

      <div className="p-bottom">
        <button type="button" className="p-link" onClick={() => setSound((v) => !v)}>
          {sound ? "Âm thanh: bật" : "Âm thanh: tắt"}
        </button>
        {confirmExit ? (
          <span>
            Dừng buổi tập?{" "}
            <button type="button" className="p-link danger" onClick={onExit}>
              Thoát
            </button>{" "}
            <button type="button" className="p-link" onClick={() => setConfirmExit(false)}>
              Không
            </button>
          </span>
        ) : (
          <button type="button" className="p-link" onClick={() => setConfirmExit(true)}>
            ✕ Kết thúc
          </button>
        )}
      </div>
    </div>
  );
}
