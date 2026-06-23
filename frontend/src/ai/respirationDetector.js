let breathingSignal = [];

export const extractBreathingSignal = (
  landmarks
) => {
  if (!landmarks?.length) return null;

  // Use nose landmark as a simple starting point
  const nose = landmarks[1];

  breathingSignal.push(nose.y);

  if (breathingSignal.length > 300) {
    breathingSignal.shift();
  }

  return [...breathingSignal];
};

export const estimateRespirationRate = (
  signal
) => {
  if (!signal || signal.length < 200)
    return 0;

  const mean =
    signal.reduce((a, b) => a + b, 0) /
    signal.length;

  const normalized =
    signal.map((v) => v - mean);

  let peaks = 0;
  let lastPeak = -10;

  for (
    let i = 1;
    i < normalized.length - 1;
    i++
  ) {
    if (
      normalized[i] >
        normalized[i - 1] &&
      normalized[i] >
        normalized[i + 1] &&
      normalized[i] > 0 &&
      i - lastPeak > 15
    ) {
      peaks++;
      lastPeak = i;
    }
  }

  const durationSeconds =
    signal.length / 10;

  const breathsPerMinute =
    (peaks * 60) / durationSeconds;

  return Math.round(breathsPerMinute);
};