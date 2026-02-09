import express from "express";
import {
  adminSummary,
  adminRecentTickets,
} from "../controllers/adminDashboardController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, adminOnly, adminSummary);
router.get("/recent-tickets", protect, adminOnly, adminRecentTickets);

export default router;
