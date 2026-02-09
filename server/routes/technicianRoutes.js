import express from "express";
import {
  getMyTickets,
  getTicketDetails,
  startTicketWork,
  closeTicket,
  getMyActiveTickets,
  getMyClosedTickets,
} from "../controllers/technicianTicketController.js";
import {
  getTechnicianStats,
  getRecentTickets,
  getTechnicianPerformance,
  getTechnicianWorkHistory,
} from "../controllers/technicianController.js";
import { protect, technicianOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* DASHBOARD */
router.get("/dashboard", protect, technicianOnly);

/* ACTIVE & CLOSED MUST COME FIRST */
router.get("/tickets/active", protect, technicianOnly, getMyActiveTickets);
router.get("/tickets/closed", protect, technicianOnly, getMyClosedTickets);

/* GENERAL */
router.get("/tickets", protect, technicianOnly, getMyTickets);

/* DYNAMIC ROUTES MUST BE LAST */
router.get("/tickets/:id", protect, technicianOnly, getTicketDetails);
router.patch("/tickets/:id/start", protect, technicianOnly, startTicketWork);
router.patch("/tickets/:id/close", protect, technicianOnly, closeTicket);

/* STATS */
router.get("/stats", protect, technicianOnly, getTechnicianStats);
router.get("/recent", protect, technicianOnly, getRecentTickets);
router.get("/performance", protect, technicianOnly, getTechnicianPerformance);
router.get("/work-history", protect, technicianOnly, getTechnicianWorkHistory);

export default router;
