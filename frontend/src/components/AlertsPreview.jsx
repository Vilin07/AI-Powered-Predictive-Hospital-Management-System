import React from "react";

export default function AlertsOverview() {
  return (
    <>
      {/* ALERTS OVERVIEW SECTION */}
      <section className="w-full py-24 bg-gray-100" id="alerts">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Video */}
          <div className="w-full lg:w-1/2">
            <video
              className="w-full h-[550px] rounded-2xl shadow-xl border border-gray-300 object-cover"
              autoPlay
              loop
              muted
              playsInline
              src="/Alerts.mp4"
            />
          </div>

          {/* Right: Alert Info */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              AI-Driven Patient Alerts
            </h2>

            <p className="text-gray-700 text-lg max-w-lg leading-relaxed">
              The monitoring engine continuously analyzes patient signals —
              facial tension, breathing stability, cough frequency, and posture patterns.  
              When it detects any abnormal trend, it instantly generates alerts
              to help hospital staff take quick action.
            </p>

            {/* ALERT BOXES (NO ICONS) */}
            <div className="space-y-4 mt-6">

              {/* Facial Distress */}
              <div className="
                flex items-center justify-between p-5 rounded-2xl shadow-md border 
                bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200
                hover:scale-[1.03] transition-all duration-300
              ">
                <div>
                  <p className="font-semibold text-lg text-gray-900">Facial Distress</p>
                  <p className="text-sm text-gray-600">Moderate</p>
                </div>

                {/* Minimalistic Status Signal */}
                <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-inner"></div>
              </div>

              {/* Breathing Irregularity */}
              <div className="
                flex items-center justify-between p-5 rounded-2xl shadow-md border 
                bg-gradient-to-r from-red-50 to-red-100 border-red-200
                hover:scale-[1.03] transition-all duration-300
              ">
                <div>
                  <p className="font-semibold text-lg text-gray-900">Breathing Irregularity</p>
                  <p className="text-sm text-gray-600">High</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-red-500 shadow-inner"></div>
              </div>

              {/* Cough Frequency */}
              <div className="
                flex items-center justify-between p-5 rounded-2xl shadow-md border 
                bg-gradient-to-r from-pink-50 to-pink-100 border-pink-200
                hover:scale-[1.03] transition-all duration-300
              ">
                <div>
                  <p className="font-semibold text-lg text-gray-900">Cough Frequency</p>
                  <p className="text-sm text-gray-600">High</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-pink-500 shadow-inner"></div>
              </div>

              {/* Posture Deviation */}
              <div className="
                flex items-center justify-between p-5 rounded-2xl shadow-md border 
                bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200
                hover:scale-[1.03] transition-all duration-300
              ">
                <div>
                  <p className="font-semibold text-lg text-gray-900">Posture Deviation</p>
                  <p className="text-sm text-gray-600">Moderate</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-inner"></div>
              </div>

            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                className="
                  px-8 py-3 rounded-full font-semibold text-white text-lg
                  bg-gradient-to-r from-indigo-600 to-fuchsia-500
                  shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300
                "
              >
                Explore Full Alerts →
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
