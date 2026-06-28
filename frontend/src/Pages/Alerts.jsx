import { useState, useEffect } from "react";
import { getAlerts } from "../api/alertApi";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
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
    try {

        const data = await getAlerts();

        setAlerts(data);

    } catch (err) {

        console.error(err);

    }
};
  
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Header */}
     

<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">

    <div className="flex justify-between items-center">

        <div>

            <h1 className="text-3xl font-bold text-slate-800">
                Alert Management Center
            </h1>

            <p className="text-gray-500 mt-2">
                Monitor, prioritize and resolve AI-generated patient alerts in real time.
            </p>

        </div>

        

        <div className="text-right">

            <p className="text-sm text-gray-500">
                Total Alerts
            </p>

            <p className="text-4xl font-bold text-slate-800">
                {alerts.length}
            </p>

        </div>

    </div>

</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <p className="text-sm text-gray-500 uppercase">
            Total Alerts
        </p>

        <h2 className="text-4xl font-bold mt-2">
            {alerts.length}
        </h2>
    </div>

    <div className="bg-white border border-red-200 rounded-xl p-5 shadow-sm">
        <p className="text-sm text-gray-500 uppercase">
            High Severity
        </p>

        <h2 className="text-4xl font-bold text-red-600 mt-2">
            {alerts.filter(a => a.severity === "High").length}
        </h2>
    </div>

    <div className="bg-white border border-yellow-200 rounded-xl p-5 shadow-sm">
        <p className="text-sm text-gray-500 uppercase">
            Medium Severity
        </p>

        <h2 className="text-4xl font-bold text-yellow-600 mt-2">
            {alerts.filter(a => a.severity === "Medium").length}
        </h2>
    </div>

    <div className="bg-white border border-green-200 rounded-xl p-5 shadow-sm">
        <p className="text-sm text-gray-500 uppercase">
            Low Severity
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-2">
            {alerts.filter(a => a.severity === "Low").length}
        </h2>
    </div>

</div>

      {/* Search + Stats */}
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">

    <div className="grid md:grid-cols-3 gap-4">

        <input
            type="text"
            placeholder="Search Patient ID or Alert..."
            className="border rounded-lg px-4 py-3"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />

        <select className="border rounded-lg px-4 py-3">

            <option>All Severity</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>

        </select>

        <select className="border rounded-lg px-4 py-3">

            <option>All Status</option>
            <option>Open</option>
            <option>Acknowledged</option>
            <option>Resolved</option>

        </select>

    </div>

</div>
<div className="flex justify-between items-center mb-4">

    <p className="text-sm text-gray-500">
        Showing {Math.min(rowsPerPage, filteredAlerts.length)} of {filteredAlerts.length} alerts
    </p>

    <div className="flex items-center gap-2">

        <span className="text-sm text-gray-500">
            Rows
        </span>

        <select
            value={rowsPerPage}
            onChange={(e) =>
                setRowsPerPage(Number(e.target.value))
            }
            className="border rounded-lg px-3 py-2"
        >
            <option value={5}>5</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
            
        </select>

    </div>

</div>

      {/* Alert Cards */}
     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

    <table className="w-full">

        <thead className="bg-gray-100 border-b">

            <tr>

                <th className="text-left px-6 py-4">Patient</th>

                <th className="text-left px-6 py-4">Alert</th>

                <th className="text-left px-6 py-4">Severity</th>

                <th className="text-left px-6 py-4">Time</th>

                <th className="text-left px-6 py-4">Status</th>

                <th className="text-right px-6 py-4">Action</th>

            </tr>

        </thead>

        <tbody>
          

            {filteredAlerts.slice(0, rowsPerPage).map((alert) => (

                <tr
                    key={alert._id}
                    className="border-b hover:bg-gray-50"
                >

                    <td className="px-6 py-5 font-semibold">
                        {alert.patientName}
                    </td>

                    <td className="px-6 py-5">

                        <p className="font-medium">
                            {alert.type}
                        </p>

                        <p className="text-sm text-gray-500">
                            {alert.message}
                        </p>

                    </td>

                    <td className="px-6 py-5">

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium
                            ${
                                alert.severity === "High"
                                    ? "bg-red-100 text-red-700"
                                    : alert.severity === "Medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >

                            {alert.severity}

                        </span>

                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">

                        {new Date(alert.timestamp).toLocaleString()}

                    </td>

                    <td className="px-6 py-5">

                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                            Open

                        </span>

                    </td>

                    <td className="px-6 py-5 text-right">

                        <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700">

                            View

                        </button>

                    </td>

                </tr>

            ))}

        </tbody>

    </table>

</div>
    </div>
  );
}