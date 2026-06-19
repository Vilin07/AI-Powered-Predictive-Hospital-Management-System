import Webcam from "react-webcam";
import { useState, useEffect } from "react";

export default function LiveMonitoring() {
  const [distressScore, setDistressScore] = useState(65);
  const [heartRate, setHeartRate] = useState(92);
  const [respirationRate, setRespirationRate] = useState(19);
  const [cameraStatus, setCameraStatus] = useState("Connecting...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDistressScore(Math.floor(Math.random() * 100));
      setHeartRate(Math.floor(Math.random() * 40) + 70);
      setRespirationRate(Math.floor(Math.random() * 10) + 15);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getRiskLevel = () => {
    if (distressScore >= 75)
      return {
        label: "High Risk",
        color: "bg-red-100 text-red-700",
      };

    if (distressScore >= 40)
      return {
        label: "Medium Risk",
        color: "bg-yellow-100 text-yellow-700",
      };

    return {
      label: "Low Risk",
      color: "bg-green-100 text-green-700",
    };
  };

  const risk = getRiskLevel();

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        📹 AI Patient Monitoring
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Webcam Feed */}
        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            Live Camera Feed
          </h2>

          <Webcam
            audio={false}
            mirrored={true}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user",
            }}
            onUserMedia={() =>
              setCameraStatus("✅ Camera Connected")
            }
            onUserMediaError={() =>
              setCameraStatus("❌ Camera Permission Denied")
            }
            className="rounded-xl w-full"
          />

          <div className="mt-4 p-3 bg-slate-100 rounded-lg">
            <strong>Status:</strong> {cameraStatus}
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            AI Analysis
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-green-100 rounded-lg">
              😊 Facial Expression: Normal
            </div>

            <div className="p-4 bg-blue-100 rounded-lg">
              ❤️ Heart Rate: {heartRate} bpm
            </div>

            <div className="p-4 bg-yellow-100 rounded-lg">
              🫁 Respiration Rate: {respirationRate}/min
            </div>

            <div className="p-4 bg-red-100 rounded-lg">
              ⚠️ Distress Score: {distressScore}/100
            </div>

            <div className="p-4 bg-purple-100 rounded-lg">
              🤧 Cough Count: 4
            </div>

            <div className={`p-4 rounded-lg font-bold ${risk.color}`}>
              🚑 Risk Level: {risk.label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}