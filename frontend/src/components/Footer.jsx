import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#0a0f2c]/95 via-[#120a2a]/95 to-[#1a043a]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-t border-white/10 text-gray-300 pt-16 pb-10 mt-10">
      
      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* BRAND SECTION */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Predictive Hospital AI
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            An AI-powered real-time monitoring system to help hospitals detect emergencies faster using facial analysis, posture detection, breathing evaluation, and instant alerts.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {["Overview", "Dashboard", "Alerts", "About"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-fuchsia-400 transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/vilin-koulgekar-22824331b"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-4 hover:text-fuchsia-400 transition-colors duration-300"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white">
              <svg fill="#0A66C2" width="18" height="18" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.98h4.56V24H.22V8.98zM8.9 8.98h4.37v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V24h-4.56v-7.37c0-1.76-.03-4.03-2.46-4.03-2.47 0-2.85 1.93-2.85 3.9V24H8.9V8.98z" />
              </svg>
            </div>
            <span>LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Vilin07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-fuchsia-400 transition-colors duration-300"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white">
              <svg fill="#181717" width="20" height="20" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.3-1.68-1.3-1.68-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.75.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.12 11.12 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.2.68.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
              </svg>
            </div>
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 mt-14 pt-6">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Predictive Hospital Management AI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
