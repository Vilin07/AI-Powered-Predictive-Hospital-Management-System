import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid Email"],
    },

    department: {
      type: String,
      required: true,
      enum: [
        "Emergency",
        "ICU",
        "Cardiology",
        "Neurology",
        "Radiology",
        "General Ward",
        "Administration",
      ],
    },

    role: {
      type: String,
      required: true,
      enum: [
        "Administrator",
        "Doctor",
        "Nurse",
        "Technician",
      ],
      default: "Doctor",
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

},{timestamps: true});

userSchema.pre("save", async function () {

  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.comparePassword = async function (enteredPassword) {

  return await bcrypt.compare(
    enteredPassword,
    this.password
  );

};

const User = mongoose.model('User', userSchema);

export default User;