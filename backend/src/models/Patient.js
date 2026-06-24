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
  
},{timestamps: true})


const Patient = mongoose.model("Patient", patientSchema);

export default Patient;