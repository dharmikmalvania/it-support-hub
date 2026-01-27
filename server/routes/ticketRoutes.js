import express from "express";
import {
  createTicket,
  getMyTickets,
  closeTicket,
} from "../controllers/ticketController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { getTicketStats } from "../controllers/ticketController.js";
import { updateTicket } from "../controllers/ticketController.js";

const router = express.Router();

router.post("/", protect, upload.single("attachment"), createTicket);
router.get("/my", protect, getMyTickets);
router.put("/:id/close", protect, closeTicket);
router.put("/:id", protect, updateTicket);


export default router;
