import createNotification from "./createNotification.js";
import sendEmail from "./sendEmail.js";
import { baseTemplate } from "./emailTemplates.js";
import User from "../models/User.js";

const notifyUser = async (user, subject, title, content) => {
  try {
    if (!user?._id) {
      console.log("❌ notifyUser: invalid user");
      return;
    }

    // Always fetch fresh user from DB
    const freshUser = await User.findById(user._id);

    if (!freshUser) {
      console.log("❌ notifyUser: user not found");
      return;
    }

    console.log("🔔 Notification Check:", {
      email: freshUser.email,
      enabled: freshUser.notificationEnabled,
    });

    // 🔥 MASTER TOGGLE CHECK
    if (!freshUser.notificationEnabled) {
      console.log("🔕 Notifications disabled for:", freshUser.email);
      return;
    }

    // 🔔 Save DB notification
    await createNotification(freshUser._id, title);

    // 📧 Send Email
    await sendEmail(
      freshUser.email,
      subject,
      baseTemplate(title, content)
    );

    console.log("✅ Notification + Email sent");

  } catch (error) {
    console.error("❌ notifyUser ERROR:", error.message);
  }
};

export default notifyUser;
