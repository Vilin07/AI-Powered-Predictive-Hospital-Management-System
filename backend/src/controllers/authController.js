import {
  registerUser,
  loginUser,
} from "../services/authService.js";

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
      secure: false, // change to true in production (HTTPS)
      sameSite: "lax",
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