import React from "react";

export default function Analytics() {
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

      {/* SECTION 1: SITUATION OVERVIEW */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Current Hospital Situation Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 rounded-2xl bg-gray-50 border">
              <p className="text-sm text-gray-500">Overall Risk Level</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">Moderate</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border">
              <p className="text-sm text-gray-500">Active AI Alerts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border">
              <p className="text-sm text-gray-500">AI Confidence</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">92%</p>
            </div>
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

      {/* SECTION 4: SHORT-TERM RISK PREDICTION */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Short-Term Risk Prediction (Next 30 Minutes)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { ward: "ICU Ward", risk: "High Risk" },
              { ward: "General Ward", risk: "Moderate Risk" },
              { ward: "OPD Area", risk: "Stable" },
            ].map((zone, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gray-50 border"
              >
                <p className="text-sm text-gray-500">{zone.ward}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  {zone.risk}
                </p>
              </div>
            ))}
          </div>
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
