import createNotification from "./createNotification.js";
import sendEmail from "./sendEmail.js";
import { baseTemplate } from "./emailTemplates.js";

const notifyUser = async (user, subject, title, content) => {
  try {
    // 🔔 Save notification in DB
    await createNotification(user._id, title);

    // 📧 Send styled email
    await sendEmail(
      user.email,
      subject,
      baseTemplate(title, content)
    );

  } catch (error) {
    console.error("NOTIFY ERROR:", error.message);
  }
};

export default notifyUser;
