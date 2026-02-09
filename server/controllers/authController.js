import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
/* ===========================
   GENERATE JWT TOKEN
=========================== */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },               // ✅ FIXED
    process.env.JWT_SECRET,
    { expiresIn: "7d" }           // ✅ stable session
  );
};

/**
 * VERIFY OTP
 */
export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    return res.json({
      message:
        user.role === "technician"
          ? "Email verified. Await admin approval."
          : "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "OTP verification failed" });
  }
};



/* =====================================================
   REGISTER CONTROLLER (SEND OTP)
===================================================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = new User({
      name,
      email,
      password,
      role: "user",
      otp,
      otpExpire: Date.now() + 10 * 60 * 1000,
      isVerified: false,
    });

    await user.save();

    // 🔥 SEND EMAIL
    await sendEmail(
      email,
      "Verify your IT Support Hub account",
      `<h3>Your OTP is</h3><h2>${otp}</h2>`
    );

    return res.status(201).json({
      message: "OTP sent to email",
      userId: user._id,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error.message);

    // 🧹 CLEANUP: delete user if email failed
    if (error.message === "Email not sent") {
      await User.deleteOne({ email: req.body.email });
    }

    return res.status(500).json({ message: "Registration failed. Try again." });
  }
};



/* =====================================================
   LOGIN CONTROLLER
===================================================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify email first" });

    if (user.role === "technician" && !user.isApproved)
      return res.status(403).json({
        message: "Technician profile under admin review",
      });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};



/* =====================================================
    Technician REGISTER CONTROLLER (SEND OTP)
===================================================== */

export const registerTechnician = async (req, res) => {
  try {
    const { name, email, password, phone, skills, experience } = req.body;

    if (!name || !email || !password || !phone || !skills || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const technician = await User.create({
      name,
      email,
      password,
      role: "technician",
      technicianProfile: { phone, skills, experience },
      otp,
      otpExpire: Date.now() + 10 * 60 * 1000,
      isVerified: false,
      isApproved: false,
    });

    await sendEmail(
      email,
      "Verify your Technician Application",
      `Your OTP is ${otp}`
    );

    return res.status(201).json({
      message: "OTP sent. Verify email.",
      userId: technician._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Technician registration failed" });
  }
};



