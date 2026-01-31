import express from "express";
import {
  createTicket,
  getMyTickets,
  getTicketById,
  updateTicket,
  closeTicketWithFeedback,
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

router.post( "/",protect,upload.single("attachment"),createTicket);
router.get("/:id", protect, getTicketById);
router.put("/:id", protect, updateTicket);
router.post(
  "/:id/close-feedback",
  protect,
  closeTicketWithFeedback
);



export default router;
