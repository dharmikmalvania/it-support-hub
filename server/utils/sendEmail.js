import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // 🔑 must be false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify(); // ✅ FORCE SMTP CHECK

    await transporter.sendMail({
      from: `"IT Support Hub" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html, // can be plain text OR HTML
    });

    console.log("📧 Email sent successfully to:", to);

  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Email not sent");
  }
};

export default sendEmail;
