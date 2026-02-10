import express from "express";
import {
  createTicket,
  getMyTickets,
  getTicketHistory, // ✅ now exists
  getTicketById,
  updateTicket,
  closeTicketWithFeedback,
  getTicketStats,
  submitFeedback,
} from "../controllers/ticketController.js";

import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* =======================
   STATIC ROUTES FIRST
======================= */

router.get("/stats", protect, getTicketStats);
router.get("/my", protect, getMyTickets);
router.get("/history", protect, getTicketHistory);

/* =======================
   TICKET CRUD
======================= */

router.post("/", protect, upload.single("attachment"), createTicket);
router.post("/:id/close-feedback", protect, closeTicketWithFeedback);
router.put("/:id", protect, updateTicket);
router.put("/:id",protect,upload.single("attachment"),updateTicket);

router.post(
  "/tickets/:id/feedback",
  protect,
  submitFeedback
);


// ✅ DYNAMIC ROUTE LAST
router.get("/:id", protect, getTicketById);

export default router;
