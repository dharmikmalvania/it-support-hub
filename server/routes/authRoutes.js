import express from "express";
import { registerUser, loginUser, verifyOtp, registerTechnician } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.post("/register-technician", registerTechnician);

export default router;
