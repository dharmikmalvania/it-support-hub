import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    relatedTicket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    notificationEnabled: {
  type: Boolean,
  default: true,
},

  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
