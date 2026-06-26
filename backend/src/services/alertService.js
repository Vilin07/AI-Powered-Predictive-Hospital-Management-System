import Alert from "../models/alert.js";

export const generateAlert = async (liveVital) => {
  let alert = null;

  if (liveVital.distressScore >= 70) {
    alert = {
      patientId: liveVital.patientId,
      type: "Critical",
      priority: "High",
      message: "Critical distress detected.",
    };
  }

  else if (liveVital.heartRate >= 120) {
    alert = {
      patientId: liveVital.patientId,
      type: "Critical",
      priority: "High",
      message: "Abnormally high heart rate detected.",
    };
  }

  else if (liveVital.respirationRate >= 28) {
    alert = {
      patientId: liveVital.patientId,
      type: "Warning",
      priority: "Medium",
      message: "High respiration rate detected.",
    };
  }

  else if (liveVital.drowsyStatus === "DROWSY ⚠️") {
    alert = {
      patientId: liveVital.patientId,
      type: "Warning",
      priority: "Medium",
      message: "Patient appears drowsy.",
    };
  }

  else if (liveVital.fallRisk === "High") {
    alert = {
      patientId: liveVital.patientId,
      type: "Critical",
      priority: "High",
      message: "High fall risk detected.",
    };
  }

  if (alert) {
    await Alert.create(alert);
  }
};