import Patient from "../models/patient.js";
import LiveVital from "../models/liveVital.js";
import Alert from "../models/alert.js";

export const getDashboardAnalytics = async () => {

  const totalPatients = await Patient.countDocuments();

  const activePatients = await Patient.countDocuments({
    status: "Active",
  });

  const activeAlerts = await Alert.countDocuments({
    status: "Unread",
  });

  const liveVitals = await LiveVital.find().sort({
    updatedAt: 1,
  });

  const criticalPatients = liveVitals.filter(
    p => p.riskLevel === "High"
  ).length;

  const warningPatients = liveVitals.filter(
    p => p.riskLevel === "Medium"
  ).length;

  const stablePatients = liveVitals.filter(
    p => p.riskLevel === "Low"
  ).length;

  const highFallRiskPatients = liveVitals.filter(
    p => p.fallRisk === "High"
  ).length;

  const drowsyPatients = liveVitals.filter(
    p => p.drowsyStatus === "DROWSY ⚠️"
  ).length;

  let averageHeartRate = 0;
  let averageRespirationRate = 0;
  let averageDistressScore = 0;

  if (liveVitals.length) {

    averageHeartRate =
      liveVitals.reduce(
        (a, b) => a + b.heartRate,
        0
      ) / liveVitals.length;

    averageRespirationRate =
      liveVitals.reduce(
        (a, b) => a + b.respirationRate,
        0
      ) / liveVitals.length;

    averageDistressScore =
      liveVitals.reduce(
        (a, b) => a + b.distressScore,
        0
      ) / liveVitals.length;
  }

  const onlinePatients =
    liveVitals.filter(
      p =>
        Date.now() -
          new Date(p.lastUpdated).getTime() <
        10000
    ).length;

  const distressTrend =
    liveVitals.map(p => ({
      time: new Date(
        p.lastUpdated
      ).toLocaleTimeString(),

      value: p.distressScore,
    }));

  const heartRateTrend =
    liveVitals.map(p => ({
      time: new Date(
        p.lastUpdated
      ).toLocaleTimeString(),

      value: p.heartRate,
    }));

  const respirationTrend =
    liveVitals.map(p => ({
      time: new Date(
        p.lastUpdated
      ).toLocaleTimeString(),

      value: p.respirationRate,
    }));

  const alertDistribution = [
    {
      name: "Critical",
      value: criticalPatients,
    },
    {
      name: "Warning",
      value: warningPatients,
    },
    {
      name: "Normal",
      value: stablePatients,
    },
  ];

  return {

    totalPatients,

    activePatients,

    activeAlerts,

    criticalPatients,

    warningPatients,

    stablePatients,

    onlinePatients,

    highFallRiskPatients,

    drowsyPatients,

    averageHeartRate:
      Math.round(averageHeartRate),

    averageRespirationRate:
      Math.round(
        averageRespirationRate
      ),

    averageDistressScore:
      Math.round(
        averageDistressScore
      ),

    distressTrend,

    heartRateTrend,

    respirationTrend,

    alertDistribution,
  };
};