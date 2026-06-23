let greenSignal = [];

export const extractHeartRateSignal = (
video,
landmarks
) => {
if (!video || !landmarks?.length) return null;

const canvas =
document.createElement("canvas");

const ctx =
canvas.getContext("2d");

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

ctx.drawImage(
video,
0,
0,
canvas.width,
canvas.height
);

const forehead = landmarks[10];

const x =
forehead.x * canvas.width;

const y =
forehead.y * canvas.height;

const size = 30;

const imageData = ctx.getImageData(
x - size,
y - size,
size * 2,
size * 2
);

const pixels = imageData.data;

let green = 0;

for (
let i = 0;
i < pixels.length;
i += 4
) {
green += pixels[i + 1];
}

green =
green / (pixels.length / 4);

greenSignal.push(green);

// Keep last 30 seconds @10fps
if (greenSignal.length > 300) {
greenSignal.shift();
}

return [...greenSignal];
};

export const estimateHeartRate = (
signal
) => {
if (!signal) return 0;

if (signal.length < 250)
return 0;

// Remove DC component
const mean =
signal.reduce(
(a, b) => a + b,
0
) / signal.length;

const normalized =
signal.map(
(v) => v - mean
);

// Smooth signal
const smoothed = [];

for (
let i = 2;
i < normalized.length - 2;
i++
) {
smoothed.push(
(
normalized[i - 2] +
normalized[i - 1] +
normalized[i] +
normalized[i + 1] +
normalized[i + 2]
) / 5
);
}

let peaks = 0;
let lastPeak = -10;

const maxVal =
Math.max(...smoothed);

const threshold =
maxVal * 0.15;

for (
  let i = 2;
  i < smoothed.length - 2;
  i++
) {
  if (
    smoothed[i] >
      smoothed[i - 1] &&
    smoothed[i] >
      smoothed[i + 1] &&
    smoothed[i] >
      threshold &&
    i - lastPeak > 2
  ) {
    peaks++;
    lastPeak = i;
  }
}
const durationSeconds =
signal.length / 10;

let bpm =
(peaks * 60) /
durationSeconds;

bpm = bpm * 1.35;


console.log(
"Peaks:",
peaks,
"Raw BPM:",
bpm
);

// Soft clamp
if (bpm < 55) bpm = 55;
if (bpm > 120) bpm = 120;

return Math.round(bpm);
};
