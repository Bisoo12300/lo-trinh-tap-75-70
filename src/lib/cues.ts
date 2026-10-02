// Âm báo + đọc giọng nói. AudioContext phải được tạo trong 1 thao tác chạm (unlockAudio).

let ctx: AudioContext | null = null;

export function unlockAudio() {
  try {
    ctx ??= new AudioContext();
    void ctx.resume();
    // iOS chỉ cho đọc giọng nói sau khi đã gọi speak trong 1 thao tác chạm
    window.speechSynthesis?.speak(new SpeechSynthesisUtterance(""));
  } catch {
    ctx = null;
  }
}

export function beep(freq = 880, ms = 150) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ms / 1000);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + ms / 1000);
}

export function speak(text: string) {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
  if (!synth) return;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "vi-VN";
  const vi = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("vi"));
  if (vi) u.voice = vi;
  u.rate = 1.05;
  synth.speak(u);
}

export function stopSpeech() {
  window.speechSynthesis?.cancel();
}
