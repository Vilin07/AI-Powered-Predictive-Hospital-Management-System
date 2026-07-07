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
  updatedAt: -1,
});


  console.log("========== LIVE VITALS ==========");

liveVitals.forEach((p) => {
  console.log({
    patientId: p.patientId,
    updatedAt: p.updatedAt,
    lastUpdated: p.lastUpdated,
  });
});

console.log("===============================");

 const criticalPatients = liveVitals.filter(
  p => p.riskLevel === "High Risk"
).length;

const warningPatients = liveVitals.filter(
  p => p.riskLevel === "Medium Risk"
).length;

 const stablePatients = liveVitals.filter(
  p => p.riskLevel === "Low Risk"
).length;

 const highFallRiskPatients = liveVitals.filter(
  p => p.fallRisk === "High Risk"
).length;

 const drowsyPatients = liveVitals.filter(
  p => p.drowsyStatus !== "Normal"
).length;

const highRiskPatients = liveVitals.filter(
  (patient) =>
    patient.riskLevel === "High Risk" ||
    patient.riskLevel === "Medium Risk"
);

// Consider a patient online if updated in the last 30 seconds
const thirtySecondsAgo = new Date(Date.now() - 30000);

const recentPatients = await LiveVital.find({
  updatedAt: {
    $gte: thirtySecondsAgo,
  },
});

const onlinePatients = recentPatients.length;

console.log("========== ONLINE PATIENTS ==========");
console.log("Current Time :", new Date());
console.log("Checking After :", thirtySecondsAgo);
console.log("Online :", recentPatients);
console.log("=====================================");

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

const distressTrend = [...liveVitals]
  .sort(
    (a, b) =>
      new Date(a.updatedAt) -
      new Date(b.updatedAt)
  )
  .map((p) => ({
    time: new Date(
      p.updatedAt
    ).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }),
    value: p.distressScore,
  }));

const heartRateTrend = [...liveVitals]
  .sort(
    (a, b) =>
      new Date(a.updatedAt) -
      new Date(b.updatedAt)
  )
  .map((p) => ({
   time: new Date(p.updatedAt).toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
}),
    value: p.heartRate,
  }));

const respirationTrend = [...liveVitals]
  .sort(
    (a, b) =>
      new Date(a.updatedAt) -
      new Date(b.updatedAt)
  )
  .map((p) => ({
   time: new Date(p.updatedAt).toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
}),
    value: p.respirationRate,
  }));

const criticalAlerts = await Alert.countDocuments({
  priority: "High",
});

const warningAlerts = await Alert.countDocuments({
  priority: "Medium",
});

const normalAlerts = await Alert.countDocuments({
  priority: "Low",
});

const alertDistribution = [
  {
    name: "Critical",
    value: criticalAlerts,
  },
  {
    name: "Warning",
    value: warningAlerts,
  },
  {
    name: "Normal",
    value: normalAlerts,
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

    highRiskPatients,
  };
};