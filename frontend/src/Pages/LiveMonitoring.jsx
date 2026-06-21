import Webcam from "react-webcam";
import { useState, useEffect, useRef } from "react";

import {
  loadFaceLandmarker,
  detectFaceLandmarks,
} from "../ai/faceLandmarker";

import {
  calculateDistressScore,
  getRiskLevel,
} from "../ai/distressEngine";

import {
  getEyeAspectRatio,
} from "../ai/eyeDetection";

export default function LiveMonitoring() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [faceCount, setFaceCount] = useState(0);
  const [eyeBlinkScore, setEyeBlinkScore] = useState(0);
  const [jawOpenScore, setJawOpenScore] = useState(0);
  const [distressScore, setDistressScore] = useState(0);
  const [eyeStatus, setEyeStatus] =
  useState("Open");

const [eyeEAR, setEyeEAR] =
  useState(0);

  const [heartRate, setHeartRate] = useState(92);
  const [respirationRate, setRespirationRate] = useState(19);

  const [cameraStatus, setCameraStatus] =
    useState("Connecting...");

  const [aiStatus, setAiStatus] =
    useState("Loading AI Models...");
    const leftEyeIndices = [
  33,
  160,
  158,
  133,
  153,
  144,
];

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

  useEffect(() => {
    const initializeAI = async () => {
      try {
        await loadFaceLandmarker();

        setAiStatus(
          "Face Landmarker Loaded"
        );
      } catch (error) {
        console.error(error);

        setAiStatus(
          "Failed To Load AI Model"
        );
      }
    };

    initializeAI();
  }, []);

const drawFaces = (faces) => {
  const canvas = canvasRef.current;
  const video = webcamRef.current?.video;

  if (!canvas || !video) return;

  const ctx = canvas.getContext("2d");

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  faces.forEach((landmarks) => {
    if (!landmarks?.length) return;

    const xs = landmarks.map(
      (p) => p.x * canvas.width
    );

    const ys = landmarks.map(
      (p) => p.y * canvas.height
    );


    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);

    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const padding = 30;

    // FACE BOX
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 4;

    ctx.strokeRect(
      minX - padding,
      minY - padding,
      maxX - minX + padding * 2,
      maxY - minY + padding * 2
    );

    // LABEL
    ctx.fillStyle = "#00FF00";
    ctx.font = "20px Arial";

    ctx.fillText(
      "Patient",
      minX - padding,
      minY - padding - 10
    );

    // LANDMARK DOTS
    ctx.fillStyle = "#FFFF00";

    landmarks.forEach((point) => {
      ctx.beginPath();

      ctx.arc(
        point.x * canvas.width,
        point.y * canvas.height,
        2,
        0,
        Math.PI * 2
      );

      ctx.fill();
    });
  });
};

  useEffect(() => {
    const interval = setInterval(() => {
      const video =
        webcamRef.current?.video;

      if (
        video &&
        video.readyState === 4
      ) {
        const results =
          detectFaceLandmarks(video);

        if (!results) return;

        const faces =
          results.faceLandmarks || [];

        setFaceCount(faces.length);

        drawFaces(faces);
        if (faces.length > 0) {
  const landmarks = faces[0];

  const leftEye =
    leftEyeIndices.map(
      (index) => landmarks[index]
    );

  const ear =
    getEyeAspectRatio(leftEye);

  setEyeEAR(ear);

  if (ear < 0.18) {
    setEyeStatus("Closed");
  } else {
    setEyeStatus("Open");
  }
}

        if (
          results.faceBlendshapes &&
          results.faceBlendshapes.length > 0
        ) {
          const blendShapes =
            results.faceBlendshapes[0]
              .categories;

          const blink =
            blendShapes.find(
              (item) =>
                item.categoryName ===
                "eyeBlinkLeft"
            )?.score || 0;

          const jaw =
            blendShapes.find(
              (item) =>
                item.categoryName ===
                "jawOpen"
            )?.score || 0;

          setEyeBlinkScore(blink);
          setJawOpenScore(jaw);

          const score =
            calculateDistressScore(
              blink,
              jaw,
              faces.length
            );

          setDistressScore(score);
        }
      }
    }, 100);

    return () =>
      clearInterval(interval);
  }, );

  const risk =
    getRiskLevel(distressScore);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        AI Patient Monitoring Dashboard
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-black p-5 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold mb-4">
            Live Camera Feed
          </h2>

          <div className="relative">

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
  onUserMedia={() => {
    setCameraStatus("Camera Connected");

    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = 1280;
      canvas.height = 720;
    }
  }}
  onUserMediaError={() =>
    setCameraStatus(
      "Camera Permission Denied"
    )
  }
  className="rounded-xl w-full border"
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
    zIndex: 9999,
    pointerEvents: "none",
  }}
/>


          </div>

          <div className="mt-4 p-3 border bg-white text-black rounded-lg">
            <strong>Camera Status:</strong>{" "}
            {cameraStatus}
          </div>

        </div>

        <div className="bg-white p-5 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold mb-4">
            AI Analysis
          </h2>

          <div className="space-y-4">

            <div className="p-4 border rounded-lg">
              <strong>AI Status:</strong> {aiStatus}
            </div>

            <div className="p-4 border rounded-lg">
              <strong>Detected Faces:</strong> {faceCount}
            </div>
            <div className="p-4 border rounded-lg">
  <strong>Eye Status:</strong>{" "}
  {eyeStatus}
</div>

<div className="p-4 border rounded-lg">
  <strong>Eye EAR:</strong>{" "}
  {eyeEAR.toFixed(3)}
</div>

            <div className="p-4 border rounded-lg">
              <strong>Eye Blink Score:</strong>{" "}
              {eyeBlinkScore.toFixed(2)}
            </div>

            <div className="p-4 border rounded-lg">
              <strong>Jaw Open Score:</strong>{" "}
              {jawOpenScore.toFixed(2)}
            </div>

            <div className="p-4 border rounded-lg">
              <strong>Heart Rate:</strong>{" "}
              {heartRate} bpm
            </div>

            <div className="p-4 border rounded-lg">
              <strong>Respiration Rate:</strong>{" "}
              {respirationRate}/min
            </div>

            <div className="p-4 border rounded-lg">
              <strong>Distress Score:</strong>{" "}
              {distressScore}/100
            </div>

            <div
              className={`p-4 border rounded-lg font-semibold ${risk.color}`}
            >
              Risk Level: {risk.label}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}