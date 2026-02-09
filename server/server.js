import express from "express";
import dotenv from "dotenv";
import path from "path";
import adminRoutes from "./routes/adminRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import technicianRoutes from "./routes/technicianRoutes.js";
import adminTicketRoutes from "./routes/adminTicketRoutes.js";
import adminAnalyticsRoutes from "./routes/adminAnalyticsRoutes.js";
dotenv.config();
connectDB();

const app = express();

// 🔥 REQUIRED
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminTicketRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
