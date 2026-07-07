import mongoose from "mongoose";

const vitalHistorySchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },

    heartRate: Number,

    respirationRate: Number,

    distressScore: Number,

    riskLevel: String,

    fallRisk: String,

    drowsyStatus: String,
  },
  {
    timestamps: true,
  }
);

export default
mongoose.models.VitalHistory ||
mongoose.model(
  "VitalHistory",
  vitalHistorySchema
);