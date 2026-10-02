import type { Day, Exercise, Move } from "@/data/content";

export type Section = "Khởi động" | "Bài tập" | "Giãn cơ";

export type Step = {
  kind: "work" | "rest";
  section: Section;
  sec: number;
  label: string;
  // chỉ có ở bước "work"
  title?: string;
  target?: string;
  gear?: string;
  note?: string;
  img?: string;
  perSide?: boolean;
};

const SWITCH_SEC = 5; // chuyển giữa các động tác khởi động / giãn cơ
const MIN_CHANGE_SEC = 30; // đủ thời gian đổi dây khi sang bài mới

const moveStep = (m: Move, section: Section, n: number, total: number): Step => ({
  kind: "work",
  section,
  sec: m.sec,
  label: `${section} ${n}/${total}`,
  title: m.name,
  target: m.dose,
  gear: m.note,
  img: m.img,
  perSide: m.perSide,
});

const exStep = (ex: Exercise, label: string): Step => ({
  kind: "work",
  section: "Bài tập",
  sec: ex.work,
  label,
  title: ex.name,
  target: ex.reps,
  gear: ex.gear,
  note: ex.note,
  img: ex.img,
  perSide: ex.perSide,
});

const rest = (section: Section, sec: number, label: string): Step => ({ kind: "rest", section, sec, label });

function moves(list: Move[], section: Section): Step[] {
  return list.flatMap((m, i) => {
    const s = moveStep(m, section, i + 1, list.length);
    return i < list.length - 1 ? [s, rest(section, SWITCH_SEC, "Chuyển động tác")] : [s];
  });
}

function workout(list: Exercise[]): Step[] {
  // gom các bài circuit liền nhau thành 1 khối chạy theo vòng
  const blocks: Exercise[][] = [];
  for (const ex of list) {
    const last = blocks.at(-1);
    if (ex.circuit && last?.[0].circuit) last.push(ex);
    else blocks.push([ex]);
  }

  const steps: Step[] = [];
  blocks.forEach((block, b) => {
    const lastBlock = b === blocks.length - 1;
    const exNo = list.indexOf(block[0]) + 1;

    if (block[0].circuit) {
      const rounds = block[0].sets;
      for (let r = 1; r <= rounds; r++) {
        block.forEach((ex, j) => {
          steps.push(exStep(ex, `Vòng ${r}/${rounds} · Bài ${j + 1}/${block.length}`));
          const endOfRound = j === block.length - 1;
          if (endOfRound && r === rounds) {
            if (!lastBlock) steps.push(rest("Bài tập", Math.max(ex.restSec, MIN_CHANGE_SEC), "Nghỉ · sang bài mới"));
          } else {
            steps.push(rest("Bài tập", ex.restSec, endOfRound ? "Nghỉ giữa vòng" : "Chuyển bài"));
          }
        });
      }
      return;
    }

    const ex = block[0];
    for (let s = 1; s <= ex.sets; s++) {
      steps.push(exStep(ex, `Bài ${exNo}/${list.length} · Set ${s}/${ex.sets}`));
      if (s < ex.sets) steps.push(rest("Bài tập", ex.restSec, "Nghỉ giữa set"));
      else if (!lastBlock) steps.push(rest("Bài tập", Math.max(ex.restSec, MIN_CHANGE_SEC), "Nghỉ · sang bài mới"));
    }
  });
  return steps;
}

export function buildSession(day: Day): Step[] {
  const steps: Step[] = [];
  const first = day.warmup.length ? "Khởi động" : "Bài tập";
  steps.push(rest(first, 10, "Chuẩn bị"));
  if (day.warmup.length) {
    steps.push(...moves(day.warmup, "Khởi động"));
    steps.push(rest("Bài tập", 20, "Chuẩn bị dây cho bài đầu"));
  }
  steps.push(...workout(day.workout));
  if (day.cooldown.length) {
    steps.push(rest("Giãn cơ", 10, "Chuẩn bị giãn cơ"));
    steps.push(...moves(day.cooldown, "Giãn cơ"));
  }
  return steps;
}

export const totalSec = (steps: Step[]) => steps.reduce((t, s) => t + s.sec, 0);

export const fmt = (sec: number) => {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
};

// màu theo dây để nhìn từ xa biết phải cầm dây nào
export function bandTone(gear?: string): "nang" | "vua" | "nhe" | null {
  if (!gear) return null;
  if (gear.includes("15–40")) return "nang";
  if (gear.includes("5–15")) return "vua";
  if (gear.includes("3–8")) return "nhe";
  return null;
}
