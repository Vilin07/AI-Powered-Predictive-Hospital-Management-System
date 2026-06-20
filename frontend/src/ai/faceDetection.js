import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

import * as faceDetection from "@tensorflow-models/face-detection";

let detector = null;

export const loadFaceDetector = async () => {
  await tf.ready();

  detector = await faceDetection.createDetector(
    faceDetection.SupportedModels.MediaPipeFaceDetector,
    {
      runtime: "tfjs",
      modelType: "short",
      maxFaces: 10,
    }
  );

  console.log("Face Detector Loaded");
};

export const detectFaces = async (video) => {
  if (!detector || !video) return [];

  try {
    const faces = await detector.estimateFaces(video);

    return faces;
  } catch (error) {
    console.error(error);
    return [];
  }
};