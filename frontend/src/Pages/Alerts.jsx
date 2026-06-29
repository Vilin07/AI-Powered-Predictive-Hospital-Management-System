import { useState, useEffect } from "react";
import { getAlerts } from "../api/alertApi";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("Newest");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchAlerts();
  }, []);

useEffect(() => {

    const lower = filter.toLowerCase();

    let filtered = alerts.filter(
        (a) =>
            (a.patientId || "")
                .toLowerCase()
                .includes(lower) ||

            (a.type || "")
                .toLowerCase()
                .includes(lower)
    );

    if (sortBy === "Newest") {
        filtered.sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        );
    }

    if (sortBy === "Oldest") {
        filtered.sort(
            (a, b) =>
                new Date(a.createdAt) -
                new Date(b.createdAt)
        );
    }

    if (severityFilter !== "All") {
    filtered = filtered.filter(
        (a) => a.priority === severityFilter
    );
}

if (statusFilter !== "All") {
    filtered = filtered.filter(
        (a) => (a.status || "Open") === statusFilter
    );
}


    setFilteredAlerts(filtered);

}, [
    filter,
    alerts,
    sortBy,
    severityFilter,
    statusFilter,
]);

 const fetchAlerts = async () => {
    try {

       const data = await getAlerts();

        const alertsWithStatus = data.map(alert => ({
          ...alert,
           status: "Open",
        }));

setAlerts(alertsWithStatus);

console.log(data);

    } catch (err) {

        console.error(err);

    }
};

const acknowledgeAlert = (id) => {

    setAlerts(prev =>
        prev.map(alert =>
            alert._id === id
                ? { ...alert, status: "Acknowledged" }
                : alert
        )
    );
    setToast({
    type: "success",
    message: "Alert Acknowledged Successfully",
});

setTimeout(() => {
    setToast(null);
}, 3000);

};

const resolveAlert = (id) => {

    setAlerts(prev =>
        prev.map(alert =>
            alert._id === id
                ? { ...alert, status: "Resolved" }
                : alert
        )
    );
    setToast({
    type: "success",
    message: "Alert Resolved Successfully",
});

setTimeout(() => {
    setToast(null);
}, 3000);

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
            {alerts.filter(a => a.priority === "High").length}
        </h2>
    </div>

    <div className="bg-white border border-yellow-200 rounded-xl p-5 shadow-sm">
        <p className="text-sm text-gray-500 uppercase">
            Medium Severity
        </p>

        <h2 className="text-4xl font-bold text-yellow-600 mt-2">
            {alerts.filter(a => a.priority === "Medium").length}
        </h2>
    </div>

    <div className="bg-white border border-green-200 rounded-xl p-5 shadow-sm">
        <p className="text-sm text-gray-500 uppercase">
            Low Severity
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-2">
            {alerts.filter(a => a.priority === "Low").length}
        </h2>
    </div>

</div>

      {/* Search + Stats */}
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">

   <div className="grid md:grid-cols-4 gap-4">

        <input
            type="text"
            placeholder="Search Patient ID or Alert..."
            className="border rounded-lg px-4 py-3"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />

     <select
    value={severityFilter}
    onChange={(e) => setSeverityFilter(e.target.value)}
    className="border rounded-lg px-4 py-3"
>
    <option value="All">All Severity</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
</select>

     <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border rounded-lg px-4 py-3"
>
    <option value="All">All Status</option>
    <option value="Open">Open</option>
    <option value="Acknowledged">Acknowledged</option>
    <option value="Resolved">Resolved</option>
</select>

        <select
           value={sortBy}
           onChange={(e) =>
           setSortBy(e.target.value)
           }
         className="border rounded-lg px-4 py-3"
        >

    <option>Newest</option>

    <option>Oldest</option>

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
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
        </select>

    </div>

</div>

      {/* Alert Cards */}
    <div>

    <div className="flex justify-between items-center mb-5">

        <div>

            <h2 className="text-xl font-semibold text-slate-800">
                Alert Records
            </h2>

            <p className="text-gray-500">
                {filteredAlerts.length} alerts available
            </p>

        </div>

    </div>
   </div> 

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
                        {alert.patientId}
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
                                alert.priority === "High"
                                    ? "bg-red-100 text-red-700"
                                    : alert.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >

                            {alert.priority}

                        </span>

                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">

                        {new Date(alert.createdAt).toLocaleString()}

                    </td>

                    <td className="px-6 py-5">

                       <span
                            className={`px-3 py-1 rounded-full text-sm font-medium

                            ${alert.status === "Open"
                            ? "bg-red-100 text-red-700"
                            : alert.status === "Acknowledged"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"}

                            `}
                        >

                            {alert.status}

                        </span>

                    </td>

                    <td className="px-6 py-5 text-right">

                      <button
                        onClick={() => setSelectedAlert(alert)}
                        className="bg-slate-800 text-white px-5 py-2 rounded-lg hover:bg-slate-700 transition"
                      >
                            View Details
                      </button>

                    </td>

                </tr>

            ))}

        </tbody>

    </table>

</div>

    {selectedAlert && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">

{/* Header */}

<div className="border-b px-8 py-6 flex justify-between items-center">

<div>

<h2 className="text-2xl font-bold">

{selectedAlert.type} Alert

</h2>

<p className="text-gray-500">

Patient {selectedAlert.patientId}

</p>

</div>

<button

onClick={() => setSelectedAlert(null)}

className="text-2xl text-gray-500 hover:text-black"

>

×

</button>

</div>

{/* Body */}

<div className="mt-10 px-2">

    <h3 className="text-xl font-semibold text-slate-800 mb-8">
        AI Investigation Timeline
    </h3>

    <div className="relative ml-8 border-l-2 border-blue-200 pl-8 space-y-8">

        {/* Event 1 */}

        <div className="relative">

            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow"></div>

            <h4 className="font-semibold text-slate-800">
                Heart Rate Threshold Crossed
            </h4>

            <p className="text-gray-600 mt-1">
                Patient heart rate exceeded the safe monitoring range.
            </p>

            <p className="text-sm text-gray-400 mt-2">
                09:31 AM
            </p>

        </div>

        {/* Event 2 */}

        <div className="relative">

            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow"></div>

            <h4 className="font-semibold text-slate-800">
                Facial Distress Increased
            </h4>

            <p className="text-gray-600 mt-1">
                AI detected increased facial stress and fatigue indicators.
            </p>

            <p className="text-sm text-gray-400 mt-2">
                09:32 AM
            </p>

        </div>

        {/* Event 3 */}

        <div className="relative">

            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-red-600 border-4 border-white shadow"></div>

            <h4 className="font-semibold text-red-700">
                Critical Alert Generated
            </h4>

            <p className="text-gray-600 mt-1">
                AI confidence exceeded the critical threshold and generated an emergency alert.
            </p>

            <p className="text-sm text-gray-400 mt-2">
                09:33 AM
            </p>

        </div>

        {selectedAlert.status !== "Open" && (

        <div className="relative">

            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-yellow-500 border-4 border-white shadow"></div>

            <h4 className="font-semibold text-yellow-700">
                Alert Acknowledged
            </h4>

            <p className="text-gray-600 mt-1">
                Nurse acknowledged the alert and initiated patient verification.
            </p>

        </div>

        )}

        {selectedAlert.status === "Resolved" && (

        <div className="relative">

            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-green-600 border-4 border-white shadow"></div>

            <h4 className="font-semibold text-green-700">
                Alert Resolved
            </h4>

            <p className="text-gray-600 mt-1">
                Patient condition stabilized after medical intervention.
            </p>

        </div>

        )}

    </div>

</div>

<div className="overflow-y-auto p-8 flex-1">

<div className="grid grid-cols-2 gap-6">

<div>

<p className="text-sm text-gray-500">

Priority

</p>

<p className="font-semibold">

{selectedAlert.priority}

</p>

</div>

<div>

<p className="text-sm text-gray-500">

Generated

</p>

<p>

{new Date(selectedAlert.createdAt).toLocaleString()}

</p>

</div>

<div>

<p className="text-sm text-gray-500">

Patient ID

</p>

<p>

{selectedAlert.patientId}

</p>

</div>

<div>

<p className="text-sm text-gray-500">

Status

</p>

<p
className={`font-semibold

${
    selectedAlert.status === "Open"
        ? "text-red-600"

        : selectedAlert.status === "Acknowledged"
        ? "text-yellow-600"

        : "text-green-600"
}
`}
>
{selectedAlert.status}
</p>

</div>

</div>

<hr />

<div>

<h3 className="text-lg font-semibold mb-3">

AI Explanation

</h3>

<div className="rounded-xl bg-gray-50 border p-5">

<p>

{selectedAlert.message}

</p>

<ul className="mt-4 space-y-2 text-gray-600">

<li>• AI confidence exceeded alert threshold.</li>

<li>• Patient behaviour deviates from baseline.</li>

<li>• Continuous monitoring recommended.</li>

</ul>

</div>

</div>

<div>

<h3 className="text-lg font-semibold mb-3">

Recommended Clinical Actions

</h3>

<div className="rounded-xl bg-blue-50 border border-blue-200 p-5">

<ul className="space-y-2">

<li>Verify patient condition immediately.</li>

<li>Notify assigned healthcare staff.</li>

<li>Continue live monitoring.</li>

<li>Record intervention in patient history.</li>

</ul>

</div>

</div>

</div>

{/* Footer */}

<div className="border-t px-8 py-5 flex justify-end gap-4">

<button
    onClick={() => {
        acknowledgeAlert(selectedAlert._id);

        setSelectedAlert({
            ...selectedAlert,
            status: "Acknowledged",
        });
    }}
    disabled={selectedAlert.status !== "Open"}
    className={`px-5 py-2 rounded-lg border transition

    ${
        selectedAlert.status !== "Open"
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100"
    }
    `}
>
    {selectedAlert.status === "Acknowledged"
        ? "✓ Acknowledged"
        : "Acknowledge"}
</button>

<button
    onClick={() => {
        resolveAlert(selectedAlert._id);

        setSelectedAlert({
            ...selectedAlert,
            status: "Resolved",
        });
    }}
    disabled={selectedAlert.status === "Resolved"}
    className={`px-5 py-2 rounded-lg text-white transition

    ${
        selectedAlert.status === "Resolved"
            ? "bg-green-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
    }
    `}
>
    {selectedAlert.status === "Resolved"
        ? "✓ Resolved"
        : "Resolve"}
</button>

<button

onClick={() => setSelectedAlert(null)}

className="px-5 py-2 rounded-lg bg-slate-800 text-white"

>

Close

</button>

</div>

</div>

</div>

)}

{toast && (

<div className="fixed top-6 right-6 z-100">

    <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-pulse">

        <div className="font-semibold">

            ✔ {toast.message}

        </div>

    </div>

</div>

)}

    </div>
  );
}