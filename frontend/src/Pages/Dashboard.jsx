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

import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";


export default function Dashboard() {
const [analytics, setAnalytics] = useState(null);
const [patients, setPatients] = useState([]);
const [alerts, setAlerts] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [riskFilter, setRiskFilter] = useState("All Risk Levels");
const [selectedPatient, setSelectedPatient] = useState(null);


  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchDashboard();
  }, []);

useEffect(() => {
  socket.on("connect", () => {
    console.log("✅ Dashboard Connected");
    console.log(socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Dashboard Disconnected");
  });

  return () => {
    socket.off("connect");
    socket.off("disconnect");
  };
}, []);

useEffect(() => {
  socket.on("liveVitalsUpdated", async (data) => {

    console.log("==================================");
    console.log("📡 Dashboard received");
    console.log(data);

    const vitalsData = await getLiveVitals();

    console.log("Fresh Data From API");
    console.log(vitalsData);

    setPatients(vitalsData);

    console.log("==================================");

    const analyticsData = await getDashboardAnalytics();
    const alertsData = await getAlerts();

    setAnalytics(analyticsData);
    setAlerts(alertsData);
    setLoading(false);

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
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">

    <div className="flex items-center justify-between">

        <div>

            <h1 className="text-3xl font-bold text-slate-800">
                Predictive Hospital Management AI
            </h1>

            <p className="text-gray-500 mt-1">
                Real-Time Patient Monitoring Dashboard
            </p>

        </div>

        <div className="text-right">

            <p className="text-sm text-gray-500">
                System Status
            </p>

            <div className="flex items-center justify-end gap-2 mt-1">

                <span className="w-3 h-3 rounded-full bg-green-500"></span>

                <span className="font-semibold text-green-700">
                    Connected
                </span>

            </div>

            <p className="text-xs text-gray-400 mt-2">
                Last Updated
            </p>

            <p className="text-sm font-medium text-gray-700">
                {new Date().toLocaleTimeString()}
            </p>

        </div>

    </div>

</div>

      
{/* KPI Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

    {/* Total Patients */}

    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

        <p className="text-sm uppercase tracking-wide text-gray-500">
            Total Patients
        </p>

        <h2 className="text-4xl font-bold text-slate-800 mt-3">
            {analytics?.totalPatients || 0}
        </h2>

        <p className="text-sm text-gray-400 mt-4">
            Registered Patients
        </p>

    </div>

    {/* Active Alerts */}

    <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6">

        <p className="text-sm uppercase tracking-wide text-gray-500">
            Active Alerts
        </p>

        <h2 className="text-4xl font-bold text-red-600 mt-3">
            {analytics?.activeAlerts || 0}
        </h2>

        <p className="text-sm text-red-500 mt-4">
            Requires Immediate Attention
        </p>

    </div>

    {/* Critical Patients */}

    <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-6">

        <p className="text-sm uppercase tracking-wide text-gray-500">
            Critical Patients
        </p>

        <h2 className="text-4xl font-bold text-orange-600 mt-3">
            {analytics?.criticalPatients || 0}
        </h2>

        <p className="text-sm text-orange-500 mt-4">
            High Priority Monitoring
        </p>

    </div>

    {/* AI Accuracy */}

    <div className="bg-white rounded-xl border border-green-200 shadow-sm p-6">

        <p className="text-sm uppercase tracking-wide text-gray-500">
            AI Accuracy
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-3">
            96.4%
        </h2>

        <p className="text-sm text-green-500 mt-4">
            Latest Model Performance
        </p>

    </div>

    {/* Average Heart Rate */}

    <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6">

        <p className="text-sm uppercase tracking-wide text-gray-500">
            Average Heart Rate
        </p>

        <h2 className="text-4xl font-bold text-red-500 mt-3">
            {analytics?.averageHeartRate} bpm
        </h2>

        <p className="text-sm text-gray-400 mt-4">
            Current Average
        </p>

    </div>

    {/* Average Respiration */}

    <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">

        <p className="text-sm uppercase tracking-wide text-gray-500">
            Average Respiration
        </p>

        <h2 className="text-4xl font-bold text-blue-500 mt-3">
            {analytics?.averageRespirationRate}/min
        </h2>

        <p className="text-sm text-gray-400 mt-4">
            Current Average
        </p>

    </div>

    {/* Average Distress */}

    <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-6">

        <p className="text-sm uppercase tracking-wide text-gray-500">
            Average Distress
        </p>

        <h2 className="text-4xl font-bold text-orange-500 mt-3">
            {analytics?.averageDistressScore}
        </h2>

        <p className="text-sm text-gray-400 mt-4">
            AI Risk Score
        </p>

    </div>

    {/* Online Patients */}

    <div className="bg-white rounded-xl border border-green-200 shadow-sm p-6">

        <p className="text-sm uppercase tracking-wide text-gray-500">
            Online Patients
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-3">
            {analytics?.onlinePatients}
        </h2>

        <p className="text-sm text-gray-400 mt-4">
            Connected Devices
        </p>

    </div>

</div>

      {/* Charts Section */}
     <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">

    <div className="flex items-center justify-between mb-6">

        <div>

            <h2 className="text-2xl font-semibold text-slate-800">
                Patient Analytics
            </h2>

            <p className="text-gray-500 mt-1">
                Live monitoring trends and alert statistics
            </p>

        </div>

    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      
        {/* Distress Trend */}
       <div className="border border-gray-200 rounded-xl p-5">
         <h2 className="text-lg font-semibold text-slate-800 mb-5">
    Distress Trend
</h2>

          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={analytics?.distressTrend || []}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip
    contentStyle={{
        borderRadius: 12,
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
    }}
/>
          <Line
    type="monotone"
    dataKey="value"
    stroke="#2563eb"
    strokeWidth={3}
    dot={false}
    activeDot={{ r: 6 }}
/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Distribution */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-slate-800 mb-5">
    Alert Distribution
</h2>

     <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              
               <Pie
                data={analytics?.alertDistribution || []}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                labelLine={false}
              >
              {analytics?.alertDistribution?.map((entry, index) => (
    <Cell
        key={index}
        fill={COLORS[index % COLORS.length]}
    />
))}
              </Pie>
<Tooltip
    contentStyle={{
        borderRadius: 12,
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
    }}
/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>  

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
           Recent Alerts
        </h2>

        {alerts.slice(0, 3).map((alert) => (
          <div
            key={alert._id}
            className="border border-gray-200 rounded-xl p-5 mb-4 hover:shadow-md transition"
          >
           <p className="font-semibold text-slate-800">
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
<div className="mt-3 inline-flex px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
    {alert.priority}
</div>
</p>

<p className="text-gray-500">
{new Date(alert.createdAt).toLocaleString()}
</p>
          </div>
        ))}
        <div className="mt-5 flex justify-end">
    <button className="px-5 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition">
      View All Alerts
    </button>
  </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">

    <h2 className="text-xl font-semibold text-slate-800 mb-6">
        Patient Status Overview
    </h2>

    {/* Stable */}

    <div className="mb-6">

        <div className="flex justify-between mb-2">

            <span className="font-medium text-gray-700">
                Stable Patients
            </span>

            <span className="text-green-600 font-semibold">
                {patients.filter(p => p.riskLevel === "Low Risk").length}
            </span>

        </div>

        <div className="h-3 bg-gray-200 rounded-full">

            <div
                className="h-3 bg-green-500 rounded-full"
                style={{
                    width: `${patients.length
                        ? (patients.filter(p => p.riskLevel === "Low Risk").length / patients.length) * 100
                        : 0}%`,
                }}
            />

        </div>

    </div>

    {/* Medium */}

    <div className="mb-6">

        <div className="flex justify-between mb-2">

            <span className="font-medium text-gray-700">
                Medium Risk
            </span>

            <span className="text-yellow-600 font-semibold">
                {patients.filter(p => p.riskLevel === "Medium Risk").length}
            </span>

        </div>

        <div className="h-3 bg-gray-200 rounded-full">

            <div
                className="h-3 bg-yellow-500 rounded-full"
                style={{
                    width: `${patients.length
                        ? (patients.filter(p => p.riskLevel === "Medium Risk").length / patients.length) * 100
                        : 0}%`,
                }}
            />

        </div>

    </div>

    {/* High */}

    <div>

        <div className="flex justify-between mb-2">

            <span className="font-medium text-gray-700">
                High Risk
            </span>

            <span className="text-red-600 font-semibold">
                {patients.filter(p => p.riskLevel === "High Risk").length}
            </span>

        </div>

        <div className="h-3 bg-gray-200 rounded-full">

            <div
                className="h-3 bg-red-500 rounded-full"
                style={{
                    width: `${patients.length
                        ? (patients.filter(p => p.riskLevel === "High Risk").length / patients.length) * 100
                        : 0}%`,
                }}
            />

        </div>

    </div>

</div>

    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <p className="text-sm text-gray-500 uppercase">
            Stable
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-2">
            {patients.filter(p => p.riskLevel === "Low Risk").length}
        </h2>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <p className="text-sm text-gray-500 uppercase">
            Medium Risk
        </p>

        <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            {patients.filter(p => p.riskLevel === "Medium Risk").length}
        </h2>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <p className="text-sm text-gray-500 uppercase">
            High Risk
        </p>

        <h2 className="text-4xl font-bold text-red-600 mt-2">
            {patients.filter(p => p.riskLevel === "High Risk").length}
        </h2>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <p className="text-sm text-gray-500 uppercase">
            Active Monitoring
        </p>

        <h2 className="text-4xl font-bold text-blue-600 mt-2">
            {patients.length}
        </h2>
    </div>

</div>

<div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">

    <div className="flex justify-between items-center mb-6">

        <div>

            <h2 className="text-xl font-semibold text-slate-800">
                Recent Activity
            </h2>

            <p className="text-gray-500 text-sm mt-1">
                Latest system events and patient updates
            </p>

        </div>

    </div>

    <div className="space-y-4">

        {alerts.slice(0,2).map((alert)=>(

            <div
                key={alert._id}
                className="flex justify-between items-start border-l-4 border-blue-600 pl-4 py-2"
            >

                <div>

                    <h3 className="font-semibold text-slate-800">
                        {alert.type}
                    </h3>

                    <p className="text-gray-600 text-sm">
                        {alert.patientId}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                        {alert.message}
                    </p>

                </div>

                <span className="text-xs text-gray-400 whitespace-nowrap">

                    {new Date(alert.createdAt).toLocaleTimeString()}

                </span>

            </div>

        ))}

    </div>

</div>

      {/* Live Patient Status */}
      <div>
     <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

    <div>

        <h2 className="text-2xl font-semibold text-slate-800">
            Live Patient Monitoring
        </h2>

        <p className="text-gray-500 mt-1">
            Real-time patient vitals and AI observations
        </p>

    </div>

    <div className="flex gap-3">

        <input
    type="text"
    placeholder="Search Patient ID..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

        <select
    value={riskFilter}
    onChange={(e) => setRiskFilter(e.target.value)}
    className="border border-gray-300 rounded-lg px-4 py-2"
>

            <option>All Patients</option>
            <option>Low Risk</option>
            <option>Medium Risk</option>
            <option>High Risk</option>

        </select>

    </div>

</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {console.log("Dashboard Patients:", patients)}
         {patients
.filter((p) => {

    const searchMatch =
        p.patientId
            .toLowerCase()
            .includes(search.toLowerCase());

    const riskMatch =
        riskFilter === "All Risk Levels"
            ? true
            : p.riskLevel === riskFilter;

    return searchMatch && riskMatch;

})
.map((p) => {
            const riskColor =
              p.riskLevel === "High"
                ? "bg-red-200 text-red-800"
                : p.riskLevel === "Medium"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800";

            return (
          <div
    key={`${p.patientId}-${p.lastUpdated}`}
    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
>

    {/* Header */}

    <div className="border-b border-gray-200 p-5 flex justify-between items-center">

        <div>

            <p className="text-sm text-gray-500">
                Patient ID
            </p>

            <h2 className="text-2xl font-bold text-slate-800">
                {p.patientId}
            </h2>

        </div>

        <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${riskColor}`}
        >
            {p.riskLevel}
        </span>

    </div>

    {/* Vitals */}

    <div className="grid grid-cols-2 gap-5 p-5">

        <div>

            <p className="text-gray-500 text-sm">
                Heart Rate
            </p>

            <h3 className="text-xl font-semibold mt-1">
                {p.heartRate}
                <span className="text-sm text-gray-400 ml-1">
                    bpm
                </span>
            </h3>

        </div>

        <div>

            <p className="text-gray-500 text-sm">
                Respiration
            </p>

            <h3 className="text-xl font-semibold mt-1">
                {p.respirationRate}
                <span className="text-sm text-gray-400 ml-1">
                    /min
                </span>
            </h3>

        </div>

        <div>

            <p className="text-gray-500 text-sm">
                Distress Score
            </p>

            <h3 className="text-xl font-semibold mt-1">
                {p.distressScore}
            </h3>

        </div>

        <div>

            <p className="text-gray-500 text-sm">
                Fall Risk
            </p>

            <h3 className="text-xl font-semibold mt-1">
                {p.fallRisk}
            </h3>

        </div>

    </div>

    {/* Observation */}

    <div className="border-t border-gray-200 p-5">

        <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">

            Observation

        </h3>

        <div className="grid grid-cols-2 gap-y-3">

            <p className="text-gray-600">
                Eye Status
            </p>

            <p className="font-medium">
                {p.eyeStatus}
            </p>

            <p className="text-gray-600">
                Body Position
            </p>

            <p className="font-medium">
                {p.bodyStatus}
            </p>

            <p className="text-gray-600">
                Drowsiness
            </p>

            <p className="font-medium">
                {p.drowsyStatus}
            </p>

            <p className="text-gray-600">
                Cough Count
            </p>

            <p className="font-medium">
                {p.coughCount}
            </p>

        </div>

    </div>

    {/* Recommendation */}

   <div className="border-t border-gray-200 bg-gray-50 p-5">

        <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">

            Recommendation

        </p>

        <p className="text-slate-700">

            {p.recommendation}

        </p>

    </div>

    {/* Footer */}

    <div className="border-t border-gray-200 p-5 flex justify-between items-center">

        <div>

            <p className="text-xs text-gray-400">

                Last Updated

            </p>

            <p className="text-sm font-medium">

                {new Date(p.lastUpdated).toLocaleTimeString()}

            </p>

        </div>

    <button
    onClick={() => setSelectedPatient(p)}
    className="bg-slate-800 text-white px-5 py-2 rounded-lg hover:bg-slate-700 transition"
>
    View Details
</button>

    </div>

</div>
            );
          })}
        </div>
      </div>
    {selectedPatient && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl shadow-xl w-[700px] max-w-[95%]">

        <div className="border-b p-6 flex justify-between items-center">

            <div>

                <h2 className="text-2xl font-bold text-slate-800">

                    {selectedPatient.patientId}

                </h2>

                <p className="text-gray-500">

                    Patient Information

                </p>

            </div>

            <button
                onClick={() => setSelectedPatient(null)}
                className="text-3xl text-gray-400 hover:text-black"
            >
                ×
            </button>

        </div>

      <div className="p-6">

    {/* Vitals */}

    <h3 className="text-lg font-semibold text-slate-800 mb-5">
        Vital Signs
    </h3>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <div className="bg-slate-50 rounded-xl border p-5 flex flex-col items-center">

    <div className="w-28 h-28">

        <CircularProgressbar

            value={selectedPatient.heartRate}

            maxValue={150}

            text={`${selectedPatient.heartRate}`}

            styles={buildStyles({

                textColor: "#dc2626",

                pathColor: "#dc2626",

                trailColor: "#e5e7eb",

            })}

        />

    </div>

    <h3 className="mt-4 font-semibold">

        Heart Rate

    </h3>

    <p className="text-gray-500 text-sm">

        bpm

    </p>

</div>

    <div className="bg-slate-50 rounded-xl border p-5 flex flex-col items-center">
             <div className="w-28 h-28">

        <CircularProgressbar

            value={selectedPatient.respirationRate}

            maxValue={150}

            text={`${selectedPatient.respirationRate}`}

            styles={buildStyles({
                pathColor:"#2563eb"

            })}

        />

    </div>

            <p className="text-sm text-gray-500">
                Respiration
            </p>

          

            <p className="text-xs text-gray-400">
                /min
            </p>

        </div>

   <div className="bg-slate-50 rounded-xl border p-5 flex flex-col items-center">

    <div className="w-28 h-28">

        <CircularProgressbar

            value={selectedPatient.distressScore}

            maxValue={150}

            text={`${selectedPatient.distressScore}`}

            styles={buildStyles({

                textColor: "#dc2626",

                pathColor: "#dc2626",

                trailColor: "#e5e7eb",

            })}

        />

    </div>

    <h3 className="mt-4 font-semibold">

        Distress Score
    </h3>

    <p className="text-gray-500 text-sm">

        AI Score

    </p>

</div>

        <div className="bg-slate-50 rounded-xl p-4 border">

            <p className="text-sm text-gray-500">
                Risk Level
            </p>

            <h2 className="text-2xl font-bold text-green-600 mt-2">
                {selectedPatient.riskLevel}
            </h2>

        </div>

    </div>

    {/* AI Observation */}

    <h3 className="text-lg font-semibold text-slate-800 mb-5">
        AI Observation
    </h3>

    <div className="grid grid-cols-2 gap-y-4">

        <p className="text-gray-500">
            Eye Status
        </p>

        <p className="font-semibold">
            {selectedPatient.eyeStatus}
        </p>

        <p className="text-gray-500">
            Body Position
        </p>

        <p className="font-semibold">
            {selectedPatient.bodyStatus}
        </p>

        <p className="text-gray-500">
            Drowsiness
        </p>

        <p className="font-semibold">
            {selectedPatient.drowsyStatus}
        </p>

        <p className="text-gray-500">
            Fall Risk
        </p>

        <p className="font-semibold">
            {selectedPatient.fallRisk}
        </p>

        <p className="text-gray-500">
            Cough Count
        </p>

        <p className="font-semibold">
            {selectedPatient.coughCount}
        </p>

    </div>

</div>
        <div className="border-t bg-gray-50 p-6">

        <h3 className="text-lg font-semibold text-slate-800 mb-3">
            AI Recommendation
        </h3>

            <p className="text-gray-700">
                {selectedPatient.recommendation}
            </p>

        </div>

    </div>

</div>

)}  
    </div>
  );
}