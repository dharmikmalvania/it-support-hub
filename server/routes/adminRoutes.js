import express from "express";
import {
  getPendingTechnicians,
  approveTechnician,
  getApprovedTechnicians,
} from "../controllers/adminController.js";
import {
  getTechnicianProfile,
} from "../controllers/adminTechnicianController.js"
import { getAdminTicketDetails } from "../controllers/adminTicketController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ GET all pending technicians
router.get(
  "/pending-technicians",
  protect,
  adminOnly,
  getPendingTechnicians
);

// ✅ APPROVE technician
router.patch(
  "/approve-technician/:id",
  protect,
  adminOnly,
  approveTechnician
);

router.get(
  "/technicians",
  protect,
  adminOnly,
  getApprovedTechnicians
);

router.get(
  "/tickets/:id",
  protect,
  adminOnly,
  getAdminTicketDetails
);


router.get("/technicians/:id",protect,adminOnly,getTechnicianProfile);


export default router;
