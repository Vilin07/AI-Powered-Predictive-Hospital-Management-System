import { useEffect, useState } from "react";
//import { getPatients, getLatestAlerts } from "../utils/api";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auto-refresh system (polls backend every 5 sec)
  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboard = async () => {
    try {
      const patientData = await getPatients();
      const alertData = await getLatestAlerts();

      setPatients(patientData || []);
      setAlerts(alertData || []);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Hospital Dashboard</h1>

      {/* --- Alerts Section --- */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Recent Alerts</h2>

        {alerts.length === 0 ? (
          <p className="text-gray-500">No alerts triggered.</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert._id}
                className="p-4 rounded-xl bg-red-100 border border-red-300"
              >
                <p className="font-semibold text-red-700">
                  ⚠️ {alert.type} Alert for {alert.patientName}
                </p>
                <p className="text-sm text-gray-700">{alert.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Patients Grid --- */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">Live Patient Status</h2>

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
              className="p-5 bg-white shadow-lg rounded-2xl border border-gray-200"
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <span className={`px-3 py-1 text-sm rounded-full ${riskColor}`}>
                  {p.riskLevel}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  <strong>Heart Rate:</strong> {p.heartRate} bpm
                </p>
                <p>
                  <strong>Respiration Rate:</strong> {p.respirationRate}/min
                </p>
                <p>
                  <strong>Cough Score:</strong> {p.coughScore}
                </p>
                <p>
                  <strong>Distress Score:</strong> {p.distressScore}
                </p>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
