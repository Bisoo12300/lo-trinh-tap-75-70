export const BANDS = {
  nhe: "Dây nhẹ 3–8kg",
  vua: "Dây vừa 5–15kg",
  nang: "Dây nặng 15–40kg",
} as const;

export type Muscle =
  | "Ngực"
  | "Lưng"
  | "Vai"
  | "Vai sau"
  | "Tay trước"
  | "Tay sau"
  | "Đùi trước"
  | "Đùi sau"
  | "Mông"
  | "Bắp chân"
  | "Core"
  | "Cẳng tay"
  | "Toàn thân"
  | "Cardio";

export type Exercise = {
  name: string;
  en: string; // từ khóa tìm video hướng dẫn
  img?: string; // tên file trong /public/ex
  muscle: Muscle;
  gear: string;
  sets: number;
  reps: string;
  work: number; // giây bấm giờ cho 1 set (cả 2 bên nếu perSide)
  restSec: number; // nghỉ sau mỗi set; với bài mạch = thời gian chuyển bài
  perSide?: boolean; // giữa set báo "đổi bên"
  circuit?: boolean; // các bài circuit liền nhau chạy theo vòng, sets = số vòng
  note: string;
};

export type Move = { name: string; dose: string; sec: number; perSide?: boolean; img?: string; note?: string };

export type Food = { name: string; amount: string; kcal: number; protein: number };
export type Meal = { name: string; foods: Food[] };

export type Day = {
  dow: string;
  focus: string;
  warmup: Move[];
  workout: Exercise[];
  cooldown: Move[];
  menu: Meal[];
};

/* ---------- Khởi động (7–8 phút) ---------- */

const WARMUP_UPPER: Move[] = [
  { name: "Nhảy dây chậm", dose: "2 phút", sec: 120, img: "rope" },
  { name: "Xoay tay vòng lớn trước / sau", dose: "10 + 10", sec: 30, img: "arm-circles" },
  { name: "Band pull-apart", dose: "15 lần", sec: 40, img: "pull-apart", note: BANDS.nhe },
  { name: "Band dislocate (cầm dây rộng, vòng qua đầu ra sau lưng)", dose: "10 lần", sec: 30, note: BANDS.nhe },
  { name: "Cat–cow (bò mèo)", dose: "8 lần", sec: 30, img: "cat-cow" },
  { name: "Scapular pull-up (treo xà, chỉ nhún bả vai)", dose: "8 lần", sec: 30, img: "hang" },
  { name: "1 set nhẹ của bài đầu tiên", dose: "12 lần", sec: 40, note: "Dùng dây nhẹ hơn 1 bậc" },
];

const WARMUP_LOWER: Move[] = [
  { name: "Nhảy dây chậm", dose: "2 phút", sec: 120, img: "rope" },
  { name: "Xoay hông, xoay gối, xoay cổ chân", dose: "10 lần mỗi khớp", sec: 45, img: "knee-circles" },
  { name: "Đá chân trước–sau và sang ngang", dose: "10 lần/chân mỗi hướng", sec: 80, perSide: true },
  { name: "Squat không tạ", dose: "15 lần", sec: 60, img: "bw-squat", note: "Xuống chậm 3 giây" },
  { name: "Glute bridge (nằm nâng hông)", dose: "12 lần", sec: 40, img: "bridge" },
  { name: "World's greatest stretch", dose: "5 lần/bên", sec: 60, perSide: true, img: "wgs" },
  { name: "Hip hinge (gập hông, lưng thẳng)", dose: "10 lần", sec: 35, img: "good-morning" },
];

const WARMUP_FULL: Move[] = [
  { name: "Đi tại chỗ nâng cao gối", dose: "1 phút", sec: 60 },
  { name: "Xoay cổ tay, cổ chân, cổ", dose: "30 giây", sec: 30, img: "wrist" },
  { name: "Jumping jack", dose: "1 phút", sec: 60 },
  { name: "Xoay tay vòng lớn trước / sau", dose: "10 + 10", sec: 30, img: "arm-circles" },
  { name: "Đá chân trước–sau", dose: "10 lần/chân", sec: 40, perSide: true },
  { name: "Inchworm (cúi chạm sàn, bò tay ra plank rồi về)", dose: "5 lần", sec: 50, img: "inchworm" },
  { name: "Nhảy dây chậm", dose: "2 phút", sec: 120, img: "rope" },
];

/* ---------- Giãn cơ (8–10 phút, giữ đều, thở chậm) ---------- */

const S = {
  chest: { name: "Dang 2 tay ra sau, ưỡn ngực (giãn ngực)", dose: "30 giây", sec: 30, img: "chest-stretch" },
  lat: { name: "Treo xà thả lỏng (giãn xô)", dose: "2 × 20 giây", sec: 45, img: "hang" },
  crossBody: { name: "Kéo tay ngang ngực (vai sau)", dose: "30 giây/bên", sec: 60, perSide: true, img: "cross-body" },
  triceps: { name: "Gập tay qua đầu, kéo khuỷu (tay sau)", dose: "30 giây/bên", sec: 60, perSide: true, img: "triceps-stretch" },
  forearm: { name: "Quỳ, úp lòng bàn tay xuống sàn, ngón hướng về gối, ngả nhẹ ra sau (cẳng tay)", dose: "30 giây", sec: 30, img: "forearm" },
  neck: { name: "Nghiêng cổ, tay kéo nhẹ đầu", dose: "20 giây/bên", sec: 40, perSide: true, img: "neck" },
  child: { name: "Child's pose, hai tay vươn xa", dose: "45 giây", sec: 45, img: "child" },
  quad: { name: "Nằm nghiêng, dây nhẹ quấn bàn chân, kéo gót về mông (đùi trước)", dose: "30 giây/bên", sec: 60, perSide: true, img: "quad" },
  hamstring: { name: "Nằm ngửa, dùng dây nhẹ kéo chân thẳng lên (đùi sau)", dose: "30 giây/bên", sec: 60, perSide: true, img: "hamstring" },
  figure4: { name: "Nằm vắt chân hình số 4 (mông)", dose: "30 giây/bên", sec: 60, perSide: true, img: "figure4" },
  hipFlexor: { name: "Quỳ 1 gối, đẩy hông ra trước (cơ gập hông)", dose: "30 giây/bên", sec: 60, perSide: true, img: "hip-flexor" },
  groin: { name: "Ngồi chụm 2 lòng bàn chân, ấn nhẹ gối xuống (đùi trong)", dose: "30 giây", sec: 30, img: "groin" },
  calf: { name: "Chống tay vào tường, duỗi gót (bắp chân)", dose: "30 giây/bên", sec: 60, perSide: true, img: "calf-stretch" },
  twist: { name: "Nằm ngửa xoắn cột sống", dose: "30 giây/bên", sec: 60, perSide: true },
  cobra: { name: "Cobra (nằm sấp chống tay, ưỡn ngực — giãn bụng)", dose: "30 giây", sec: 30 },
} satisfies Record<string, Move>;

const COOLDOWN_UPPER: Move[] = [S.chest, S.lat, S.crossBody, S.triceps, S.forearm, S.neck, S.child];
const COOLDOWN_LOWER: Move[] = [S.quad, S.hamstring, S.figure4, S.hipFlexor, S.groin, S.calf, S.twist];
const COOLDOWN_FULL: Move[] = [S.calf, S.quad, S.hipFlexor, S.hamstring, S.chest, S.cobra, S.child];

/* ---------- Thực đơn ~2.000 kcal, ~140g đạm (khối lượng thịt/cá là SỐNG, cơm là CHÍN) ---------- */

const F = {
  yenMach: { name: "Yến mạch", amount: "50g", kcal: 190, protein: 7 },
  suaTuoi: { name: "Sữa tươi không đường", amount: "250ml", kcal: 150, protein: 8 },
  trung2: { name: "Trứng gà luộc", amount: "2 quả", kcal: 140, protein: 12 },
  trung3: { name: "Trứng gà luộc", amount: "3 quả", kcal: 210, protein: 18 },
  chuoi: { name: "Chuối", amount: "1 quả", kcal: 105, protein: 1 },
  tao: { name: "Táo", amount: "1 quả", kcal: 95, protein: 0 },
  oi: { name: "Ổi", amount: "1 quả", kcal: 70, protein: 3 },
  com150: { name: "Cơm trắng", amount: "150g (1 chén đầy)", kcal: 195, protein: 4 },
  com120: { name: "Cơm trắng", amount: "120g (1 chén vừa)", kcal: 155, protein: 3 },
  com100: { name: "Cơm trắng", amount: "100g (2/3 chén)", kcal: 130, protein: 3 },
  rau: { name: "Rau xanh luộc / xào ít dầu", amount: "200g", kcal: 60, protein: 3 },
  canh: { name: "Canh rau / bí", amount: "1 bát", kcal: 40, protein: 1 },
  dau: { name: "Dầu ăn nấu", amount: "1 thìa canh", kcal: 90, protein: 0 },
  ga200: { name: "Ức gà áp chảo / luộc", amount: "200g", kcal: 240, protein: 46 },
  ga150: { name: "Ức gà áp chảo / luộc", amount: "150g", kcal: 180, protein: 35 },
  bo150: { name: "Thịt bò nạc xào / áp chảo", amount: "150g", kcal: 200, protein: 32 },
  heo150: { name: "Thịt heo nạc thăn", amount: "150g", kcal: 210, protein: 32 },
  ca200: { name: "Cá rô phi / cá diêu hồng hấp", amount: "200g", kcal: 190, protein: 40 },
  caHoi: { name: "Cá hồi áp chảo", amount: "150g", kcal: 310, protein: 30 },
  tom: { name: "Tôm hấp / rim", amount: "200g", kcal: 170, protein: 40 },
  dauPhu100: { name: "Đậu phụ", amount: "100g", kcal: 75, protein: 8 },
  dauPhu200: { name: "Đậu phụ sốt cà chua", amount: "200g", kcal: 150, protein: 16 },
  suaChua2: { name: "Sữa chua không đường", amount: "2 hộp", kcal: 130, protein: 7 },
  hat: { name: "Lạc / hạnh nhân", amount: "20g", kcal: 115, protein: 5 },
  khoaiLang: { name: "Khoai lang luộc", amount: "200g", kcal: 170, protein: 3 },
  banhMi: { name: "Bánh mì ổ", amount: "1 ổ (~80g)", kcal: 220, protein: 7 },
  pho: { name: "Phở bò (ít bánh, thêm thịt)", amount: "1 tô vừa", kcal: 450, protein: 30 },
  bun: { name: "Bún tươi", amount: "200g", kcal: 220, protein: 4 },
} satisfies Record<string, Food>;

/* ---------- Bài tập theo ngày ---------- */

export const WEEK: Day[] = [
  {
    dow: "T2",
    focus: "Thân trên A · ưu tiên đẩy",
    warmup: WARMUP_UPPER,
    workout: [
      { name: "Band chest press", en: "resistance band chest press", img: "chest-press", muscle: "Ngực", gear: `${BANDS.nang} (neo sau lưng)`, sets: 4, reps: "10–12 lần", work: 45, restSec: 90, note: "Đẩy ngang ngực, siết 1 giây cuối tầm, về chậm 3 giây." },
      { name: "Band seated row", en: "resistance band seated row", img: "seated-row", muscle: "Lưng", gear: `${BANDS.nang} (vòng qua bàn chân)`, sets: 4, reps: "10–12 lần", work: 45, restSec: 90, note: "Kéo khuỷu về hông, ép 2 bả vai, ngực mở." },
      { name: "Band overhead press", en: "resistance band overhead press", img: "ohp", muscle: "Vai", gear: `${BANDS.vua} (đứng lên dây)`, sets: 4, reps: "10–12 lần", work: 45, restSec: 75, note: "Siết bụng + mông, không ưỡn lưng khi đẩy lên." },
      { name: "Pull-up (hỗ trợ dây nếu cần)", en: "band assisted pull up", img: "assisted-pullup", muscle: "Lưng", gear: `Xà + ${BANDS.nang} để hỗ trợ`, sets: 3, reps: "tối đa (5–8 lần)", work: 40, restSec: 120, note: "Dây càng nặng hỗ trợ càng nhiều. Khỏe dần → dây vừa → dây nhẹ → bỏ dây." },
      { name: "Band triceps pushdown", en: "resistance band triceps pushdown", img: "pushdown", muscle: "Tay sau", gear: `${BANDS.nhe} (neo trên xà)`, sets: 3, reps: "12–15 lần", work: 45, restSec: 60, note: "Khuỷu ghim sát sườn, chỉ cẳng tay di chuyển." },
      { name: "Band biceps curl", en: "resistance band bicep curl", img: "curl", muscle: "Tay trước", gear: `${BANDS.vua} (đứng lên dây)`, sets: 3, reps: "12–15 lần", work: 45, restSec: 60, note: "Không đung đưa người, hạ chậm." },
      { name: "Band pull-apart", en: "band pull apart", img: "pull-apart", muscle: "Vai sau", gear: BANDS.nhe, sets: 2, reps: "15–20 lần", work: 45, restSec: 45, note: "Tay thẳng, kéo dây chạm ngực, ép bả vai." },
    ],
    cooldown: COOLDOWN_UPPER,
    menu: [
      { name: "Sáng", foods: [F.yenMach, F.suaTuoi, F.trung2, F.chuoi] },
      { name: "Trưa", foods: [F.com150, F.ga200, F.rau, F.dau] },
      { name: "Phụ sau tập", foods: [F.suaChua2, F.hat] },
      { name: "Tối", foods: [F.com120, F.ca200, F.dauPhu100, F.canh, F.dau] },
    ],
  },
  {
    dow: "T3",
    focus: "Thân dưới A · ưu tiên squat",
    warmup: WARMUP_LOWER,
    workout: [
      { name: "Band squat", en: "resistance band squat", img: "squat", muscle: "Đùi trước", gear: `${BANDS.nang} (đứng lên dây, thanh ngang trên vai)`, sets: 4, reps: "12–15 lần", work: 50, restSec: 90, note: "Gối theo mũi chân, xuống tới đùi song song sàn, đạp gót đứng lên." },
      { name: "Band Romanian deadlift", en: "resistance band romanian deadlift", img: "rdl", muscle: "Đùi sau", gear: `${BANDS.nang} (đứng lên dây, thanh ngang)`, sets: 3, reps: "10–12 lần", work: 45, restSec: 90, note: "Lưng thẳng, đẩy hông ra sau tới khi căng sau đùi, đẩy hông về trước." },
      { name: "Band split squat", en: "resistance band split squat", img: "split-squat", muscle: "Đùi trước", gear: `${BANDS.vua} (chân trước đạp dây)`, sets: 3, reps: "10 lần/chân", work: 70, restSec: 60, perSide: true, note: "Gối sau xuống gần chạm sàn, thân thẳng." },
      { name: "Glute bridge 1 chân", en: "single leg glute bridge", img: "single-bridge", muscle: "Mông", gear: "Không dụng cụ", sets: 3, reps: "12 lần/chân", work: 70, restSec: 60, perSide: true, note: "Siết mông 2 giây ở đỉnh, không ưỡn lưng." },
      { name: "Band calf raise", en: "resistance band calf raise", img: "calf-band", muscle: "Bắp chân", gear: `${BANDS.nang} (đứng lên dây)`, sets: 4, reps: "15–20 lần", work: 45, restSec: 45, note: "Kiễng hết cỡ, giữ 1 giây, hạ chậm." },
      { name: "Plank", en: "plank proper form", img: "plank", muscle: "Core", gear: "Không dụng cụ", sets: 3, reps: "giữ 45 giây", work: 45, restSec: 45, note: "Siết mông + bụng, người thẳng một đường." },
      { name: "Dead bug", en: "dead bug exercise", img: "dead-bug", muscle: "Core", gear: "Không dụng cụ", sets: 3, reps: "10 lần/bên, luân phiên", work: 50, restSec: 45, note: "Lưng dưới luôn ép sát sàn." },
    ],
    cooldown: COOLDOWN_LOWER,
    menu: [
      { name: "Sáng", foods: [F.banhMi, F.trung2, F.suaTuoi] },
      { name: "Trưa", foods: [F.com150, F.bo150, F.rau, F.dau] },
      { name: "Phụ sau tập", foods: [F.khoaiLang, F.suaChua2, F.hat] },
      { name: "Tối", foods: [F.com100, F.tom, F.rau, F.canh] },
    ],
  },
  {
    dow: "T4",
    focus: "Cardio dây nhảy + core",
    warmup: WARMUP_FULL,
    workout: [
      { name: "Nhảy dây HIIT", en: "jump rope hiit workout", img: "rope", muscle: "Cardio", gear: "Dây nhảy", sets: 12, reps: "nhảy nhanh 30 giây", work: 30, restSec: 30, note: "Nhảy thấp bằng mũi chân, cổ tay quay. Đau ống chân → dừng ở hiệp 8." },
      { name: "Pallof press", en: "band pallof press", img: "pallof", muscle: "Core", gear: `${BANDS.vua} (neo ngang ngực)`, sets: 3, reps: "12 lần/bên", work: 70, restSec: 45, perSide: true, note: "Đẩy thẳng ra trước, không để thân bị xoay theo dây." },
      { name: "Hanging knee raise", en: "hanging knee raise", img: "knee-raise", muscle: "Core", gear: "Xà", sets: 3, reps: "10–15 lần", work: 40, restSec: 60, note: "Kéo gối lên ngực, không đung đưa. Yếu tay → nằm gập gối." },
      { name: "Band woodchop", en: "resistance band woodchop", img: "woodchop", muscle: "Core", gear: `${BANDS.nhe} (neo cao)`, sets: 3, reps: "12 lần/bên", work: 70, restSec: 45, perSide: true, note: "Xoay từ hông và thân, tay giữ thẳng." },
      { name: "Band face pull", en: "resistance band face pull", img: "face-pull", muscle: "Vai sau", gear: `${BANDS.nhe} (neo cao)`, sets: 3, reps: "15 lần", work: 45, restSec: 45, note: "Kéo về mặt, khuỷu cao, xoay ngoài ở cuối." },
      { name: "Dead hang", en: "dead hang", img: "hang", muscle: "Cẳng tay", gear: "Xà", sets: 3, reps: "treo 30–45 giây", work: 40, restSec: 60, note: "Treo thả lỏng vai — tốt cho cột sống và lực nắm." },
    ],
    cooldown: COOLDOWN_FULL,
    menu: [
      { name: "Sáng", foods: [F.yenMach, F.suaTuoi, F.trung2, F.tao] },
      { name: "Trưa", foods: [F.bun, F.heo150, F.rau, F.dau] },
      { name: "Phụ", foods: [F.suaChua2, F.oi] },
      { name: "Tối", foods: [F.com120, F.ga200, F.canh, F.dau] },
    ],
  },
  {
    dow: "T5",
    focus: "Thân trên B · ưu tiên kéo",
    warmup: WARMUP_UPPER,
    workout: [
      { name: "Pull-up / chin-up", en: "chin up proper form", img: "chin-up", muscle: "Lưng", gear: `Xà (+ ${BANDS.nang} nếu cần hỗ trợ)`, sets: 4, reps: "tối đa", work: 40, restSec: 120, note: "Kéo ngực về xà, hạ chậm 3 giây. Mỗi tuần cố +1 rep tổng." },
      { name: "Band bent-over row", en: "resistance band bent over row", img: "bent-row", muscle: "Lưng", gear: `${BANDS.nang} (đứng lên dây, thanh ngang)`, sets: 3, reps: "10–12 lần", work: 45, restSec: 90, note: "Gập người ~45°, lưng thẳng, kéo thanh về rốn." },
      { name: "Chống đẩy", en: "push up proper form", img: "pushup", muscle: "Ngực", gear: `Tay cầm (dễ quá → quàng ${BANDS.vua} qua lưng)`, sets: 4, reps: "10–15 lần", work: 45, restSec: 75, note: "Khuỷu ~45° so với thân, ngực chạm gần sàn." },
      { name: "Lateral raise", en: "dumbbell lateral raise", img: "lateral-raise", muscle: "Vai", gear: `Tạ 3kg hoặc ${BANDS.nhe}`, sets: 3, reps: "15–20 lần", work: 50, restSec: 60, note: "Nâng tới ngang vai, 2 giây lên / 3 giây xuống." },
      { name: "Band face pull", en: "resistance band face pull", img: "face-pull", muscle: "Vai sau", gear: `${BANDS.nhe} (neo cao)`, sets: 3, reps: "15 lần", work: 45, restSec: 45, note: "Khuỷu cao ngang vai, ép bả vai." },
      { name: "Band hammer curl", en: "resistance band hammer curl", img: "hammer", muscle: "Tay trước", gear: BANDS.vua, sets: 3, reps: "12 lần", work: 40, restSec: 60, note: "Lòng bàn tay hướng vào nhau." },
      { name: "Band overhead triceps extension", en: "resistance band overhead tricep extension", img: "oh-triceps", muscle: "Tay sau", gear: `${BANDS.nhe} (đạp dây phía sau)`, sets: 3, reps: "12–15 lần", work: 45, restSec: 60, note: "Khuỷu chĩa lên trời, chỉ duỗi cẳng tay." },
    ],
    cooldown: COOLDOWN_UPPER,
    menu: [
      { name: "Sáng", foods: [F.pho] },
      { name: "Trưa", foods: [F.com150, F.ga150, F.dauPhu100, F.rau, F.dau] },
      { name: "Phụ sau tập", foods: [F.suaTuoi, F.chuoi, F.hat] },
      { name: "Tối", foods: [F.com100, F.ca200, F.rau, F.canh] },
    ],
  },
  {
    dow: "T6",
    focus: "Thân dưới B · ưu tiên hông",
    warmup: WARMUP_LOWER,
    workout: [
      { name: "Band deadlift", en: "resistance band deadlift", img: "deadlift", muscle: "Đùi sau", gear: `${BANDS.nang} (đứng lên dây, thanh ngang)`, sets: 3, reps: "10–12 lần", work: 45, restSec: 90, note: "Đẩy sàn bằng chân, hông và vai lên cùng lúc, lưng thẳng." },
      { name: "Band squat (xuống chậm 3 giây)", en: "resistance band squat", img: "squat", muscle: "Đùi trước", gear: `${BANDS.nang} (thanh ngang trên vai)`, sets: 3, reps: "12 lần", work: 60, restSec: 90, note: "Xuống 3 giây, dừng 1 giây ở đáy." },
      { name: "Band leg curl nằm sấp", en: "resistance band lying leg curl", img: "leg-curl", muscle: "Đùi sau", gear: `${BANDS.nhe} (neo thấp, quấn cổ chân)`, sets: 3, reps: "12–15 lần", work: 45, restSec: 60, note: "Co gót về mông, hạ chậm. Dễ quá → dây vừa." },
      { name: "Lateral lunge", en: "lateral lunge", img: "lateral-lunge", muscle: "Đùi trước", gear: "Ôm tạ 3kg trước ngực", sets: 3, reps: "10 lần/bên", work: 70, restSec: 60, perSide: true, note: "Bước ngang rộng, đẩy hông ra sau, chân còn lại thẳng." },
      { name: "Band glute kickback", en: "resistance band donkey kickback", img: "kickback", muscle: "Mông", gear: `${BANDS.nhe} (quấn bàn chân, 2 tay đè 2 đầu dây)`, sets: 3, reps: "15 lần/chân", work: 80, restSec: 45, perSide: true, note: "Tư thế bò, đạp gót lên trần bằng mông, không ưỡn lưng." },
      { name: "Calf raise 1 chân", en: "single leg calf raise", img: "calf-single", muscle: "Bắp chân", gear: "Cầm tạ 3kg, vịn tường", sets: 3, reps: "15 lần/chân", work: 70, restSec: 45, perSide: true, note: "Đứng trên bậc thềm để hạ gót sâu hơn." },
      { name: "Side plank", en: "side plank", img: "side-plank", muscle: "Core", gear: "Không dụng cụ", sets: 3, reps: "giữ 30 giây/bên", work: 60, restSec: 30, perSide: true, note: "Hông nâng cao, người thẳng." },
    ],
    cooldown: COOLDOWN_LOWER,
    menu: [
      { name: "Sáng", foods: [F.yenMach, F.suaTuoi, F.trung2, F.chuoi] },
      { name: "Trưa", foods: [F.com150, F.heo150, F.rau, F.canh, F.dau] },
      { name: "Phụ sau tập", foods: [F.khoaiLang, F.trung2] },
      { name: "Tối", foods: [F.com100, F.ga150, F.dauPhu100, F.rau] },
    ],
  },
  {
    dow: "T7",
    focus: "Toàn thân mạch + nhảy dây bền",
    warmup: WARMUP_FULL,
    workout: [
      { name: "Squat to press", en: "resistance band thruster", img: "thruster", muscle: "Toàn thân", gear: `${BANDS.vua} (đứng lên dây)`, sets: 4, reps: "liên tục 40 giây", work: 40, restSec: 20, circuit: true, note: "Squat xuống, đứng lên đẩy luôn tay qua đầu." },
      { name: "Band row", en: "resistance band row", img: "seated-row", muscle: "Lưng", gear: `${BANDS.nang} (neo ngang ngực)`, sets: 4, reps: "liên tục 40 giây", work: 40, restSec: 20, circuit: true, note: "Giữ nhịp đều, ép bả vai mỗi rep." },
      { name: "Chống đẩy", en: "push up proper form", img: "pushup", muscle: "Ngực", gear: "Tay cầm", sets: 4, reps: "liên tục 40 giây", work: 40, restSec: 20, circuit: true, note: "Mỏi → chống gối, không bỏ dở." },
      { name: "Band deadlift", en: "resistance band deadlift", img: "deadlift", muscle: "Đùi sau", gear: `${BANDS.nang} (thanh ngang)`, sets: 4, reps: "liên tục 40 giây", work: 40, restSec: 20, circuit: true, note: "Lưng thẳng dù đang mệt." },
      { name: "Mountain climber", en: "mountain climber", img: "mountain", muscle: "Core", gear: "Không dụng cụ", sets: 4, reps: "liên tục 40 giây", work: 40, restSec: 90, circuit: true, note: "Hết bài này = xong 1 vòng, nghỉ 90 giây. Làm 4 vòng." },
      { name: "Nhảy dây đều", en: "jump rope steady state", img: "rope", muscle: "Cardio", gear: "Dây nhảy", sets: 1, reps: "nhịp vừa 13 phút", work: 780, restSec: 0, note: "Nhịp vừa phải, vẫn nói được câu ngắn. Vấp thì nhảy tiếp." },
    ],
    cooldown: COOLDOWN_FULL,
    menu: [
      { name: "Sáng", foods: [F.banhMi, F.trung2, F.suaTuoi] },
      { name: "Trưa", foods: [F.com150, F.caHoi, F.rau] },
      { name: "Phụ sau tập", foods: [F.suaChua2, F.chuoi] },
      { name: "Tối", foods: [F.com120, F.ga200, F.dauPhu100, F.canh, F.dau] },
    ],
  },
  {
    dow: "CN",
    focus: "Nghỉ · đi bộ + giãn cơ",
    warmup: [],
    workout: [
      { name: "Đi bộ nhanh ngoài trời", en: "brisk walking", img: "walk", muscle: "Cardio", gear: "—", sets: 1, reps: "30 phút", work: 1800, restSec: 0, note: "Nhẹ nhàng, không tính là buổi tập. Cơ thể phục hồi để tuần sau khỏe hơn." },
    ],
    cooldown: [...COOLDOWN_LOWER, S.chest, S.crossBody, S.triceps, S.child],
    menu: [
      { name: "Sáng", foods: [F.yenMach, F.suaTuoi, F.trung3] },
      { name: "Trưa", foods: [F.com120, F.bo150, F.rau, F.canh, F.dau] },
      { name: "Phụ", foods: [F.suaChua2, F.oi] },
      { name: "Tối", foods: [F.com100, F.tom, F.dauPhu200, F.rau] },
    ],
  },
];

export const RULES = [
  "Tăng tải: làm đủ số rep cao nhất ở mọi set trong 2 buổi liên tiếp → lên dây nặng hơn, hoặc đứng xa điểm neo / gập đôi dây.",
  "Dây nặng 15–40kg quá nặng ở bài nào → dùng dây vừa 5–15kg, chụm 2 dây khi cần mức ở giữa.",
  "Uống 2,5–3 lít nước/ngày. Cân mỗi sáng thứ Hai: 2 tuần không giảm → bớt 1/3 chén cơm mỗi bữa chính.",
];
