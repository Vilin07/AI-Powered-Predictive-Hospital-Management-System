import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema({
    patientId: {
      type: String,
      required: true,
    },

    heartRate: Number,

    respirationRate: Number,

    distressScore: Number,

    coughCount: Number,

    bodyStatus: String,

    fallRisk: String,

    drowsyStatus: String,
  },{timestamps: true})

const Vital = mongoose.model("Vital", vitalSchema);

export default Vital;