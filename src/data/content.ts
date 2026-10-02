export type Exercise = {
  id: string;
  cat: "day" | "pull" | "leg" | "core" | "cardio";
  title: string;
  youtubeId: string;
  pills: string[];
  steps: string[];
  extraLinks?: { label: string; href: string }[];
};

export type DayPlan = {
  dow: string;
  focus: string;
  items: string[];
  rest?: boolean;
};

export const PROFILE = {
  heightCm: 175,
  startKg: 75,
  goalKg: 70,
  bmiNow: 24.5,
  bmiGoal: 22.9,
  weeks: "10–12",
};

export const EQUIPMENT = [
  {
    tag: "Kháng lực",
    title: "3 dây 5–40kg",
    desc: "Tiến bộ bằng cách đổi dây nặng hơn hoặc tăng số rep/set. Kết hợp thanh ngang + tay cầm.",
    bullets: ["Đẩy ngực, đẩy vai", "Kéo lưng, face pull", "Squat, deadlift kiểu Rumani"],
  },
  {
    tag: "Kéo thân trên",
    title: "Xà ngang",
    desc: "Pull-up / chin-up là bài “đắt” nhất. Chưa làm được? Dùng dây hỗ trợ.",
    bullets: ["Pull-up / chin-up", "Hanging knee raise", "Dead hang (bám xà)"],
  },
  {
    tag: "Cardio + phụ",
    title: "Dây nhảy · Tạ 3kg",
    desc: "Dây nhảy đốt calo nhanh. Tạ 3kg dùng cho vai/tay với số rep cao hoặc finisher.",
    bullets: ["HIIT / ổn định 10–20 phút", "Lateral raise, curl, press nhẹ", "Farmers carry ngắn trong nhà"],
  },
] as const;

export const WEEK_CUT: DayPlan[] = [
  { dow: "T2", focus: "Đẩy + nhảy", items: ["Band chest press 4×10–12", "Overhead press 3×10", "Lateral raise 3kg 3×15", "Dây nhảy 10–12 phút"] },
  { dow: "T3", focus: "Chân + core", items: ["Band squat 4×12", "RDL với dây 3×10", "Lunges 3×10/chân", "Knee raise / plank"] },
  { dow: "T4", focus: "HIIT dây nhảy", items: ["Warm-up 3 phút", "30s nhảy / 30s nghỉ × 12", "Core 8 phút", "Stretch 5 phút"] },
  { dow: "T5", focus: "Kéo + xà", items: ["Pull-up / assisted 4×max", "Band row 4×12", "Face pull 3×15", "Curl 3kg 3×12"] },
  { dow: "T6", focus: "Full body mạch", items: ["Squat + row + press", "3 vòng, nghỉ 60s", "Finisher nhảy 5 phút"] },
  { dow: "T7", focus: "Nhảy bền / đi bộ", items: ["Dây nhảy 15 phút đều", "hoặc đi bộ nhanh 40–50 phút"] },
  { dow: "CN", focus: "Nghỉ / mobility", items: ["Stretch hông, ngực, vai", "Dead hang 3×20–40s"], rest: true },
];

export const WEEK_MAINTAIN: DayPlan[] = [
  { dow: "T2", focus: "Đẩy nặng hơn", items: ["Chest press 5×8–10", "OHP 4×8", "Triceps band 3×12"] },
  { dow: "T3", focus: "Chân", items: ["Squat 5×8", "RDL 4×8", "Calf / core"] },
  { dow: "T4", focus: "Active rest", items: ["Đi bộ / đạp xe nhẹ", "Mobility 15 phút"], rest: true },
  { dow: "T5", focus: "Kéo + xà", items: ["Pull-up 5×max", "Row 4×10", "Face pull 3×15"] },
  { dow: "T6", focus: "Full body", items: ["Compound 4 bài", "Nhảy kỹ thuật 8 phút"] },
  { dow: "T7", focus: "Tùy chọn cardio", items: ["Dây nhảy dễ 10 phút", "hoặc nghỉ hoàn toàn"] },
  { dow: "CN", focus: "Nghỉ", items: ["Ngủ đủ, ăn đủ protein"], rest: true },
];

export const EXERCISES: Exercise[] = [
  {
    id: "chest-press",
    cat: "day",
    title: "Band chest press",
    youtubeId: "nEVFxiEa_Lk",
    pills: ["Dây + tay cầm", "4×10–12", "Ngực / tay sau"],
    steps: [
      "Neo dây sau lưng (thanh ngang / cột / tay cầm sau).",
      "Đẩy ra trước ngang ngực, siết cuối tầm.",
      "Về chậm 2–3 giây — đừng để dây “giật”.",
    ],
  },
  {
    id: "ohp",
    cat: "day",
    title: "Band overhead press",
    youtubeId: "B-aVuyhvLHU",
    pills: ["Dây đứng lên", "3–4×8–12", "Vai"],
    steps: [
      "Đứng lên dây, cầm tay cầm ngang vai.",
      "Đẩy thẳng lên, tránh ưỡn lưng quá.",
      "Có thể kết hợp tạ 3kg nếu dây quá nhẹ.",
    ],
  },
  {
    id: "pullup",
    cat: "pull",
    title: "Pull-up / chin-up (có hỗ trợ dây)",
    youtubeId: "eGo4IYlbE5g",
    pills: ["Xà ngang", "4×max", "Lưng / tay trước"],
    steps: [
      "Chưa làm được: móc dây vào xà, đặt chân/gối lên dây.",
      "Kéo ngực về thanh, hạ có kiểm soát.",
      "Mỗi tuần cố +1 rep tổng.",
    ],
    extraLinks: [{ label: "Band-assisted →", href: "https://www.youtube.com/watch?v=2Tx_qGthS3s" }],
  },
  {
    id: "row",
    cat: "pull",
    title: "Band row",
    youtubeId: "btNuMHUwUbQ",
    pills: ["Dây + thanh / tay cầm", "4×10–12", "Lưng giữa"],
    steps: [
      "Neo dây thấp–trung, kéo khuỷu về hông.",
      "Siết xương bả, ngực mở.",
      "Đổi dây nặng khi làm 12 rep dễ.",
    ],
  },
  {
    id: "face-pull",
    cat: "pull",
    title: "Band face pull",
    youtubeId: "rep-ULsRguY",
    pills: ["Dây neo cao", "3×12–15", "Vai sau"],
    steps: [
      "Kéo dây về mặt, khuỷu cao ngang vai.",
      "Xoay ngoài nhẹ ở cuối động tác.",
      "Làm chậm — bài sửa vai quan trọng.",
    ],
  },
  {
    id: "squat",
    cat: "leg",
    title: "Band squat",
    youtubeId: "dQqApCGd5Ss",
    pills: ["Dây", "4×10–15", "Đùi / mông"],
    steps: [
      "Chân rộng bằng vai, gối theo hướng mũi chân.",
      "Hạ đến đùi gần song song sàn.",
      "Đẩy gót lên, siết mông trên cùng.",
    ],
  },
  {
    id: "rdl",
    cat: "leg",
    title: "Band Romanian deadlift",
    youtubeId: "hQgFixeXd_o",
    pills: ["Dây + tay cầm", "3–4×8–12", "Hamstring / mông"],
    steps: [
      "Lưng thẳng, đẩy hông ra sau, hạ tay cầm dọc đùi.",
      "Cảm giác căng sau đùi rồi kéo hông ra trước.",
      "Không cong lưng dưới.",
    ],
    extraLinks: [
      {
        label: "Bản dây",
        href: "https://www.youtube.com/results?search_query=resistance+band+romanian+deadlift",
      },
    ],
  },
  {
    id: "knee-raise",
    cat: "core",
    title: "Hanging knee raise",
    youtubeId: "1fbU_MkV7NE",
    pills: ["Xà ngang", "3×8–15", "Core"],
    steps: [
      "Treo xà, kéo gối về ngực, tránh đung đưa.",
      "Hạ chậm. Chưa khỏe tay: nằm gập gối hoặc plank.",
    ],
    extraLinks: [{ label: "Plank →", href: "https://www.youtube.com/watch?v=ASdqJoLPFJA" }],
  },
  {
    id: "jump-rope",
    cat: "cardio",
    title: "Dây nhảy — kỹ thuật & HIIT",
    youtubeId: "u3zgHI8QnqE",
    pills: ["Dây nhảy", "10–20 phút", "Cardio"],
    steps: [
      "Khuỷu sát sườn, cổ tay quay — không quay cả cánh tay.",
      "Nhảy thấp, mũi chân. HIIT: 30s/30s × 10–15.",
      "Đau ống chân: giảm volume, giày đệm tốt.",
    ],
    extraLinks: [{ label: "HIIT rope →", href: "https://www.youtube.com/watch?v=1BZM2Vre5oc" }],
  },
  {
    id: "lateral",
    cat: "day",
    title: "Lateral raise tạ 3kg",
    youtubeId: "3VcKaXpzqRo",
    pills: ["Tạ 3kg", "3×12–20", "Vai giữa"],
    steps: [
      "Nâng tay hơi trước mặt, đến ngang vai.",
      "Tạ nhẹ → làm chậm (3 giây lên / 3 giây xuống).",
    ],
    extraLinks: [{ label: "Curl →", href: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo" }],
  },
];

export const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "day", label: "Đẩy" },
  { id: "pull", label: "Kéo / xà" },
  { id: "leg", label: "Chân" },
  { id: "core", label: "Core" },
  { id: "cardio", label: "Cardio" },
] as const;

export const TOC = [
  { href: "#dung-cu", label: "Dụng cụ" },
  { href: "#giai-doan", label: "Giai đoạn" },
  { href: "#lich", label: "Lịch tuần" },
  { href: "#bai-tap", label: "Bài tập" },
  { href: "#an-uong", label: "Ăn uống" },
  { href: "#tien-do", label: "Theo dõi" },
] as const;
