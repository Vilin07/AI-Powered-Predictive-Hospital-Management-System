import Webcam from "react-webcam";
import { useState, useEffect, useRef } from "react";

import api from "../api/hospitalApi";
import socket from "../socket/socket";


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

import {
  extractHeartRateSignal,
  estimateHeartRate,
} from "../ai/heartRateDetector";

import {
  extractBreathingSignal,
  estimateRespirationRate,
} from "../ai/respirationDetector";

import {
  startCoughDetection,
  getCoughStatus,
} from "../ai/coughDetector";

import {
  loadPoseLandmarker,
  detectPose,
} from "../ai/poseDetector";


export default function LiveMonitoring() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const lastHeartUpdateRef = useRef(0);
  const drowsyStartRef = useRef(null);
  const lastAlertSoundRef = useRef(0);

  const [faceCount, setFaceCount] = useState(0);
  const [eyeBlinkScore, setEyeBlinkScore] = useState(0);
  const [jawOpenScore, setJawOpenScore] = useState(0);
  const [distressScore, setDistressScore] = useState(0);
  const [recommendation, setRecommendation] = useState("Monitoring Patient...");
  const [eyeStatus, setEyeStatus] = useState("Open");
  const [drowsyStatus, setDrowsyStatus] = useState("Normal");
  const [showAlert, setShowAlert] = useState(false);
  const [criticalAlert, setCriticalAlert] = useState(false);
  const [coughCount, setCoughCount] = useState(0);
  const [coughStatus, setCoughStatus] = useState("None");
  const [bodyStatus, setBodyStatus] = useState("Unknown");

const [fallRisk, setFallRisk] = useState("Normal");
  

const [eyeEAR, setEyeEAR] = useState(0);
const [heartRate, setHeartRate] = useState(75);
const [respirationRate, setRespirationRate] = useState(19);

const [cameraStatus, setCameraStatus] = useState("Connecting...");

const [aiStatus, setAiStatus] = useState("Loading AI Models...");
    const leftEyeIndices = [
  33,
  160,
  158,
  133,
  153,
  144,
];

const sendLiveVitals = async () => {
  try {
    console.log("📤 Sending vitals to backend...");

    const response = await api.post("/live-vitals", {
      patientId: "P1001",

      heartRate,
      respirationRate,
      distressScore,
      eyeStatus,
      bodyStatus,
      fallRisk,
      recommendation,
    });

    console.log("✅ Backend Response:");
    console.log(response.data);

  } catch (error) {
    console.log("❌ Error sending vitals");

    console.log(error);

    console.log(error.message);

    console.log(error.response);
  }
};

  useEffect(() => {
    const initializeAI = async () => {
      try {
        await loadFaceLandmarker();
        await loadPoseLandmarker();

       setAiStatus(
  "Face & Pose AI Loaded"
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

  useEffect(() => {
  startCoughDetection(
    (count) => {
      setCoughCount(count);

      setCoughStatus(
        getCoughStatus(count)
      );
    }
  );
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


// ======================
// POSE DETECTION
// ======================

const poseResult = detectPose(video);

if (poseResult?.landmarks?.length) {
  const pose = poseResult.landmarks[0];

  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  if (canvas && ctx) {
    // Skeleton Connections
    const connections = [
      [11, 12],

      [11, 13],
      [13, 15],

      [12, 14],
      [14, 16],

      [11, 23],
      [12, 24],

      [23, 24],

      [23, 25],
      [25, 27],

      [24, 26],
      [26, 28],
    ];

    // Draw Skeleton
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 5;

    connections.forEach(([start, end]) => {
      const p1 = pose[start];
      const p2 = pose[end];

      if (!p1 || !p2) return;

      ctx.beginPath();

      ctx.moveTo(
        p1.x * canvas.width,
        p1.y * canvas.height
      );

      ctx.lineTo(
        p2.x * canvas.width,
        p2.y * canvas.height
      );

      ctx.stroke();
    });

    // Draw Joints
    pose.forEach((point) => {
      ctx.beginPath();

      ctx.arc(
        point.x * canvas.width,
        point.y * canvas.height,
        6,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "#00FFFF";

      ctx.fill();
    });
  }

  // Body Position Detection

  const nose = pose[0];
  const leftHip = pose[23];
  const rightHip = pose[24];

  const hipY =
    (leftHip.y + rightHip.y) / 2;

  if (
    Math.abs(nose.y - hipY) < 0.15
  ) {
    setBodyStatus("Lying Down");
    setFallRisk("High");
  } else {
    setBodyStatus("Upright");
    setFallRisk("Normal");
  }
}


// HEART RATE DETECTION

if (faces.length > 0) {
  const signal = extractHeartRateSignal(
    video,
    faces[0]
  );

  console.log(
    "Signal Length:",
    signal?.length
  );

  const bpm =
    estimateHeartRate(signal);

  console.log(
    "Heart Rate:",
    bpm
  );

  const now = Date.now();

  if (
    bpm > 40 &&
    bpm < 180 &&
    now -
      lastHeartUpdateRef.current >
        2000
  ) {
    setHeartRate((prev) =>
      prev === 0
        ? bpm
        : Math.round(
            prev * 0.8 +
              bpm * 0.2
          )
    );

    lastHeartUpdateRef.current =
      now;
  }
}

        if (faces.length > 0) {
  const landmarks = faces[0];

  const leftEye =
    leftEyeIndices.map(
      (index) => landmarks[index]
    );

  const ear =
    getEyeAspectRatio(leftEye);

  setEyeEAR(ear);

if (ear < 0.15) {
  setEyeStatus("Closed");

  if (!drowsyStartRef.current) {
    drowsyStartRef.current =
      Date.now();
  }

  const closedDuration =
    Date.now() -
    drowsyStartRef.current;

  if (closedDuration > 5000) {
    setDrowsyStatus(
      "DROWSY ⚠️"
    );
  }
} else {
  setEyeStatus("Open");

  drowsyStartRef.current =
    null;

  setDrowsyStatus(
    "Normal"
  );
}
}


// RESPIRATION DETECTION
if (faces.length > 0) {
  const breathingSignal =
    extractBreathingSignal(
      faces[0]
    );

  const breaths =
    estimateRespirationRate(
      breathingSignal
    );

  if (
    breaths > 8 &&
    breaths < 40
  ) {
    setRespirationRate(
      breaths
    );
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
         if (
  score > 60 ||
  heartRate > 100 ||
  drowsyStatus?.includes("DROWSY")
) {
  setCriticalAlert(true);

  const now = Date.now();

  if (
    now -
    lastAlertSoundRef.current >
    10000
  ) {
    const audio = new Audio(
      "/alert.mp3"
    );

    audio.play();

    lastAlertSoundRef.current =
      now;
  }
}
else {
  setCriticalAlert(false);
}
        // AI Recommendation Engine

if (
  score > 70 ||
  heartRate > 100
) {
  setRecommendation(
    "Immediate medical attention recommended."
  );
}
else if (
  drowsyStatus?.includes("DROWSY")
) {
  setRecommendation(
    "Possible drowsiness detected. Wake-up assessment recommended."
  );
}
else if (
  score > 40
) {
  setRecommendation(
    "Patient requires close observation."
  );
}
else {
  setRecommendation(
    "Patient stable. Continue monitoring."
  );
}
        }
      }
    }, 100);

    return () =>
      clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[] );

  const risk =
    getRiskLevel(distressScore);

useEffect(() => {
  if (
    drowsyStatus === "DROWSY ⚠️" ||
    distressScore > 80
  ) {
    setShowAlert(true);
  }
}, [
  drowsyStatus,
  distressScore,
]);

useEffect(() => {
  const interval = setInterval(() => {
    sendLiveVitals();
  }, 5000);

  return () => clearInterval(interval);
}, [
  heartRate,
  respirationRate,
  distressScore,
  eyeStatus,
  bodyStatus,
  fallRisk,
  recommendation,
]);

useEffect(() => {
  socket.on("liveVitalsUpdated", (data) => {
    console.log("================================");
    console.log("📡 SOCKET EVENT RECEIVED");
    console.log(data);
    console.log("================================");
  });

  return () => {
    socket.off("liveVitalsUpdated");
  };
}, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {criticalAlert && (
  <div className="mb-6 bg-red-600 text-white rounded-lg p-4 shadow-lg">
    <h2 className="font-bold text-lg">
       Critical Patient Alert
    </h2>

    <p className="mt-1">
      High distress detected.
      Immediate medical attention required.
    </p>
  </div>
)}
      {showAlert && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-99999">
    <div className="bg-white w-full max-w-md rounded-xl shadow-xl border">

      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold text-red-600">
          Emergency Alert
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">

        <p className="text-gray-700 mb-5">
          Abnormal patient vitals detected.
          Immediate review is recommended.
        </p>

        <div className="space-y-3">

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">
              Heart Rate
            </span>
            <span>
              {heartRate} bpm
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">
              Respiration Rate
            </span>
            <span>
              {respirationRate}/min
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">
              Drowsiness
            </span>
            <span>
              {drowsyStatus}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">
              Distress Score
            </span>
            <span>
              {distressScore}/100
            </span>
          </div>
          <div className="p-4 border rounded-lg">
  <strong>
    AI Recommendation:
  </strong>

  <p className="mt-2 text-gray-700">
    {recommendation}
  </p>
</div>

        </div>

      </div>

      {/* Footer */}
      <div className="border-t px-6 py-4 flex justify-end gap-3">

        <button
          onClick={() =>
            setShowAlert(false)
          }
          className="px-4 py-2 border rounded-lg"
        >
          Dismiss
        </button>

        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Notify Staff
        </button>

      </div>

    </div>
  </div>
)}
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
    zIndex: 10,
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

<div
  className={`p-4 border rounded-lg font-semibold ${
    drowsyStatus.includes("DROWSY")
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700"
  }`}
>
  Drowsiness Status:
  {drowsyStatus}
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
              <strong>Estimated Heart Rate:</strong>{" "}
              {heartRate} bpm
            </div>
<div className="p-4 border rounded-lg">
  <strong>rPPG Status:</strong>{" "}
  Active
</div>
<div className="p-4 border rounded-lg">
  <strong>Respiration Rate:</strong>
  {respirationRate}/min

  <div className="mt-2">
    Status:
    {
      respirationRate < 10
        ? " Critical Low"
        : respirationRate > 25
        ? " High"
        : " Normal"
    }
  </div>
</div>

<div className="p-4 border rounded-lg">
  <strong>Body Position:</strong>
  {bodyStatus}
</div>
<div
  className={`p-4 border rounded-lg ${
    fallRisk === "High"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700"
  }`}
>
  <strong>Fall Risk:</strong>{" "}
  {fallRisk}
</div>

<div className="p-4 border rounded-lg">
  <strong>Cough Count:</strong>
  {coughCount}
</div>

<div className="p-4 border rounded-lg">
  <strong>Cough Status:</strong>
  {coughStatus}
</div>

  <div className="mt-2">
    Status:
    {
      respirationRate < 10
        ? " Critical Low"
        : respirationRate > 25
        ? " High"
        : " Normal"
    }
  </div>
</div>

       <div className="p-4 border rounded-lg">
  <strong>Distress Score:</strong>{" "}
  {distressScore}/100
</div>

<div
  className={`p-4 border rounded-lg ${
    recommendation.includes(
      "Immediate"
    )
      ? "bg-red-50 border-red-300"
      : recommendation.includes(
          "drowsiness"
        )
      ? "bg-yellow-50 border-yellow-300"
      : "bg-green-50 border-green-300"
  }`}
>
  <strong>
    AI Recommendation
  </strong>

  <p className="mt-2">
    {recommendation}
  </p>
</div>

<div
  className={`p-4 border rounded-lg font-semibold ${risk.color}`}
>
  Risk Level: {risk.label}
</div>

          </div>

        </div>

      </div>
    
  );
}