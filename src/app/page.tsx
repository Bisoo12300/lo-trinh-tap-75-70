import { EQUIPMENT, PROFILE } from "@/data/content";
import { ExerciseLibrary } from "@/components/ExerciseLibrary";
import { PhaseAndSchedule } from "@/components/PhaseAndSchedule";
import { RevealObserver } from "@/components/RevealObserver";
import { StickyNav } from "@/components/StickyNav";
import { WeightTracker } from "@/components/WeightTracker";

export default function Home() {
  return (
    <RevealObserver>
      <header className="pb-10 pt-14">
        <div className="wrap grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
          <div>
            <div className="kicker">Garage gym · Dây kháng lực</div>
            <h1 className="display m-0 max-w-[12ch] text-[clamp(2.6rem,8vw,4.6rem)] font-extrabold">
              {PROFILE.startKg}kg <span className="text-[var(--accent)]">→</span> {PROFILE.goalKg}
              kg rồi giữ vững
            </h1>
            <p className="lead mt-4 mb-0 max-w-[38ch] text-[1.05rem] text-[var(--muted)]">
              Lộ trình {PROFILE.weeks} tuần giảm ~0.4–0.5kg/tuần, rồi chuyển sang duy trì. Dùng đúng
              bộ dụng cụ bạn đang có — không cần phòng gym.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#lich">
                Xem lịch tuần
              </a>
              <a className="btn btn-ghost" href="#bai-tap">
                Thư viện bài tập
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="stat rounded-[var(--radius)] border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-4 backdrop-blur">
              <strong className="display block text-[1.85rem] font-bold">
                {(PROFILE.heightCm / 100).toFixed(2).replace(".", ",")} m
              </strong>
              <span className="text-sm text-[var(--muted)]">Chiều cao</span>
            </div>
            <div className="stat rounded-[var(--radius)] border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-4 backdrop-blur">
              <strong className="display block text-[1.85rem] font-bold">{PROFILE.startKg} kg</strong>
              <span className="text-sm text-[var(--muted)]">Cân hiện tại</span>
            </div>
            <div className="stat rounded-[var(--radius)] border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-4 backdrop-blur">
              <strong className="display block text-[1.85rem] font-bold">
                ~{PROFILE.bmiNow.toString().replace(".", ",")}
              </strong>
              <span className="text-sm text-[var(--muted)]">BMI hiện tại (bình thường)</span>
            </div>
            <div className="stat rounded-[var(--radius)] border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] p-4 backdrop-blur">
              <strong className="display block text-[1.85rem] font-bold">
                ~{PROFILE.bmiGoal.toString().replace(".", ",")}
              </strong>
              <span className="text-sm text-[var(--muted)]">BMI mục tiêu {PROFILE.goalKg}kg</span>
            </div>
            <div className="col-span-2 rounded-[var(--radius)] border border-[color-mix(in_srgb,var(--accent)_45%,var(--line))] bg-gradient-to-br from-[rgba(200,245,66,0.18)] to-[rgba(200,245,66,0.04)] p-4">
              <strong className="display block text-[1.85rem] font-bold">
                −5 kg · ~{PROFILE.weeks} tuần
              </strong>
              <span className="text-sm text-[var(--muted)]">
                Thâm hụt nhẹ + tập 5–6 buổi/tuần · sức khỏe ổn định
              </span>
            </div>
          </div>
        </div>
      </header>

      <StickyNav />

      <main>
        <section id="dung-cu" className="border-t border-[var(--line)] py-12">
          <div className="wrap">
            <div className="section-head reveal mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display m-0 text-[clamp(1.8rem,4vw,2.6rem)]">Bộ dụng cụ của bạn</h2>
              <p className="m-0 max-w-[42ch] text-[var(--muted)]">
                Mỗi món gắn với nhóm động tác chính — tận dụng hết trước khi mua thêm.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {EQUIPMENT.map((item) => (
                <article key={item.title} className="card reveal">
                  <div className="tag">{item.tag}</div>
                  <h3 className="display mb-1 text-[1.35rem]">{item.title}</h3>
                  <p className="my-1.5 text-[0.95rem] text-[var(--muted)]">{item.desc}</p>
                  <ul className="mt-2.5 pl-[1.1rem]">
                    {item.bullets.map((b) => (
                      <li key={b} className="my-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PhaseAndSchedule />
        <ExerciseLibrary />

        <section id="an-uong" className="border-t border-[var(--line)] py-12">
          <div className="wrap">
            <div className="section-head reveal mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display m-0 text-[clamp(1.8rem,4vw,2.6rem)]">
                Ăn uống gọn — đủ để giảm
              </h2>
              <p className="m-0 max-w-[42ch] text-[var(--muted)]">
                Không cần thực đơn phức tạp. Giữ thâm hụt nhẹ và protein ổn định.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="card reveal">
                <div className="tag">Ước lượng</div>
                <h3 className="display mb-1 text-[1.35rem]">~2.000–2.300 kcal</h3>
                <p className="text-[0.95rem] text-[var(--muted)]">
                  Điểm xuất phát cho ~175cm/75kg, tập 5–6 buổi, văn phòng. Chỉnh theo cân tuần.
                </p>
              </article>
              <article className="card reveal">
                <div className="tag">Đĩa ăn</div>
                <h3 className="display mb-1 text-[1.35rem]">Protein · rau · tinh bột</h3>
                <p className="text-[0.95rem] text-[var(--muted)]">
                  Mỗi bữa chính: 1 lòng bàn tay protein + rau đầy đĩa + 1 nắm cơm/khoai. Ăn no hơn
                  ngày tập nặng.
                </p>
              </article>
              <article className="card reveal">
                <div className="tag">Nước</div>
                <h3 className="display mb-1 text-[1.35rem]">2.5–3.5 lít/ngày</h3>
                <p className="text-[0.95rem] text-[var(--muted)]">
                  Hạn chế nước ngọt. Rượu làm chậm giảm cân — giữ tối thiểu giai đoạn cắt.
                </p>
              </article>
            </div>
            <div className="callout reveal">
              <strong>Không phải bác sĩ / HLV cá nhân.</strong> Nếu đau khớp, chóng mặt, hoặc bệnh
              nền — hỏi chuyên gia trước khi tăng cường độ.
            </div>
          </div>
        </section>

        <WeightTracker />
      </main>

      <footer className="border-t border-[var(--line)] py-8 text-sm text-[var(--muted)]">
        <div className="wrap">
          Lộ trình cá nhân hóa cho {PROFILE.heightCm}cm / {PROFILE.startKg}→{PROFILE.goalKg}kg ·
          dụng cụ: dây kháng lực, thanh ngang, tay cầm, xà, tạ 3kg, dây nhảy. Deploy bằng Vercel /
          Netlify / bất kỳ host Next.js nào.
        </div>
      </footer>
    </RevealObserver>
  );
}
