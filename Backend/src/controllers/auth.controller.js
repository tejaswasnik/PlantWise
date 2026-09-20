import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);
    return res
      .status(201)
      .json({ message: "User created successfully", user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);
    return res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutController = async (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMeController = async (req, res) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authenticated" });
  }
};

export { registerController, loginController, logoutController, getMeController };
