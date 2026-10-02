"use client";

import { useState, useSyncExternalStore } from "react";
import { WEEK, type Move, type Muscle } from "@/data/content";

// getDay(): 0 = CN, 1 = T2 ... 6 = T7 → index trong WEEK (T2 = 0 ... CN = 6)
const todayIndex = () => (new Date().getDay() + 6) % 7;
const noopSubscribe = () => () => {};

const WEEKLY_SETS = (() => {
  const total = new Map<Muscle, number>();
  for (const day of WEEK) {
    for (const ex of day.workout) {
      if (ex.muscle === "Cardio") continue;
      total.set(ex.muscle, (total.get(ex.muscle) ?? 0) + ex.sets);
    }
  }
  return [...total];
})();

function MoveList({ title, moves }: { title: string; moves: Move[] }) {
  if (moves.length === 0) return null;
  return (
    <section>
      <h2 className="h2">{title}</h2>
      <ol className="list">
        {moves.map((m) => (
          <li key={m.name}>
            <span>
              {m.name}
              {m.note && <span className="muted"> · {m.note}</span>}
            </span>
            <span className="dose">{m.dose}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function DayPlan() {
  const today = useSyncExternalStore(noopSubscribe, todayIndex, () => 0);
  const [picked, setPicked] = useState<number | null>(null);
  const active = picked ?? today;
  const day = WEEK[active];

  const totals = day.menu
    .flatMap((meal) => meal.foods)
    .reduce((acc, f) => ({ kcal: acc.kcal + f.kcal, protein: acc.protein + f.protein }), {
      kcal: 0,
      protein: 0,
    });

  return (
    <>
      <nav className="tabs" aria-label="Chọn ngày">
        {WEEK.map((d, i) => (
          <button
            key={d.dow}
            type="button"
            aria-pressed={i === active}
            onClick={() => setPicked(i)}
            className="tab"
          >
            {d.dow}
            {i === today && <span className="dot" aria-label="hôm nay" />}
          </button>
        ))}
      </nav>

      <p className="focus">{day.focus}</p>

      <MoveList title="1. Khởi động" moves={day.warmup} />

      <section>
        <h2 className="h2">{day.warmup.length ? "2. Bài tập" : "Vận động nhẹ"}</h2>
        <ol className="exercises">
          {day.workout.map((ex) => (
            <li key={ex.name}>
              <div className="ex-head">
                <strong>{ex.name}</strong>
                <span className="dose">
                  {ex.sets > 1 ? `${ex.sets} × ` : ""}
                  {ex.reps}
                </span>
              </div>
              <div className="muted small">
                <span className="badge">{ex.muscle}</span> {ex.gear}
                {ex.rest !== "—" && ` · nghỉ ${ex.rest}`}
              </div>
              <div className="small">
                {ex.note}{" "}
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.en)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Video ↗
                </a>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <MoveList title={day.warmup.length ? "3. Giãn cơ" : "Giãn cơ toàn thân"} moves={day.cooldown} />

      <section>
        <h2 className="h2">
          Thực đơn{" "}
          <span className="muted small">
            ~{totals.kcal.toLocaleString("vi-VN")} kcal · {totals.protein}g đạm
          </span>
        </h2>
        <div className="meals">
          {day.menu.map((meal) => (
            <div key={meal.name} className="meal">
              <h3>{meal.name}</h3>
              <ul>
                {meal.foods.map((f) => (
                  <li key={f.name + f.amount}>
                    <span>
                      {f.name} <span className="muted">{f.amount}</span>
                    </span>
                    <span className="muted small">{f.kcal} kcal</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="muted small">Thịt, cá, tôm tính theo cân sống; cơm tính theo cân chín.</p>
      </section>

      <section>
        <h2 className="h2">Số set mỗi tuần theo nhóm cơ</h2>
        <div className="chips">
          {WEEKLY_SETS.map(([m, n]) => (
            <span key={m} className="chip">
              {m} <strong>{n}</strong>
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
