import { useState, useEffect } from "react";
import axios from "axios";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  // update filtered list when alert data or filter changes
  useEffect(() => {
    const lower = filter.toLowerCase();
    setFilteredAlerts(
      alerts.filter(
        (a) =>
          a.patientName.toLowerCase().includes(lower) ||
          a.type.toLowerCase().includes(lower)
      )
    );
  }, [filter, alerts]);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("/api/alerts"); // adjust if needed
      setAlerts(res.data || []);
    } catch (err) {
      console.error("Alert fetch failed:", err);
    }
  };

  const severityColors = {
    High: "bg-red-200 border-red-400 text-red-800",
    Medium: "bg-yellow-200 border-yellow-400 text-yellow-800",
    Low: "bg-green-200 border-green-400 text-green-800",
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Patient Alerts</h1>

      {/* Search & Stats */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by patient or type..."
          className="w-full md:w-1/3 p-3 border rounded-lg bg-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <div className="flex gap-4">
          {/* Quick severity counts */}
          {["High", "Medium", "Low"].map((sev) => (
            <div
              key={sev}
              className={`px-4 py-2 rounded-lg font-semibold ${
                severityColors[sev]
              }`}
            >
              {sev} Alerts:{" "}
              {alerts.filter((a) => a.severity === sev).length}
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Summary */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <p className="text-gray-500 text-center mt-16">
            No alerts found.
          </p>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert._id}
              className={`border-l-4 p-4 rounded-lg shadow-sm ${
                severityColors[alert.severity] || ""
              }`}
            >
              {/* Alert Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{alert.type}</h2>
                <span className="text-sm text-gray-600">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </div>

              {/* Alert Body */}
              <p className="mt-2 text-gray-700">
                Patient: <span className="font-semibold">{alert.patientName}</span>
              </p>
              <p className="text-gray-600 text-sm">{alert.message}</p>

              {/* Optional action buttons */}
              <div className="mt-3 flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Acknowledge
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                  Dismiss
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
