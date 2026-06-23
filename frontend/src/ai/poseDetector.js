import {
  PoseLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

let poseLandmarker;

export const loadPoseLandmarker =
  async () => {
    const vision =
      await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

    poseLandmarker =
      await PoseLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task",
          },

          runningMode: "VIDEO",

          numPoses: 1,
        }
      );
  };

  export const detectPose = (
  video
) => {
  if (!poseLandmarker)
    return null;

  return poseLandmarker.detectForVideo(
    video,
    performance.now()
  );
};