import { BANDS, RULES } from "@/data/content";
import { DayPlan } from "@/components/DayPlan";

export default function Home() {
  return (
    <main className="wrap">
      <header>
        <h1>Lịch tập 75 → 70kg</h1>
        <p className="muted small">
          Dây: {Object.values(BANDS).join(" · ")} · xà · tạ 3kg · dây nhảy
        </p>
      </header>

      <DayPlan />

      <section>
        <h2 className="h2">Ghi nhớ</h2>
        <ul className="rules small">
          {RULES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <footer className="muted small credit">
        Hình minh họa:{" "}
        <a href="https://github.com/yuhonas/free-exercise-db" target="_blank" rel="noreferrer">
          free-exercise-db
        </a>{" "}
        (public domain). Một số hình dùng tạ/cáp thay dây — tư thế và hướng lực giống nhau.
      </footer>
    </main>
  );
}
