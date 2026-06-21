export const calculateDistressScore = (
  blinkScore,
  jawOpenScore,
  faceCount = 1
) => {
  if (faceCount === 0) {
    return 0;
  }

  let score = 10;

  score += Math.round(blinkScore * 30);

  score += Math.round(jawOpenScore * 60);

  return Math.min(score, 100);
};

export const getRiskLevel = (
  distressScore
) => {
  if (distressScore >= 70) {
    return {
      label: "High Risk",
      color:
        "bg-red-100 text-red-700 border-red-300",
    };
  }

  if (distressScore >= 40) {
    return {
      label: "Medium Risk",
      color:
        "bg-yellow-100 text-yellow-700 border-yellow-300",
    };
  }

  return {
    label: "Low Risk",
    color:
      "bg-green-100 text-green-700 border-green-300",
    };
};