import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"IT Support Hub" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error; // 🔥 DO NOT REMOVE
  }
};

export default sendEmail;
