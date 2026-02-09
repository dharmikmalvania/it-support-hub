import express from "express";
import {
  getAdminOverview,
  getTechnicianReport,
  getRecentTicketsReport,
} from "../controllers/adminAnalyticsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/overview", protect, adminOnly, getAdminOverview);
router.get("/technicians", protect, adminOnly, getTechnicianReport);
router.get("/recent-tickets", protect, adminOnly, getRecentTicketsReport);

export default router;
