import React from "react";


export default function About() {
  const features = [
    {
      title: "AI-Powered Patient Monitoring",
      description:
        "Real-time face, posture, breathing, and cough analysis powered by TensorFlow.js and MediaPipe. Detects stress, pain, or emergency signals instantly.",
      video: "/AHealthcare.mp4",
    },
    {
      title: "Smart Alert System",
      description:
        "Automatically generates alerts based on abnormal activity, vitals, or distress patterns. Uses severity classification to notify staff instantly.",
      video: "/Healthcare.mp4",
    },
    {
      title: "Interactive Patient Dashboard",
      description:
        "Centralized dashboard for viewing patient conditions, analytics, vitals, and AI-generated insights with historical trends.",
      video: "/Feature.mp4",
    },
    {
      title: "Hospital-Grade Reporting & Analytics",
      description:
        "Generates reports, highlights risky patterns, and builds predictive insights for early intervention and resource optimization.",
      video: "/About.mp4",
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 pt-28 pb-16 px-6 md:px-16">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          About Predictive Hospital Management AI
        </h1>

        {/* Intro Section */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <p className="text-gray-700 text-lg leading-relaxed">
            Our system uses cutting-edge AI models to monitor patients in real-time,
            detect emergencies early, send automated alerts to medical staff, and
            provide dashboards for better hospital decision-making.
          </p>
          <p className="text-gray-600 text-md mt-4">
            Built with <span className="font-semibold">React</span>,
            <span className="font-semibold"> TensorFlow.js</span>,
            <span className="font-semibold"> Node.js</span>,
            <span className="font-semibold"> MediaPipe</span>, and
            <span className="font-semibold"> MongoDB</span>.
          </p>
        </div>

        {/* Feature Videos Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border border-gray-200"
            >
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Video Container */}
              <div className="relative w-full h-56 md:h-64 rounded-xl overflow-hidden shadow-md border border-gray-300">
                <video
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                ></video>
              </div>
            </div>
          ))}
        </div>

        {/* Outro */}
        <div className="max-w-5xl mx-auto text-center mt-20">
          <p className="text-gray-700 text-lg">
            Our mission is to assist medical professionals with AI-driven insights,
            reduce response time, and create a future where hospitals operate with
            predictive intelligence.
          </p>
        </div>
      </div>
    </>
  );
}
