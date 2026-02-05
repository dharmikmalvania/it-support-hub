import express from "express";
import {
  getDashboardSummary,
  getRecentTickets,
  getChartData,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/summary", getDashboardSummary);
router.get("/recent-tickets", getRecentTickets);
router.get("/charts", getChartData);

export default router;
