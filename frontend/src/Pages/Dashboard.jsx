import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import socket from "../socket/socket";

import {
  getDashboardAnalytics,
  getLiveVitals,
  getAlerts,
} from "../api/dashboardApi";


export default function Dashboard() {
const [analytics, setAnalytics] = useState(null);
const [patients, setPatients] = useState([]);
const [alerts, setAlerts] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchDashboard();
  }, []);

useEffect(() => {
  socket.on("liveVitalsUpdated", (updatedPatient) => {

    console.log("📡 Dashboard received");
    console.log(updatedPatient);

    // Update Patient List instantly
    setPatients((prev) =>
      prev.map((patient) =>
        patient.patientId === updatedPatient.patientId
          ? updatedPatient
          : patient
      )
    );

    // Refresh Analytics only
    getDashboardAnalytics().then((data) => {
      setAnalytics(data);
    });

    // Refresh Alerts only
    getAlerts().then((data) => {
      setAlerts(data);
    });

  });

  return () => {
    socket.off("liveVitalsUpdated");
  };
}, []);


const fetchDashboard = async () => {
  try {
    const analyticsData = await getDashboardAnalytics();
    const vitalsData = await getLiveVitals();
    const alertsData = await getAlerts();

    setAnalytics(analyticsData);
    setPatients(vitalsData);
    setAlerts(alertsData);

    setLoading(false);
  } catch (err) {
    console.error(err);
  }
};



  const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
         Predictive Hospital Management AI
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-gray-500">Total Patients</h3>
          <p className="text-4xl font-bold text-blue-600">
        {analytics?.totalPatients || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-gray-500">Active Alerts</h3>
          <p className="text-4xl font-bold text-red-600">
        {analytics?.activeAlerts || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-gray-500">Critical Patients</h3>
          <p className="text-4xl font-bold text-red-700">
            {analytics?.criticalPatients || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-gray-500">AI Accuracy</h3>
          <p className="text-4xl font-bold text-green-600">
            96.4%
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-5">
    <h3 className="text-gray-500">
        Avg Heart Rate
    </h3>

    <p className="text-4xl font-bold text-red-500">
        {analytics?.averageHeartRate} bpm
    </p>
</div>

<div className="bg-white rounded-xl shadow-lg p-5">
    <h3 className="text-gray-500">
        Avg Respiration
    </h3>

    <p className="text-4xl font-bold text-blue-500">
        {analytics?.averageRespirationRate}/min
    </p>
</div>
<div className="bg-white rounded-xl shadow-lg p-5">
    <h3 className="text-gray-500">
        Avg Distress
    </h3>

    <p className="text-4xl font-bold text-orange-500">
        {analytics?.averageDistressScore}
    </p>
</div>
<div className="bg-white rounded-xl shadow-lg p-5">
  <div className="mt-3 text-green-600 font-semibold">
🟢 Live
</div>
    <h3 className="text-gray-500">
        Online Patients
    </h3>

    <p className="text-4xl font-bold text-green-500">
        {analytics?.onlinePatients}
    </p>
</div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Distress Trend */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h2 className="text-xl font-bold mb-4">
            📈 Distress Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics?.distressTrend || []}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
           <Line
    type="monotone"
    dataKey="value"
    stroke="#2563eb"
    strokeWidth={3}
/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h2 className="text-xl font-bold mb-4">
            🚨 Alert Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              
               <Pie
                data={analytics?.alertDistribution || []}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
              {analytics?.alertDistribution?.map((entry, index) => (
    <Cell
        key={index}
        fill={COLORS[index % COLORS.length]}
    />
))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          🚨 Recent Alerts
        </h2>

        {alerts.map((alert) => (
          <div
            key={alert._id}
            className="border-l-4 border-red-500 bg-red-50 p-4 mb-3 rounded-lg"
          >
           <p className="font-bold text-red-700">
{alert.type}
</p>

<p>
Patient ID :
<strong>{alert.patientId}</strong>
</p>

<p>
{alert.message}
</p>

<p>
Priority :
<strong>{alert.priority}</strong>
</p>

<p className="text-gray-500">
{new Date(alert.createdAt).toLocaleString()}
</p>
          </div>
        ))}
      </div>

      {/* Live Patient Status */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          👨‍⚕️ Live Patient Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {console.log("Dashboard Patients:", patients)}
          {patients.map((p) => {
            const riskColor =
              p.riskLevel === "High"
                ? "bg-red-200 text-red-800"
                : p.riskLevel === "Medium"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800";

            return (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow-lg p-5"
              >
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">
                 {p.patientId}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${riskColor}`}
                  >
                    {p.riskLevel}
                  </span>
                </div>
<div className="mt-4 space-y-2">

<p>❤️ Heart Rate : {p.heartRate}</p>

<p>🫁 Respiration : {p.respirationRate}</p>

<p>⚠️ Distress : {p.distressScore}</p>

<p>👁 Eye : {p.eyeStatus}</p>

<p>😴 Drowsy : {p.drowsyStatus}</p>

<p>🤧 Cough : {p.coughCount}</p>

<p>🚶 Body : {p.bodyStatus}</p>

<p>🛑 Fall Risk : {p.fallRisk}</p>

<p className="text-blue-600">

{p.recommendation}

</p>

<p className="text-gray-500 text-sm">

Updated :

{new Date(p.lastUpdated).toLocaleTimeString()}

</p>

</div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}