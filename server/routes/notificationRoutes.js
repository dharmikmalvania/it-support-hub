import express from "express";
import Notification from "../models/Notification.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const notifications = await Notification.find({
    user: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(notifications);
});

router.put("/:id/read", protect, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, {
    isRead: true,
  });
  res.json({ message: "Marked as read" });
});

export default router;
