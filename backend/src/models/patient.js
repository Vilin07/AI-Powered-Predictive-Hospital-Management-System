import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({

  patientId: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  roomNumber: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Active",
  },

  // ===== AI HEALTH METRICS =====

  heartRate: {
    type: Number,
    default: 80,
  },

  respirationRate: {
    type: Number,
    default: 18,
  },

  temperature: {
    type: Number,
    default: 98.6,
  },

  oxygenLevel: {
    type: Number,
    default: 98,
  },

  bloodPressure: {
    type: String,
    default: "120/80",
  },

  distressScore: {
    type: Number,
    default: 15,
  },

  riskLevel: {
    type: String,
    default: "Low",
  },

  fallRisk: {
    type: String,
    default: "Low",
  },

  drowsyStatus: {
    type: String,
    default: "No",
  },

  recommendation: {
    type: String,
    default:
      "Patient condition is stable. Continue routine monitoring.",
  },

}, {
  timestamps: true,
});


export default mongoose.models.Patient ||
 mongoose.model("Patient", patientSchema);