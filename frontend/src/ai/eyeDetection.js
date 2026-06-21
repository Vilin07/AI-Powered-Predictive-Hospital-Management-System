export const calculateDistance = (
  p1,
  p2
) => {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) +
    Math.pow(p2.y - p1.y, 2)
  );
};

export const getEyeAspectRatio = (
  eyePoints
) => {
  const vertical1 =
    calculateDistance(
      eyePoints[1],
      eyePoints[5]
    );

  const vertical2 =
    calculateDistance(
      eyePoints[2],
      eyePoints[4]
    );

  const horizontal =
    calculateDistance(
      eyePoints[0],
      eyePoints[3]
    );

  return (
    (vertical1 + vertical2) /
    (2 * horizontal)
  );
};