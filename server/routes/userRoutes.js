import express from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
  toggleNotification,
  uploadAvatar,
} from "../controllers/userController.js";

import upload from "../config/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

router.put("/notification", protect, toggleNotification);


router.post(
  "/avatar",
  protect,
  upload.single("avatar"),
  uploadAvatar
);

export default router;
