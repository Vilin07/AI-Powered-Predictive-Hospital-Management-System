import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

let faceLandmarker;

export const loadFaceLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  faceLandmarker = await FaceLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
      },

      runningMode: "VIDEO",

      numFaces: 5,

      outputFaceBlendshapes: true,

      outputFacialTransformationMatrixes: true,
    }
  );

  console.log("Face Landmarker Loaded");
};

export const detectFaceLandmarks = (
  video
) => {
  if (!faceLandmarker) return null;

  return faceLandmarker.detectForVideo(
    video,
    performance.now()
  );
};