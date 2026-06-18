    import React from "react";

    export default function HeroSection() {
    return (
        <div className="relative h-screen w-full overflow-hidden">

        {/* Background video */}
        <video
            className="absolute top-0 left-0 w-full h-full object-cover blur-2px brightness-90"
            autoPlay
            loop
            muted
            playsInline
        >
            <source src="/AI_video.mp4" type="video/mp4" />
        </video>

        {/* Overlay Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fadeIn">
            Predictive Hospital Management AI
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl animate-fadeIn delay-200">
            Real-time patient distress detection using AI — ensuring faster triage, early risk
            identification, and saving lives before it’s too late.
            </p>

            <div className="mt-8 flex gap-6 animate-fadeIn delay-300">
            <button className="px-6 py-3 rounded-full font-semibold text-slate-200 
                    bg-gradient-to-r from-indigo-800 to-fuchsia-600 
                    shadow-[0_0_15px_rgba(139,92,246,0.4)] 
                    transition-all duration-300 
                    hover:scale-105 hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] 
                    hover:text-white">
                Start Monitoring
            </button>

            {/* <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full border border-white/40 backdrop-blur-lg">
                Dashboard Demo
            </button> */}
            </div>
        </div>

        {/* Optional dark overlay (for contrast) */}
        <div className="absolute inset-0 bg-black/30 z-[5]"></div>
        </div>
    );
    }
