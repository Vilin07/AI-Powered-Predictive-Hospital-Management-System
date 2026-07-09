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
  secure: true,
  sameSite: "none",
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
  secure: true,
  sameSite: "none",
  expires: new Date(0),
});

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });

};