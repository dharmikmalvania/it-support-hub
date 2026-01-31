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

/* ===========================
   REGISTER USER
=========================== */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.create({
    name,
    email,
    password,
    otp,
    otpExpires: Date.now() + 10 * 60 * 1000,
  });

  await sendEmail(
    email,
    "Verify your email - IT Support Hub",
    `<h2>Your OTP is ${otp}</h2><p>Valid for 10 minutes</p>`
  );

  res.status(201).json({
    message: "OTP sent to email",
    userId: user._id,
  });
};


/* ===========================
   LOGIN USER
=========================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user.emailVerified) {
  return res
    .status(401)
    .json({ message: "Please verify your email first" });
}


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // ✅ CORRECT
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  const user = await User.findById(userId);

  if (
    !user ||
    user.otp !== otp ||
    user.otpExpires < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.emailVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.json({ message: "Email verified successfully" });
};
