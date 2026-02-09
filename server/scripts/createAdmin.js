import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

// ✅ LOAD ENV FILE
dotenv.config();

const createAdmin = async () => {
  try {
    // ✅ CONNECT USING ENV
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({
      email: "admin@itsupporthub.com",
    });

    if (adminExists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@itsupporthub.com",
      password: "admin123", // PLAIN password
      role: "admin",
      isVerified: true,
      isApproved: true,
    });

    console.log("✅ Admin created successfully:", admin.email);
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
