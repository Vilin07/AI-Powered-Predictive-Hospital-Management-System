import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
     patientId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Critical", "Warning", "Info"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Unread", "Read"],
      default: "Unread",
    },
},{timestamps: true})

export default mongoose.models.Alert ||
  mongoose.model("Alert", alertSchema);