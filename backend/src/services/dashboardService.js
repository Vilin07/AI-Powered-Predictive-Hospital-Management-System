import Patient from "../models/patient.js";
import LiveVital from "../models/liveVital.js";
import Alert from "../models/alert.js";

export const getDashboardAnalytics = async () => {
  const totalPatients = await Patient.countDocuments();

  const activePatients = await Patient.countDocuments({
    status: "Active",
  });

  const criticalPatients =
    await LiveVital.countDocuments({
      riskLevel: "High",
    });

  const warningPatients =
    await LiveVital.countDocuments({
      riskLevel: "Medium",
    });

  const stablePatients =
    await LiveVital.countDocuments({
      riskLevel: "Low",
    });

  const activeAlerts =
    await Alert.countDocuments({
      status: "Unread",
    });

  const highFallRiskPatients =
    await LiveVital.countDocuments({
      fallRisk: "High",
    });

  const drowsyPatients =
    await LiveVital.countDocuments({
      drowsyStatus: "DROWSY ⚠️",
    });

  const vitals = await LiveVital.find();

  let averageHeartRate = 0;
  let averageRespirationRate = 0;

  if (vitals.length > 0) {
    averageHeartRate =
      vitals.reduce(
        (sum, item) => sum + item.heartRate,
        0
      ) / vitals.length;

    averageRespirationRate =
      vitals.reduce(
        (sum, item) => sum + item.respirationRate,
        0
      ) / vitals.length;
  }

  return {
    totalPatients,
    activePatients,
    criticalPatients,
    warningPatients,
    stablePatients,
    activeAlerts,
    highFallRiskPatients,
    drowsyPatients,
    averageHeartRate:
      Math.round(averageHeartRate),

    averageRespirationRate:
      Math.round(averageRespirationRate),
  };
};