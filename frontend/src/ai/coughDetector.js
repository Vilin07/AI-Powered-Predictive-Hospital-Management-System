let coughCount = 0;

export const startCoughDetection = (
  callback
) => {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then((stream) => {
      const audioContext =
        new AudioContext();

      const analyser =
        audioContext.createAnalyser();

      const microphone =
        audioContext.createMediaStreamSource(
          stream
        );

      microphone.connect(
        analyser
      );

      analyser.fftSize = 256;

      const dataArray =
        new Uint8Array(
          analyser.frequencyBinCount
        );

      let lastCough = 0;
      let coughFrames = 0;
      let silentFrames = 0;

      const detect = () => {
        analyser.getByteFrequencyData(
          dataArray
        );

        const volume =
          dataArray.reduce(
            (a, b) => a + b,
            0
          ) / dataArray.length;
          

        const now = Date.now();
if (volume > 80) {
  coughFrames++;
  silentFrames = 0;
} else {
  silentFrames++;

  if (silentFrames > 5) {
    coughFrames = 0;
  }
}

if (
  coughFrames >= 3 &&
  now - lastCough > 2500
) {
  coughCount++;

  lastCough = now;

  callback(coughCount);

  coughFrames = 0;
}

        requestAnimationFrame(
          detect
        );
      };

      detect();
    })
    .catch(console.error);
};

export const getCoughStatus = (
  count
) => {
  if (count >= 15)
    return "Severe";

  if (count >= 8)
    return "Frequent";

  if (count >= 3)
    return "Mild";

  return "Normal";
};