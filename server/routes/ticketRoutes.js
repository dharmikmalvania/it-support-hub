import express from "express";
import {
  createTicket,
  getMyTickets,
  getTicketById,
  updateTicket,
  closeTicket,
  submitFeedback,
  getTicketStats,
} from "../controllers/ticketController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* =======================
   STATIC ROUTES FIRST
======================= */

// ✅ DASHBOARD STATS (IMPORTANT: keep on top)
router.get("/stats", protect, getTicketStats);

// ✅ USER TICKETS
router.get("/my", protect, getMyTickets);

/* =======================
   TICKET CRUD
======================= */

router.post(
  "/",
  protect,
  upload.single("attachment"),
  createTicket
);

router.get("/:id", protect, getTicketById);
router.put("/:id", protect, updateTicket);
router.put("/:id/close", protect, closeTicket);
router.post("/:id/feedback", protect, submitFeedback);

export default router;
