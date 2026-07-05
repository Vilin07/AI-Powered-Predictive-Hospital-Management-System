import React from "react";
import { useEffect, useState } from "react";
import { getDashboardAnalytics } from "../api/dashboardApi";



export default function Analytics() {

const [dashboard, setDashboard] = useState(null);

useEffect(() => {

    const fetchDashboard = async () => {

        try {

            const data = await getDashboardAnalytics();

            setDashboard(data);

        } catch (err) {

            console.error(err);

        }

    };

    fetchDashboard();

}, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-28 pb-20 px-6 md:px-16">

      {/* PAGE HEADER */}
      <div className="max-w-7xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          AI Analytics & Intelligence
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">
          Action-oriented analytics designed to help hospital teams understand
          patient deterioration patterns, alert causes, and short-term risk trends
          with AI-driven clarity.
        </p>
      </div>

{/* ================= HOSPITAL OVERVIEW ================= */}

<div className="max-w-7xl mx-auto mb-16">

  <div className="flex items-center justify-between mb-8">

    <div>

      <h2 className="text-3xl font-bold text-slate-900">
        Hospital AI Overview
      </h2>

      <p className="text-gray-500 mt-2">
        Real-time operational intelligence powered by AI.
      </p>

    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3">

      <p className="text-sm text-gray-500">
        Last Analysis
      </p>

      <p className="font-semibold text-blue-700">
        Just Now
      </p>

    </div>

  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

    {/* Health Index */}

    <div className="bg-white rounded-2xl shadow-md border p-6">

      <p className="text-gray-500 text-sm">
        Hospital Health Index
      </p>

      <h2 className="text-4xl font-bold mt-3 text-green-600">
        84%
      </h2>

      <p className="text-sm text-green-600 mt-3">
        ▲ +6% from previous hour
      </p>

    </div>

    {/* Critical */}

    <div className="bg-white rounded-2xl shadow-md border p-6">

      <p className="text-gray-500 text-sm">
        Critical Patients
      </p>

      <h2 className="text-4xl font-bold mt-3 text-red-600">
        3
      </h2>

      <p className="text-sm text-gray-500 mt-3">
        Immediate attention required
      </p>

    </div>

    {/* Alerts */}

    <div className="bg-white rounded-2xl shadow-md border p-6">

      <p className="text-gray-500 text-sm">
        Active AI Alerts
      </p>

      <h2 className="text-4xl font-bold mt-3 text-yellow-600">
        7
      </h2>

      <p className="text-sm text-gray-500 mt-3">
        Live monitoring enabled
      </p>

    </div>

    {/* Confidence */}

    <div className="bg-white rounded-2xl shadow-md border p-6">

      <p className="text-gray-500 text-sm">
        AI Confidence
      </p>

      <h2 className="text-4xl font-bold mt-3 text-blue-600">
        94%
      </h2>

      <p className="text-sm text-gray-500 mt-3">
        High prediction reliability
      </p>

    </div>

    {/* Accuracy */}

    <div className="bg-white rounded-2xl shadow-md border p-6">

      <p className="text-gray-500 text-sm">
        Prediction Accuracy
      </p>

      <h2 className="text-4xl font-bold mt-3 text-indigo-600">
        96%
      </h2>

      <p className="text-sm text-gray-500 mt-3">
        Based on recent observations
      </p>

    </div>

  </div>

</div>

      {/* SECTION 2: BEHAVIORAL DEVIATION TIMELINE */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Patient Behavioral Deviation Timeline
          </h2>

          <div className="space-y-4">
            {[
              "Facial stress levels have gradually increased over the last monitoring window",
              "Breathing pattern irregularity detected intermittently",
              "Cough frequency exceeded baseline for multiple patients",
              "Posture instability observed during resting phases",
            ].map((text, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gray-50 border text-gray-700 text-sm"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: ALERT INTELLIGENCE */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Alert Intelligence & Root Cause Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "High Severity Alert",
                details: [
                  "Facial distress score crossed safety threshold",
                  "Breathing variance increased by 37%",
                  "Multiple cough events detected in short duration",
                ],
              },
              {
                title: "Moderate Severity Alert",
                details: [
                  "Posture deviation sustained beyond baseline",
                  "Irregular breathing detected intermittently",
                ],
              },
            ].map((alert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gray-50 border"
              >
                <h3 className="font-semibold text-gray-900 mb-3">
                  {alert.title}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {alert.details.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

     {/* ================= AI RISK PREDICTION CENTER ================= */}
<div className="max-w-7xl mx-auto mb-16">

    <h2 className="text-3xl font-bold text-slate-900 mb-3">
        Patients Requiring Immediate Attention
    </h2>

    <p className="text-gray-500 mb-8">
        AI continuously ranks patients based on real-time distress analysis.
    </p>

    <div className="grid lg:grid-cols-2 gap-6">

        {dashboard?.highRiskPatients?.map((patient) => (

            <div
                key={patient.patientId}
                className="bg-white rounded-3xl border shadow-md p-7 hover:shadow-lg transition"
            >

                <div className="flex justify-between">

                    <div>

                        <h3 className="text-2xl font-bold">
                            {patient.patientId}
                        </h3>

                        <p className="text-gray-500">
                            Live AI Monitoring
                        </p>

                    </div>

                    <span
                        className={`px-4 py-2 rounded-full font-semibold ${
                            patient.riskLevel === "High"
                                ? "bg-red-100 text-red-700"
                                : patient.riskLevel === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                        }`}
                    >
                        {patient.riskLevel}
                    </span>

                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">

                    <div>

                        <p className="text-gray-500 text-sm">
                            Distress
                        </p>

                        <p className="text-2xl font-bold">
                            {patient.distressScore}
                        </p>

                    </div>

                    <div>

                        <p className="text-gray-500 text-sm">
                            Heart Rate
                        </p>

                        <p className="text-2xl font-bold">
                            {patient.heartRate}
                        </p>

                    </div>

                    <div>

                        <p className="text-gray-500 text-sm">
                            Respiration
                        </p>

                        <p className="text-2xl font-bold">
                            {patient.respirationRate}
                        </p>

                    </div>

                </div>

                <div className="mt-8">

                    <h4 className="font-semibold mb-2">
                        AI Detected
                    </h4>

                    <ul className="space-y-2 text-gray-600">

                        {patient.fallRisk === "High" && (
                            <li>• High Fall Risk</li>
                        )}

                        {patient.drowsyStatus === "DROWSY ⚠️" && (
                            <li>• Drowsiness Detected</li>
                        )}

                        {patient.heartRate > 100 && (
                            <li>• Elevated Heart Rate</li>
                        )}

                        {patient.respirationRate > 24 && (
                            <li>• High Respiration Rate</li>
                        )}

                    </ul>

                </div>

            </div>

        ))}

    </div>

</div>

      {/* SECTION 5: AI TRUST & DATA RELIABILITY */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            AI Trust & Data Reliability
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              "Camera Feed Quality: High",
              "Audio Signal Clarity: Stable",
              "Missing Frames: None",
              "Model Confidence: Strong",
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-gray-50 border text-sm text-gray-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
