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
  muscle: Muscle;
  gear: string;
  sets: number;
  reps: string;
  rest: string;
  note: string;
};

export type Move = { name: string; dose: string; note?: string };

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
  { name: "Nhảy dây chậm", dose: "2 phút" },
  { name: "Xoay khớp vai trước / sau", dose: "10 + 10" },
  { name: "Band pull-apart", dose: "15 lần", note: BANDS.nhe },
  { name: "Band dislocate (cầm dây rộng, vòng qua đầu ra sau lưng)", dose: "10 lần", note: BANDS.nhe },
  { name: "Cat–cow (bò mèo)", dose: "8 lần" },
  { name: "Scapular pull-up (treo xà, chỉ nhún bả vai)", dose: "8 lần" },
  { name: "1 set nhẹ của bài đầu tiên", dose: "12 lần", note: "Dùng dây nhẹ hơn 1 bậc" },
];

const WARMUP_LOWER: Move[] = [
  { name: "Nhảy dây chậm", dose: "2 phút" },
  { name: "Xoay hông, xoay gối, xoay cổ chân", dose: "10 lần mỗi khớp" },
  { name: "Đá chân trước–sau và sang ngang", dose: "10 lần/chân mỗi hướng" },
  { name: "Squat không tạ", dose: "15 lần", note: "Xuống chậm 3 giây" },
  { name: "Glute bridge (nằm nâng hông)", dose: "12 lần" },
  { name: "World's greatest stretch", dose: "5 lần/bên" },
  { name: "Hip hinge với thanh ngang trên lưng", dose: "10 lần" },
];

const WARMUP_FULL: Move[] = [
  { name: "Đi tại chỗ nâng cao gối", dose: "1 phút" },
  { name: "Xoay cổ tay, cổ chân, cổ", dose: "30 giây" },
  { name: "Jumping jack", dose: "1 phút" },
  { name: "Xoay tay vòng lớn trước / sau", dose: "10 + 10" },
  { name: "Đá chân trước–sau", dose: "10 lần/chân" },
  { name: "Inchworm (cúi chạm sàn, bò tay ra plank rồi về)", dose: "5 lần" },
  { name: "Nhảy dây chậm", dose: "2 phút" },
];

/* ---------- Giãn cơ (8–10 phút, giữ đều, thở chậm) ---------- */

const COOLDOWN_UPPER: Move[] = [
  { name: "Giãn ngực ở khung cửa (tay vuông góc, bước tới)", dose: "30 giây/bên" },
  { name: "Treo xà thả lỏng (giãn xô)", dose: "2 × 20 giây" },
  { name: "Kéo tay ngang ngực (vai sau)", dose: "30 giây/bên" },
  { name: "Gập tay qua đầu, kéo khuỷu (tay sau)", dose: "30 giây/bên" },
  { name: "Áp lòng bàn tay vào tường, xoay người ra (tay trước, cẳng tay)", dose: "30 giây/bên" },
  { name: "Nghiêng cổ, tay kéo nhẹ đầu", dose: "20 giây/bên" },
  { name: "Child's pose, hai tay vươn xa", dose: "45 giây" },
];

const COOLDOWN_LOWER: Move[] = [
  { name: "Đứng kéo gót chạm mông (đùi trước)", dose: "30 giây/bên" },
  { name: "Nằm ngửa, dùng dây nhẹ kéo chân thẳng lên (đùi sau)", dose: "30 giây/bên" },
  { name: "Nằm vắt chân hình số 4 (mông)", dose: "30 giây/bên" },
  { name: "Quỳ 1 gối, đẩy hông ra trước (cơ gập hông)", dose: "30 giây/bên" },
  { name: "Ngồi xoạc chữ V, cúi người (đùi trong)", dose: "30 giây" },
  { name: "Chống tay vào tường, duỗi gót (bắp chân)", dose: "30 giây/bên" },
  { name: "Nằm ngửa xoắn cột sống", dose: "30 giây/bên" },
];

const COOLDOWN_FULL: Move[] = [
  { name: "Chống tay vào tường, duỗi gót (bắp chân)", dose: "30 giây/bên" },
  { name: "Đứng kéo gót chạm mông (đùi trước)", dose: "30 giây/bên" },
  { name: "Quỳ 1 gối, đẩy hông ra trước (cơ gập hông)", dose: "30 giây/bên" },
  { name: "Nằm ngửa, dùng dây nhẹ kéo chân thẳng lên (đùi sau)", dose: "30 giây/bên" },
  { name: "Giãn ngực ở khung cửa", dose: "30 giây/bên" },
  { name: "Cobra (nằm sấp chống tay, ưỡn ngực — giãn bụng)", dose: "30 giây" },
  { name: "Child's pose", dose: "45 giây" },
];

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
      { name: "Band chest press", en: "resistance band chest press", muscle: "Ngực", gear: `${BANDS.nang} (neo sau lưng)`, sets: 4, reps: "10–12", rest: "90s", note: "Đẩy ngang ngực, siết 1 giây cuối tầm, về chậm 3 giây." },
      { name: "Band seated row", en: "resistance band seated row", muscle: "Lưng", gear: `${BANDS.nang} (vòng qua bàn chân)`, sets: 4, reps: "10–12", rest: "90s", note: "Kéo khuỷu về hông, ép 2 bả vai, ngực mở." },
      { name: "Band overhead press", en: "resistance band overhead press", muscle: "Vai", gear: `${BANDS.vua} (đứng lên dây)`, sets: 4, reps: "10–12", rest: "75s", note: "Siết bụng + mông, không ưỡn lưng khi đẩy lên." },
      { name: "Pull-up (hỗ trợ dây nếu cần)", en: "band assisted pull up", muscle: "Lưng", gear: `Xà + ${BANDS.nang} để hỗ trợ`, sets: 3, reps: "tối đa (5–8)", rest: "2 phút", note: "Dây càng nặng hỗ trợ càng nhiều. Khỏe dần → đổi sang dây vừa, dây nhẹ, rồi bỏ dây." },
      { name: "Band triceps pushdown", en: "resistance band triceps pushdown", muscle: "Tay sau", gear: `${BANDS.nhe} (neo trên xà)`, sets: 3, reps: "12–15", rest: "60s", note: "Khuỷu ghim sát sườn, chỉ cẳng tay di chuyển." },
      { name: "Band biceps curl", en: "resistance band bicep curl", muscle: "Tay trước", gear: `${BANDS.vua} (đứng lên dây)`, sets: 3, reps: "12–15", rest: "60s", note: "Không đung đưa người, hạ chậm." },
      { name: "Band pull-apart", en: "band pull apart", muscle: "Vai sau", gear: BANDS.nhe, sets: 2, reps: "15–20", rest: "45s", note: "Tay thẳng, kéo dây chạm ngực, ép bả vai." },
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
      { name: "Band squat", en: "resistance band squat", muscle: "Đùi trước", gear: `${BANDS.nang} (đứng lên dây, thanh ngang trên vai)`, sets: 4, reps: "12–15", rest: "90s", note: "Gối theo mũi chân, xuống tới đùi song song sàn, đạp gót đứng lên." },
      { name: "Band Romanian deadlift", en: "resistance band romanian deadlift", muscle: "Đùi sau", gear: `${BANDS.nang} (đứng lên dây, thanh ngang)`, sets: 3, reps: "10–12", rest: "90s", note: "Lưng thẳng, đẩy hông ra sau tới khi căng sau đùi, đẩy hông về trước." },
      { name: "Band split squat", en: "resistance band split squat", muscle: "Đùi trước", gear: `${BANDS.vua} (chân trước đạp dây)`, sets: 3, reps: "10/chân", rest: "60s", note: "Gối sau xuống gần chạm sàn, thân thẳng." },
      { name: "Glute bridge 1 chân", en: "single leg glute bridge", muscle: "Mông", gear: "Không dụng cụ", sets: 3, reps: "12/chân", rest: "60s", note: "Siết mông 2 giây ở đỉnh, không ưỡn lưng." },
      { name: "Band calf raise", en: "resistance band calf raise", muscle: "Bắp chân", gear: `${BANDS.nang} (đứng lên dây)`, sets: 4, reps: "15–20", rest: "45s", note: "Kiễng hết cỡ, giữ 1 giây, hạ chậm." },
      { name: "Plank", en: "plank proper form", muscle: "Core", gear: "Không dụng cụ", sets: 3, reps: "40–60 giây", rest: "45s", note: "Siết mông + bụng, người thẳng một đường." },
      { name: "Dead bug", en: "dead bug exercise", muscle: "Core", gear: "Không dụng cụ", sets: 3, reps: "10/bên", rest: "45s", note: "Lưng dưới luôn ép sát sàn." },
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
      { name: "Nhảy dây HIIT", en: "jump rope hiit workout", muscle: "Cardio", gear: "Dây nhảy", sets: 12, reps: "30s nhảy / 30s nghỉ", rest: "—", note: "Nhảy thấp bằng mũi chân, cổ tay quay. Đau ống chân → giảm còn 8 hiệp." },
      { name: "Pallof press", en: "band pallof press", muscle: "Core", gear: `${BANDS.vua} (neo ngang ngực)`, sets: 3, reps: "12/bên", rest: "45s", note: "Đẩy thẳng ra trước, không để thân bị xoay theo dây." },
      { name: "Hanging knee raise", en: "hanging knee raise", muscle: "Core", gear: "Xà", sets: 3, reps: "10–15", rest: "60s", note: "Kéo gối lên ngực, không đung đưa. Yếu tay → nằm gập gối." },
      { name: "Band woodchop", en: "resistance band woodchop", muscle: "Core", gear: `${BANDS.nhe} (neo cao)`, sets: 3, reps: "12/bên", rest: "45s", note: "Xoay từ hông và thân, tay giữ thẳng." },
      { name: "Band face pull", en: "resistance band face pull", muscle: "Vai sau", gear: `${BANDS.nhe} (neo cao)`, sets: 3, reps: "15", rest: "45s", note: "Kéo về mặt, khuỷu cao, xoay ngoài ở cuối." },
      { name: "Dead hang", en: "dead hang", muscle: "Cẳng tay", gear: "Xà", sets: 3, reps: "30–45 giây", rest: "60s", note: "Treo thả lỏng vai — tốt cho cột sống và lực nắm." },
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
      { name: "Pull-up / chin-up", en: "chin up proper form", muscle: "Lưng", gear: `Xà (+ ${BANDS.nang} nếu cần hỗ trợ)`, sets: 4, reps: "tối đa", rest: "2 phút", note: "Kéo ngực về xà, hạ chậm 3 giây. Mỗi tuần cố +1 rep tổng." },
      { name: "Band bent-over row", en: "resistance band bent over row", muscle: "Lưng", gear: `${BANDS.nang} (đứng lên dây, thanh ngang)`, sets: 3, reps: "10–12", rest: "90s", note: "Gập người ~45°, lưng thẳng, kéo thanh về rốn." },
      { name: "Chống đẩy", en: "push up proper form", muscle: "Ngực", gear: `Tay cầm (dễ quá → quàng ${BANDS.vua} qua lưng)`, sets: 4, reps: "10–15", rest: "75s", note: "Khuỷu ~45° so với thân, ngực chạm gần sàn." },
      { name: "Lateral raise", en: "dumbbell lateral raise", muscle: "Vai", gear: `Tạ 3kg hoặc ${BANDS.nhe}`, sets: 3, reps: "15–20", rest: "60s", note: "Nâng tới ngang vai, 2 giây lên / 3 giây xuống." },
      { name: "Band face pull", en: "resistance band face pull", muscle: "Vai sau", gear: `${BANDS.nhe} (neo cao)`, sets: 3, reps: "15", rest: "45s", note: "Khuỷu cao ngang vai, ép bả vai." },
      { name: "Band hammer curl", en: "resistance band hammer curl", muscle: "Tay trước", gear: BANDS.vua, sets: 3, reps: "12", rest: "60s", note: "Lòng bàn tay hướng vào nhau." },
      { name: "Band overhead triceps extension", en: "resistance band overhead tricep extension", muscle: "Tay sau", gear: `${BANDS.nhe} (đạp dây phía sau)`, sets: 3, reps: "12–15", rest: "60s", note: "Khuỷu chĩa lên trời, chỉ duỗi cẳng tay." },
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
      { name: "Band deadlift", en: "resistance band deadlift", muscle: "Đùi sau", gear: `${BANDS.nang} (đứng lên dây, thanh ngang)`, sets: 3, reps: "10–12", rest: "90s", note: "Đẩy sàn bằng chân, hông và vai lên cùng lúc, lưng thẳng." },
      { name: "Band squat (xuống chậm 3 giây)", en: "resistance band squat", muscle: "Đùi trước", gear: `${BANDS.nang} (thanh ngang trên vai)`, sets: 3, reps: "12", rest: "90s", note: "Xuống 3 giây, dừng 1 giây ở đáy." },
      { name: "Band leg curl nằm sấp", en: "resistance band lying leg curl", muscle: "Đùi sau", gear: `${BANDS.nhe} (neo thấp, quấn cổ chân)`, sets: 3, reps: "12–15", rest: "60s", note: "Co gót về mông, hạ chậm. Dễ quá → dây vừa." },
      { name: "Lateral lunge", en: "lateral lunge", muscle: "Đùi trước", gear: "Ôm tạ 3kg trước ngực", sets: 3, reps: "10/bên", rest: "60s", note: "Bước ngang rộng, đẩy hông ra sau, chân còn lại thẳng." },
      { name: "Band glute kickback", en: "resistance band glute kickback", muscle: "Mông", gear: `${BANDS.nhe} (neo thấp, quấn cổ chân)`, sets: 3, reps: "15/chân", rest: "45s", note: "Đá chân ra sau bằng mông, không ưỡn lưng." },
      { name: "Calf raise 1 chân", en: "single leg calf raise", muscle: "Bắp chân", gear: "Cầm tạ 3kg, vịn tường", sets: 3, reps: "15/chân", rest: "45s", note: "Đứng trên bậc thềm để hạ gót sâu hơn." },
      { name: "Side plank", en: "side plank", muscle: "Core", gear: "Không dụng cụ", sets: 3, reps: "30 giây/bên", rest: "30s", note: "Hông nâng cao, người thẳng." },
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
      { name: "Squat to press (mạch 1)", en: "resistance band thruster", muscle: "Toàn thân", gear: `${BANDS.vua} (đứng lên dây)`, sets: 4, reps: "40s làm / 20s chuyển", rest: "—", note: "Squat xuống, đứng lên đẩy luôn tay qua đầu." },
      { name: "Band row (mạch 2)", en: "resistance band row", muscle: "Lưng", gear: `${BANDS.nang} (neo ngang ngực)`, sets: 4, reps: "40s làm / 20s chuyển", rest: "—", note: "Giữ nhịp đều, ép bả vai mỗi rep." },
      { name: "Chống đẩy (mạch 3)", en: "push up proper form", muscle: "Ngực", gear: "Tay cầm", sets: 4, reps: "40s làm / 20s chuyển", rest: "—", note: "Mỏi → chống gối, không bỏ dở." },
      { name: "Band deadlift (mạch 4)", en: "resistance band deadlift", muscle: "Đùi sau", gear: `${BANDS.nang} (thanh ngang)`, sets: 4, reps: "40s làm / 20s chuyển", rest: "—", note: "Lưng thẳng dù đang mệt." },
      { name: "Mountain climber (mạch 5)", en: "mountain climber", muscle: "Core", gear: "Không dụng cụ", sets: 4, reps: "40s làm", rest: "90s sau mỗi vòng", note: "Hết 5 bài = 1 vòng. Làm 4 vòng." },
      { name: "Nhảy dây đều", en: "jump rope steady state", muscle: "Cardio", gear: "Dây nhảy", sets: 1, reps: "12–15 phút", rest: "—", note: "Nhịp vừa phải, vẫn nói được câu ngắn. Vấp thì nhảy tiếp." },
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
      { name: "Đi bộ nhanh ngoài trời", en: "brisk walking", muscle: "Cardio", gear: "—", sets: 1, reps: "30–45 phút", rest: "—", note: "Nhẹ nhàng, không tính là buổi tập. Cơ thể phục hồi để tuần sau khỏe hơn." },
    ],
    cooldown: [...COOLDOWN_LOWER, ...COOLDOWN_UPPER.slice(0, 4)],
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
