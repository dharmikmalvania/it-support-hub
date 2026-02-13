import express from "express";
import {
  getOpenTickets,
  getTicketHistory,
  assignTicketToTechnician,
} from "../controllers/adminTicketController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/open-tickets", protect, adminOnly, getOpenTickets);
router.get("/ticket-history", protect, adminOnly, getTicketHistory);
router.patch("/assign-ticket", protect, adminOnly, assignTicketToTechnician);

export default router;
