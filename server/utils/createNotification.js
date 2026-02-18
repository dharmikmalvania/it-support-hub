import Notification from "../models/Notification.js";

const createNotification = async (userId, message, ticketId = null) => {
  try {
    await Notification.create({
      user: userId,
      message,
      relatedTicket: ticketId,
    });

    console.log("📌 DB Notification created");

  } catch (error) {
    console.error("❌ CREATE NOTIFICATION ERROR:", error.message);
  }
};

export default createNotification;
