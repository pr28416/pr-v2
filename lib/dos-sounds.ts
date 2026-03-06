let audioCtx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function beep(frequency: number, durationMs: number, volume = 0.08) {
  if (muted) return;
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = frequency;
  gain.gain.value = volume;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + durationMs / 1000);
}

export const dosSound = {
  navigate() {
    beep(800, 30, 0.04);
  },
  activate() {
    beep(1000, 80, 0.06);
  },
  error() {
    beep(200, 180, 0.08);
  },
  startup() {
    const ctx = getCtx();
    if (!ctx || muted) return;
    const notes = [440, 554, 659];
    notes.forEach((freq, i) => {
      setTimeout(() => beep(freq, 100, 0.06), i * 120);
    });
  },
  toggleMute() {
    muted = !muted;
    return muted;
  },
  isMuted() {
    return muted;
  },
  initFromInteraction() {
    getCtx();
  },
};
