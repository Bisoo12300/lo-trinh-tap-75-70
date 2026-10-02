"use client";

import { useState } from "react";
import { WEEK_CUT, WEEK_MAINTAIN, type DayPlan } from "@/data/content";

function WeekGrid({ days }: { days: DayPlan[] }) {
  return (
    <div className="grid gap-3 lg:grid-cols-7">
      {days.map((day) => (
        <div
          key={day.dow + day.focus}
          className={`min-h-[140px] rounded-xl border border-[var(--line)] p-3.5 transition hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_50%,var(--line))] ${
            day.rest ? "bg-transparent opacity-75" : "bg-[var(--bg-2)]"
          }`}
        >
          <div className="display text-lg font-bold">{day.dow}</div>
          <div className="mb-2 mt-1 text-xs font-bold text-[var(--accent)]">{day.focus}</div>
          <ul className="m-0 list-disc pl-4 text-xs text-[var(--muted)]">
            {day.items.map((item) => (
              <li key={item} className="my-0.5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function PhaseAndSchedule() {
  const [phase, setPhase] = useState<"cut" | "maintain">("cut");
  const maintain = phase === "maintain";

  return (
    <>
      <section id="giai-doan" className="border-t border-[var(--line)] py-12">
        <div className="wrap">
          <div className="section-head reveal mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display m-0 text-[clamp(1.8rem,4vw,2.6rem)]">Hai giai đoạn rõ ràng</h2>
            <p className="m-0 max-w-[42ch] text-[var(--muted)]">
              Giảm trước, giữ sau. Không nhảy lịch duy trì khi còn cách mục tiêu &gt;1kg.
            </p>
          </div>

          <div className="reveal mb-4 flex gap-2" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={!maintain}
              onClick={() => setPhase("cut")}
              className={`flex-1 rounded-xl border p-3.5 text-left font-bold ${
                !maintain
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                  : "border-[var(--line)] bg-[var(--bg-2)] text-[var(--muted)]"
              }`}
            >
              Giai đoạn 1 · Giảm cân
              <small className="mt-1 block font-medium opacity-80">Tuần 1–12 · mục tiêu 70kg</small>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={maintain}
              onClick={() => setPhase("maintain")}
              className={`flex-1 rounded-xl border p-3.5 text-left font-bold ${
                maintain
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                  : "border-[var(--line)] bg-[var(--bg-2)] text-[var(--muted)]"
              }`}
            >
              Giai đoạn 2 · Duy trì
              <small className="mt-1 block font-medium opacity-80">Sau khi ổn định 70±1kg</small>
            </button>
          </div>

          {!maintain ? (
            <div className="grid gap-4 md:grid-cols-2">
              <article className="card reveal">
                <h3 className="display mb-2 text-[1.35rem]">Mục tiêu tập</h3>
                <ul className="mt-2 pl-[1.1rem]">
                  <li className="my-1">
                    <strong>5–6 buổi/tuần</strong>, mỗi buổi 35–50 phút
                  </li>
                  <li className="my-1">3 buổi sức mạnh + 2 buổi dây nhảy + 1 buổi toàn thân mạch</li>
                  <li className="my-1">Ưu tiên compound: squat, row, press, pull-up, hinge</li>
                  <li className="my-1">Nghỉ giữa set 60–90 giây (sức mạnh), 20–40 giây (mạch)</li>
                </ul>
              </article>
              <article className="card reveal">
                <h3 className="display mb-2 text-[1.35rem]">Mục tiêu calo / cân</h3>
                <ul className="mt-2 pl-[1.1rem]">
                  <li className="my-1">Cân 1 lần/tuần (cùng điều kiện), trung bình 2–4 tuần</li>
                  <li className="my-1">
                    Thâm hụt khoảng <strong>300–500 kcal/ngày</strong>
                  </li>
                  <li className="my-1">Protein ~1.6–2.0g/kg cân mục tiêu (~110–140g)</li>
                  <li className="my-1">Ngủ 7–8h; đi bộ thêm 6–8k bước nếu ngồi nhiều</li>
                </ul>
                <div className="callout">
                  <strong>Dấu hiệu ổn:</strong> giảm ~0.3–0.6kg/tuần, vẫn tập được, không chóng mặt kéo dài.
                  Giảm quá nhanh → tăng cơm/khoai hoặc bớt 1 buổi HIIT.
                </div>
              </article>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <article className="card reveal">
                <h3 className="display mb-2 text-[1.35rem]">Đổi lịch như thế nào</h3>
                <ul className="mt-2 pl-[1.1rem]">
                  <li className="my-1">
                    Giữ <strong>4–5 buổi/tuần</strong> (bớt 1 buổi HIIT)
                  </li>
                  <li className="my-1">Tăng dần kháng lực / số set sức mạnh</li>
                  <li className="my-1">Dây nhảy còn 1–2 buổi kỹ thuật + thể lực nhẹ</li>
                  <li className="my-1">Cứ 8–12 tuần đổi variation (grip, tempo, band)</li>
                </ul>
              </article>
              <article className="card reveal">
                <h3 className="display mb-2 text-[1.35rem]">Giữ cân 70kg</h3>
                <ul className="mt-2 pl-[1.1rem]">
                  <li className="my-1">Ăn lại ngang TDEE (thêm ~300–500 kcal so với giai đoạn cắt)</li>
                  <li className="my-1">Cân dao động ±1kg là bình thường (nước, muối, chu kỳ)</li>
                  <li className="my-1">Nếu lên &gt;71.5kg 2 tuần liên tiếp → siết lại 2–3 tuần nhẹ</li>
                  <li className="my-1">Ưu tiên giữ cơ: đừng cắt protein</li>
                </ul>
              </article>
            </div>
          )}
        </div>
      </section>

      <section id="lich" className="border-t border-[var(--line)] py-12">
        <div className="wrap">
          <div className="section-head reveal mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display m-0 text-[clamp(1.8rem,4vw,2.6rem)]">Lịch mẫu 1 tuần</h2>
            <p className="m-0 max-w-[42ch] text-[var(--muted)]">
              {maintain
                ? "Giai đoạn duy trì — ít HIIT hơn, sức mạnh ưu tiên."
                : "Giai đoạn giảm cân. Bấm tab ở trên để xem lịch duy trì."}
            </p>
          </div>
          <div className="reveal">
            <WeekGrid days={maintain ? WEEK_MAINTAIN : WEEK_CUT} />
          </div>
          <div className="reveal mt-4 flex flex-wrap gap-2">
            <span className="chip">
              <strong>Khởi động:</strong> 5 phút nhảy nhẹ / xoay khớp
            </span>
            <span className="chip">
              <strong>Kết thúc:</strong> 3–5 phút giãn
            </span>
            <span className="chip">
              <strong>Tiến bộ:</strong> +2 rep hoặc lên dây nặng hơn khi làm đủ set dễ
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
