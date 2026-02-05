// ✅ TICKET CREATED EMAIL (ENHANCED)
export const ticketCreatedTemplate = ({
  name,
  title,
  category,
  priority,
  description,
  status,
  ticketId,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Ticket Created - IT Support Hub</title>
</head>
<body style="margin:0;padding:0;background:#eef2ff;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 10px;">

        <!-- CARD -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;box-shadow:0 15px 40px rgba(0,0,0,0.08);overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#818cf8);padding:24px;text-align:center;color:#ffffff;">
              <h2 style="margin:0;font-size:22px;">🎫 Ticket Created</h2>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">
                IT Support Hub
              </p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:28px;color:#1f2937;">
              <p style="font-size:15px;margin:0 0 12px;">
                Hi <strong>${name}</strong>,
              </p>

              <p style="font-size:14px;line-height:1.6;margin:0 0 20px;">
                Your support ticket has been successfully created.  
                Our team will review it shortly.
              </p>

              <!-- DETAILS BOX -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px;padding:16px;margin-bottom:20px;">
                <tr>
                  <td style="font-size:13px;padding:6px 0;"><strong>Ticket ID:</strong></td>
                  <td style="font-size:13px;padding:6px 0;">#${ticketId}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;padding:6px 0;"><strong>Title:</strong></td>
                  <td style="font-size:13px;padding:6px 0;">${title}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;padding:6px 0;"><strong>Category:</strong></td>
                  <td style="font-size:13px;padding:6px 0;">${category}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;padding:6px 0;"><strong>Priority:</strong></td>
                  <td style="font-size:13px;padding:6px 0;">${priority}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;padding:6px 0;"><strong>Status:</strong></td>
                  <td style="font-size:13px;padding:6px 0;color:#2563eb;"><strong>${status}</strong></td>
                </tr>
              </table>

              <!-- DESCRIPTION -->
              <p style="font-size:13px;margin:0 0 6px;"><strong>Description</strong></p>
              <p style="font-size:13px;background:#f3f4f6;padding:12px;border-radius:8px;line-height:1.6;">
                ${description}
              </p>

              <p style="font-size:13px;margin:20px 0 0;">
                Our support team will contact you soon.
              </p>

              <p style="font-size:13px;margin:10px 0 0;">
                — <strong>IT Support Hub</strong>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9fafb;padding:14px;text-align:center;font-size:12px;color:#6b7280;">
              © ${new Date().getFullYear()} IT Support Hub · All rights reserved
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};

// ✅ TICKET CLOSED EMAIL (ENHANCED)
export const ticketClosedEmailTemplate = ({
  name,
  title,
  ticketId,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Ticket Closed - IT Support Hub</title>
</head>
<body style="margin:0;padding:0;background:#eef2ff;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 10px;">

        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;box-shadow:0 15px 40px rgba(0,0,0,0.08);overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#22c55e,#16a34a);padding:24px;text-align:center;color:#ffffff;">
              <h2 style="margin:0;font-size:22px;">✅ Ticket Closed</h2>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">
                IT Support Hub
              </p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:28px;color:#1f2937;">
              <p style="font-size:15px;margin:0 0 12px;">
                Hi <strong>${name}</strong>,
              </p>

              <p style="font-size:14px;line-height:1.6;margin:0 0 20px;">
                Great news! Your support ticket has been resolved successfully 🎉
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px;padding:16px;margin-bottom:20px;">
                <tr>
                  <td style="font-size:13px;padding:6px 0;"><strong>Ticket ID:</strong></td>
                  <td style="font-size:13px;padding:6px 0;">#${ticketId}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;padding:6px 0;"><strong>Title:</strong></td>
                  <td style="font-size:13px;padding:6px 0;">${title}</td>
                </tr>
              </table>

              <p style="font-size:13px;">
                Thank you for using <strong>IT Support Hub</strong>.
                If you need further help, feel free to raise a new ticket.
              </p>

              <p style="font-size:13px;margin-top:10px;">
                — <strong>IT Support Hub Team</strong>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9fafb;padding:14px;text-align:center;font-size:12px;color:#6b7280;">
              © ${new Date().getFullYear()} IT Support Hub · All rights reserved
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};
