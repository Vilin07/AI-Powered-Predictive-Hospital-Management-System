import mongoose from 'mongoose';

const liveVitalSchema = new mongoose.Schema({
    patientId: {
      type: String,
      required: true,
      unique: true
    },

    heartRate: {
      type: Number,
      default: 0
    },

    respirationRate: {
      type: Number,
      default: 0
    },

    distressScore: {
      type: Number,
      default: 0
    },

    eyeStatus: {
      type: String,
      default: "Open"
    },

    drowsyStatus: {
      type: String,
      default: "Normal"
    },

    coughCount: {
      type: Number,
      default: 0
    },

    coughStatus: {
      type: String,
      default: "None"
    },

    bodyStatus: {
      type: String,
      default: "Unknown"
    },

    fallRisk: {
      type: String,
      default: "Normal"
    },

    recommendation: {
      type: String,
      default: ""
    },

    riskLevel: {
      type: String,
      default: "Low"
    },

    lastUpdated: {
      type: Date,
      default: Date.now
    }
  
},{timestamps: true})

export default mongoose.models.LiveVital ||
  mongoose.model("LiveVital", liveVitalSchema);