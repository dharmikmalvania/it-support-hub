import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "technician", "admin"],
      default: "user",
    },

    isApproved: {
      type: Boolean,
      default: function () {
        return this.role === "technician" ? false : true;
      },
    },

    technicianProfile: {
      phone: String,
      skills: String,
      experience: Number,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: Number,
    otpExpire: Date,

    avatar: { type: String, default: "" },

    emailNotifications: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 🔐 Password hash
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
