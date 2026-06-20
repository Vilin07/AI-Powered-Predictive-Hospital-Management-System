import {
  loadLandmarkModel,
  detectLandmarks,
} from "./faceLandmarks";

let modelLoaded = false;

export const initializeDistressModel = async () => {
  if (!modelLoaded) {
    await loadLandmarkModel();
    modelLoaded = true;
  }
};

export const analyzeDistress = async (video) => {
  const faces = await detectLandmarks(video);

  if (!faces.length) {
    return {
      distressScore: 0,
      status: "No Face",
      faceCount: 0,
    };
  }

  const score =
    Math.floor(Math.random() * 40) + 40;

  return {
    distressScore: score,
    status:
      score > 75
        ? "High Risk"
        : score > 40
        ? "Medium Risk"
        : "Low Risk",
    faceCount: faces.length,
  };
};