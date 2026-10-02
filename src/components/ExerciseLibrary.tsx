"use client";

import Image from "next/image";
import { useState } from "react";
import { EXERCISES, FILTERS } from "@/data/content";

export function ExerciseLibrary() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const list = EXERCISES.filter((ex) => filter === "all" || ex.cat === filter);

  return (
    <section id="bai-tap" className="border-t border-[var(--line)] py-12">
      <div className="wrap">
        <div className="section-head reveal mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="display m-0 text-[clamp(1.8rem,4vw,2.6rem)]">Thư viện bài tập</h2>
          <p className="m-0 max-w-[42ch] text-[var(--muted)]">
            Ảnh minh họa (thumbnail) + link video hướng dẫn. Bấm để mở YouTube.
          </p>
        </div>

        <div className="reveal mb-4 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold ${
                filter === f.id
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                  : "border-[var(--line)] bg-[var(--bg-2)] text-[var(--muted)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {list.map((ex) => {
            const href = `https://www.youtube.com/watch?v=${ex.youtubeId}`;
            return (
              <article
                key={ex.id}
                className="reveal grid overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] md:grid-cols-[280px_1fr]"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block min-h-[180px] bg-[#0b0e12] no-underline"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${ex.youtubeId}/hqdefault.jpg`}
                    alt={ex.title}
                    fill
                    className="object-cover opacity-85 transition hover:opacity-100"
                    sizes="(max-width: 700px) 100vw, 280px"
                  />
                  <span className="pointer-events-none absolute inset-0 grid place-items-center">
                    <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[var(--accent)] text-xl font-extrabold text-[var(--accent-ink)] shadow-lg">
                      ▶
                    </span>
                  </span>
                </a>
                <div className="p-4 md:p-5">
                  <h3 className="display m-0 mb-1 text-[1.4rem]">{ex.title}</h3>
                  <div className="my-2.5 flex flex-wrap gap-1.5">
                    {ex.pills.map((p) => (
                      <span key={p} className="pill">
                        {p}
                      </span>
                    ))}
                  </div>
                  <ol className="m-0 mt-2 list-decimal pl-[1.15rem] text-[0.92rem] text-[var(--muted)]">
                    {ex.steps.map((s) => (
                      <li key={s} className="my-1">
                        {s}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-3 mb-0">
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      Xem hướng dẫn →
                    </a>
                    {ex.extraLinks?.map((link) => (
                      <span key={link.href}>
                        {" · "}
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
