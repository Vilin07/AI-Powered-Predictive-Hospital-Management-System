import Webcam from "react-webcam";
import { useState, useEffect, useRef } from "react";

import {
  loadFaceDetector,
  detectFaces,
} from "../ai/faceDetection";

import {
  calculateDistressScore,
  getRiskLevel,
} from "../ai/distressEngine";

export default function LiveMonitoring() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [distressScore, setDistressScore] = useState(0);
  const [heartRate, setHeartRate] = useState(92);
  const [respirationRate, setRespirationRate] = useState(19);

  const [cameraStatus, setCameraStatus] =
    useState("Connecting...");

  const [aiStatus, setAiStatus] =
    useState("Loading AI Models...");

  const [faces, setFaces] = useState([]);

  // -----------------------------
  // Simulated Vitals
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(
        Math.floor(Math.random() * 40) + 70
      );

      setRespirationRate(
        Math.floor(Math.random() * 10) + 15
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // -----------------------------
  // Load Face Detector
  // -----------------------------
  useEffect(() => {
    const initializeAI = async () => {
      try {
        await loadFaceDetector();

        setAiStatus(
          "Face Detector Loaded Successfully"
        );
      } catch (error) {
        console.error(error);

        setAiStatus(
          "Failed To Load Face Detector"
        );
      }
    };

    initializeAI();
  }, []);

  // -----------------------------
  // Draw Face Boxes
  // -----------------------------
  const drawFaces = (faces) => {
    const canvas = canvasRef.current;
    const video = webcamRef.current?.video;

    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    faces.forEach((face) => {
      if (
        !face.keypoints ||
        face.keypoints.length === 0
      )
        return;

      const xs = face.keypoints.map(
        (p) => p.x
      );

      const ys = face.keypoints.map(
        (p) => p.y
      );

      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);

      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const faceWidth = maxX - minX;
      const faceHeight = maxY - minY;

      const paddingX = faceWidth * 1.5;
      const paddingY = faceHeight * 2;

      const x = minX - paddingX;
      const y = minY - paddingY;

      const width =
        faceWidth + paddingX * 2;

      const height =
        faceHeight + paddingY * 2;

      // Draw Face Rectangle
      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 3;

      ctx.strokeRect(
        x,
        y,
        width,
        height
      );

      // Label
      ctx.fillStyle = "#00FF00";
      ctx.font = "18px Arial";

      ctx.fillText(
        "Patient",
        x,
        y - 10
      );

      // Draw Keypoints
      face.keypoints.forEach((point) => {
        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          4,
          0,
          2 * Math.PI
        );

        ctx.fill();
      });
    });
  };

  // -----------------------------
  // Face Detection Loop
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(async () => {
      const video = webcamRef.current?.video;

      if (
        video &&
        video.readyState === 4 &&
        video.videoWidth > 0
      ) {
        const detectedFaces =
          await detectFaces(video);

        setFaces(detectedFaces);

        drawFaces(detectedFaces);

        const score =
          calculateDistressScore(
            detectedFaces.length
          );

        setDistressScore(score);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const risk =
    getRiskLevel(distressScore);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        AI Patient Monitoring Dashboard
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Camera Feed */}
        <div className="bg-black p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Live Camera Feed
          </h2>

          <div className="relative w-full ">

            <Webcam
              ref={webcamRef}
              audio={false}
              mirrored={true}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user",
              }}
              onUserMedia={() =>
                setCameraStatus(
                  "Camera Connected"
                )
              }
              onUserMediaError={() =>
                setCameraStatus(
                  "Camera Permission Denied"
                )
              }
              className="rounded-xl w-full border border-slate-300"
            />

            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 999,
                pointerEvents: "none",
              }}
            />

          </div>

          <div className="mt-4 p-3 rounded-lg bg-slate-50 border">
            <strong>Camera Status:</strong>{" "}
            {cameraStatus}
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            AI Analysis
          </h2>

          <div className="space-y-4">

            <div className="p-4 rounded-lg bg-white-50 border border-black-200">
              <strong>AI Status:</strong>{" "}
              {aiStatus}
            </div>

            <div className="p-4 rounded-lg bg-white-50 border border-black-200">
              <strong>Detected Faces:</strong>{" "}
              {faces.length}
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border">
              <strong>Patient Status:</strong>{" "}
              {faces.length > 0
                ? "Patient Detected"
                : "No Patient Detected"}
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border">
              <strong>Heart Rate:</strong>{" "}
              {heartRate} bpm
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border">
              <strong>Respiration Rate:</strong>{" "}
              {respirationRate}/min
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border">
              <strong>Distress Score:</strong>{" "}
              {distressScore}/100

              <div className="w-full bg-slate-200 rounded-full h-3 mt-3">
                <div
                  className="h-3 rounded-full bg-red-500 transition-all duration-500"
                  style={{
                    width: `${distressScore}%`,
                  }}
                />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border">
              <strong>Cough Count:</strong> 4
            </div>

            <div
              className={`p-4 rounded-lg border font-semibold ${risk.color}`}
            >
              <strong>Risk Level:</strong>{" "}
              {risk.label}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}