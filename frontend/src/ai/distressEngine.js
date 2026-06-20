export const calculateDistressScore = (
  faceCount
) => {
  // No patient visible
  if (faceCount === 0) {
    return 0;
  }

  // Normal monitoring
  if (faceCount >= 1) {
    return 20;
  }

  return 0;
};

export const getRiskLevel = (
  distressScore
) => {
  if (distressScore >= 75) {
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