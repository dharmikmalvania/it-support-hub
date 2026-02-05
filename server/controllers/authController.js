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
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    return res.json({ message: "OTP verified successfully" });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    return res.status(500).json({ message: "OTP verification failed" });
  }
};


/* =====================================================
   REGISTER CONTROLLER (SEND OTP)
===================================================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered. Please login.",
      });
    }

    // 3️⃣ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // 4️⃣ Create user (password hashed by schema)
    const user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpire: Date.now() + 10 * 60 * 1000, // 10 minutes
      isVerified: false,
    });

    console.log("REGISTER OTP:", otp);

    // 5️⃣ Send OTP email
    await sendEmail(
      email,
      "Verify your IT Support Hub account",
      `Your OTP is ${otp}`
    );

    // 6️⃣ Success response
    return res.status(201).json({
      message: "OTP sent to email",
      userId: user._id,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

/* =====================================================
   LOGIN CONTROLLER
===================================================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Check email verification
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
    }

    // 4️⃣ Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 5️⃣ Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ Success response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Login failed",
    });
  }
};
