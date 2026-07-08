import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (userData) => {

    const existingEmail = await User.findOne({
        email: userData.email,
    });

    if (existingEmail) {
        throw new Error("Email already exists");
    }

    const existingEmployee = await User.findOne({
        employeeId: userData.employeeId,
    });

    if (existingEmployee) {
        throw new Error("Employee ID already exists");
    }

    const user = await User.create(userData);

    return user;
};

export const loginUser = async (email, password) => {

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid Email or Password");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error("Invalid Email or Password");
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

  const userData = user.toObject();
  delete userData.password;

const userObject = user.toObject();

delete userObject.password;

return {
    user: userObject,
    token,
};
};