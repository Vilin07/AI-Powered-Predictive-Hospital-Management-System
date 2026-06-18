import React from "react";

export default function DashboardPreview() {
  return (
    <>
      {/* PROFESSIONAL FULL-SCREEN DASHBOARD PREVIEW */}
      <section className="w-full py-28 bg-gradient-to-b from-gray-100 to-gray-200" id="dashboard">
        <div className="max-w-7xl mx-auto px-6 text-center">

          {/* Title */}
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Real-Time AI Monitoring Dashboard
          </h2>

          <p className="text-gray-600 text-lg mt-2 max-w-2xl mx-auto leading-relaxed">
            A live AI-powered monitoring system that continuously analyzes facial stress,
            breathing patterns, cough signals, and medical indicators to help hospitals 
            respond faster and more accurately.
          </p>

          {/* Full Glassmorphic Container */}
          <div className="relative mt-20 flex justify-center">
            <div
              className="
                w-full max-w-5xl 
                backdrop-blur-2xl bg-white/25 
                border border-white/40 
                shadow-2xl rounded-3xl 
                p-8 overflow-hidden relative
              "
            >
              {/* Soft Top Glow */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent pointer-events-none rounded-t-3xl"></div>

              {/* Dashboard Video Container */}
              <div className="w-full h-[550px] lg:h-[650px] rounded-2xl overflow-hidden border border-white/40 shadow-xl bg-black/60 flex items-center justify-center">
                <video
                  className="w-full h-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src="/Dashboard.mp4"
                />
              </div>

              {/* Floating Features */}
              <div className="flex justify-center gap-4 flex-wrap mt-8">

                <span className="px-5 py-2 bg-white/70 rounded-full border border-gray-200 shadow text-gray-700 text-sm tracking-wide">
                  AI Facial Expression Tracking
                </span>

                <span className="px-5 py-2 bg-white/70 rounded-full border border-gray-200 shadow text-gray-700 text-sm tracking-wide">
                  Breathing Pattern Monitoring
                </span>

                <span className="px-5 py-2 bg-white/70 rounded-full border border-gray-200 shadow text-gray-700 text-sm tracking-wide">
                  Cough & Sound Detection
                </span>

                <span className="px-5 py-2 bg-white/70 rounded-full border border-gray-200 shadow text-gray-700 text-sm tracking-wide">
                  Distress Score Calculation
                </span>

                <span className="px-5 py-2 bg-white/70 rounded-full border border-gray-200 shadow text-gray-700 text-sm tracking-wide">
                  Real-Time Alerts & Insights
                </span>
                
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="
              mt-14 px-10 py-4 rounded-full
              text-white font-semibold text-lg
              bg-gradient-to-r from-indigo-600 to-fuchsia-500
              shadow-xl hover:shadow-2xl hover:scale-105
              transition-all duration-300
            "
          >
            Open Full Dashboard →
          </button>

        </div>
      </section>
    </>
  );
}
