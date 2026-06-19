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

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const patientData = [
        {
          _id: 1,
          name: "Patient 101",
          heartRate: 95,
          respirationRate: 18,
          coughScore: 3,
          distressScore: 45,
          riskLevel: "Low",
        },
        {
          _id: 2,
          name: "Patient 102",
          heartRate: 120,
          respirationRate: 30,
          coughScore: 8,
          distressScore: 82,
          riskLevel: "High",
        },
        {
          _id: 3,
          name: "Patient 103",
          heartRate: 105,
          respirationRate: 24,
          coughScore: 5,
          distressScore: 68,
          riskLevel: "Medium",
        },
      ];

      const alertData = [
        {
          _id: 1,
          type: "Breathing Distress",
          patientName: "Patient 102",
          timestamp: "2 minutes ago",
        },
        {
          _id: 2,
          type: "Frequent Coughing",
          patientName: "Patient 103",
          timestamp: "5 minutes ago",
        },
      ];

      setPatients(patientData);
      setAlerts(alertData);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const distressTrend = [
    { day: "Mon", score: 40 },
    { day: "Tue", score: 55 },
    { day: "Wed", score: 48 },
    { day: "Thu", score: 70 },
    { day: "Fri", score: 82 },
    { day: "Sat", score: 65 },
    { day: "Sun", score: 50 },
  ];

  const alertDistribution = [
    { name: "High", value: 5 },
    { name: "Medium", value: 8 },
    { name: "Low", value: 12 },
  ];

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
        🏥 Predictive Hospital Management AI
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-gray-500">Total Patients</h3>
          <p className="text-4xl font-bold text-blue-600">
            {patients.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-gray-500">Active Alerts</h3>
          <p className="text-4xl font-bold text-red-600">
            {alerts.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-gray-500">Critical Patients</h3>
          <p className="text-4xl font-bold text-red-700">
            {
              patients.filter(
                (p) => p.riskLevel === "High"
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-gray-500">AI Accuracy</h3>
          <p className="text-4xl font-bold text-green-600">
            96.4%
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
            <LineChart data={distressTrend}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
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
                data={alertDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {alertDistribution.map((entry, index) => (
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
            <p className="font-semibold text-red-700">
              {alert.type}
            </p>

            <p>
              Patient: {alert.patientName}
            </p>

            <p className="text-sm text-gray-500">
              {alert.timestamp}
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
                    {p.name}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${riskColor}`}
                  >
                    {p.riskLevel}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <p>
                    ❤️ Heart Rate: {p.heartRate}
                  </p>

                  <p>
                    🫁 Respiration Rate: {p.respirationRate}
                  </p>

                  <p>
                    🤧 Cough Score: {p.coughScore}
                  </p>

                  <p>
                    ⚠️ Distress Score: {p.distressScore}
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