import { useState, useEffect } from "react";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  useEffect(() => {
    const lower = filter.toLowerCase();

    setFilteredAlerts(
      alerts.filter(
        (a) =>
          (a.patientName || "").toLowerCase().includes(lower) ||
          (a.type || "").toLowerCase().includes(lower)
      )
    );
  }, [filter, alerts]);

  const fetchAlerts = async () => {
    // Demo Data
    const demoAlerts = [
      {
        _id: 1,
        patientName: "Patient 101",
        type: "Breathing Distress",
        severity: "High",
        message: "Abnormal breathing pattern detected",
        timestamp: new Date(),
      },
      {
        _id: 2,
        patientName: "Patient 102",
        type: "Frequent Coughing",
        severity: "Medium",
        message: "Repeated coughing detected",
        timestamp: new Date(),
      },
      {
        _id: 3,
        patientName: "Patient 103",
        type: "Posture Alert",
        severity: "Low",
        message: "Weak posture detected",
        timestamp: new Date(),
      },
    ];

    setAlerts(demoAlerts);
  };

  const severityColors = {
    High: "bg-red-100 border-red-500 text-red-800",
    Medium: "bg-yellow-100 border-yellow-500 text-yellow-800",
    Low: "bg-green-100 border-green-500 text-green-800",
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🚨 Patient Alerts
      </h1>

      {/* Search + Stats */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search patient or alert type..."
          className="border rounded-lg p-3 w-full md:w-96"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <div className="flex gap-3 flex-wrap">
          <div className="bg-red-100 px-4 py-2 rounded-lg font-semibold">
            High: {alerts.filter((a) => a.severity === "High").length}
          </div>

          <div className="bg-yellow-100 px-4 py-2 rounded-lg font-semibold">
            Medium: {alerts.filter((a) => a.severity === "Medium").length}
          </div>

          <div className="bg-green-100 px-4 py-2 rounded-lg font-semibold">
            Low: {alerts.filter((a) => a.severity === "Low").length}
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No alerts found.
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert._id}
              className={`border-l-4 rounded-lg p-4 shadow ${
                severityColors[alert.severity]
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">{alert.type}</h2>

                <span className="text-sm">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </div>

              <p className="mt-2">
                <strong>Patient:</strong> {alert.patientName}
              </p>

              <p className="mt-1">{alert.message}</p>

              <div className="mt-4 flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Acknowledge
                </button>

                <button className="bg-gray-300 px-4 py-2 rounded-lg">
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