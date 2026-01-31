import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Notification from "../models/Notification.js";

const router = express.Router();

// Get logged-in user's notifications
router.get("/", protect, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to load notifications" });
  }
});

export default router;
