import {
  registerUser,
  loginUser,
} from "../services/authService.js";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {

    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "Staff registered successfully.",
      user,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user,
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: error.message,
    });

  }

};


export const getMe = async (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });

};


export const logout = async (req, res) => {

res.cookie("token", "", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  expires: new Date(0),
});

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });

};

export const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("-password");


    res.status(200).json({
      success: true,
      user,
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

export const changePassword = async (req, res) => {

  try {

    const { currentPassword, newPassword } = req.body;


    const user = await User.findById(req.user.id)
      .select("+password");


    if (!user) {
      return res.status(404).json({
        success:false,
        message:"User not found."
      });
    }


    const isMatch = await user.comparePassword(
      currentPassword
    );


    if (!isMatch) {

      return res.status(400).json({
        success:false,
        message:"Current password is incorrect."
      });

    }


    user.password = newPassword;

    await user.save();


    res.status(200).json({

      success:true,

      message:"Password changed successfully."

    });


  } catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};