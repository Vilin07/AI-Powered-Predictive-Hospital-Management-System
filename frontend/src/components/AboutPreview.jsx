import React from "react";
import { useNavigate } from "react-router-dom";

export default function OverviewSection() {
  const navigate = useNavigate(); // 🔥 THIS WAS MISSING

  return (
    <>
      {/* VIDEO SECTION */}
      <section className="w-full bg-gray-50 flex justify-center py-16 px-6">
        <div className="w-full max-w-5xl">
          <video
            className="w-full h-full object-cover rounded-3xl shadow-2xl border border-gray-200"
            src="/About.mp4"
            loop
            controls
            playsInline
          />
        </div>
      </section>

      {/* DESCRIPTION SECTION */}
      <section className="w-full bg-white py-12 px-6 flex justify-center">
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl text-center leading-relaxed">
          <span className="font-semibold text-gray-900">
            Predictive Hospital Management AI
          </span>{" "}
          is an intelligent, real-time monitoring ecosystem designed for modern
          healthcare environments.
          <br /><br />

          Built for accuracy, speed, and patient safety.
          <br /><br />

          <button
            onClick={() => navigate("/Pages/About")}
            className="px-6 py-3 rounded-full font-semibold text-slate-200 
              bg-gradient-to-r from-indigo-800 to-fuchsia-600 
              shadow-[0_0_15px_rgba(139,92,246,0.4)] 
              transition-all duration-300 
              hover:scale-105 hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] 
              hover:text-white"
          >
            Learn more
          </button>
        </p>
      </section>
    </>
  );
}
