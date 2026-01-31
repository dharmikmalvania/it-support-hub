export const baseTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background: #f4f6f8;
      font-family: Arial, sans-serif;
      padding: 30px;
    }
    .card {
      background: #ffffff;
      max-width: 600px;
      margin: auto;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .header {
      background: #4f46e5;
      color: white;
      padding: 20px;
      border-radius: 12px 12px 0 0;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    .footer {
      margin-top: 20px;
      font-size: 13px;
      color: #777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">${title}</div>
    <div class="content">${content}</div>
    <div class="footer">
      © ${new Date().getFullYear()} IT Support Hub
    </div>
  </div>
</body>
</html>
`;
export const ticketCreatedEmailTemplate = (ticket) =>
  baseTemplate(
    "🎫 Ticket Created",
    `
      <p><strong>Title:</strong> ${ticket.title}</p>
      <p><strong>Category:</strong> ${ticket.category}</p>
      <p><strong>Priority:</strong> ${ticket.priority}</p>
      <p><strong>Status:</strong> Open</p>
      <p>Our team will contact you soon.</p>
    `
  );

export const ticketClosedEmailTemplate = (ticket) =>
  baseTemplate(
    "✅ Ticket Closed",
    `
      <p><strong>Title:</strong> ${ticket.title}</p>
      <p><strong>Status:</strong> Closed</p>
      <p>Thank you for your feedback.</p>
    `
  );
