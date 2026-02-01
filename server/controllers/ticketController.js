import Ticket from "../models/Ticket.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import {ticketClosedEmailTemplate,} from "../utils/emailTemplates.js";
import createNotification from "../utils/createNotification.js";



// DASHBOARD STATS
export const getTicketStats = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id });

  const total = tickets.length;
  const open = tickets.filter(t => t.status === "Open").length;
  const closed = tickets.filter(t => t.status === "Closed").length;

  res.json({ total, open, closed });
};


/* =========================
   CREATE TICKET
========================= */

export const createTicket = async (req, res) => {
  try {
    const { title, category, priority, description } = req.body;

    const ticket = await Ticket.create({
      user: req.user.id,
      title,
      category,
      priority,
      description,
    });

    // 🔹 get user email
    const user = await User.findById(req.user.id);

    // 🔹 send email
    await sendEmail(
      user.email,
      "🎫 Ticket Created - IT Support Hub",
      `
        <h2>Your ticket has been created</h2>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Status:</strong> Open</p>
        <br />
        <p>Our support team will contact you soon.</p>
      `
    );
    

      await createNotification(
      req.user.id,
        "🎫 Your ticket has been created successfully"
    );


    res.status(201).json(ticket);
  } catch (error) {
    console.error("CREATE TICKET ERROR:", error);
    res.status(500).json({ message: "Failed to create ticket" });
  }
};




/* =========================
   GET USER TICKETS
========================= */
export const getMyTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(tickets);
};

/* =========================
   GET SINGLE TICKET
========================= */
export const getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  // Security: only owner can access
  if (ticket.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.json(ticket);
};

/* =========================
   UPDATE TICKET
========================= */
export const updateTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (ticket.status === "Closed") {
    return res
      .status(400)
      .json({ message: "Closed tickets cannot be edited" });
  }

  ticket.title = req.body.title || ticket.title;
  ticket.category = req.body.category || ticket.category;
  ticket.priority = req.body.priority || ticket.priority;
  ticket.description = req.body.description || ticket.description;

  const updatedTicket = await ticket.save();
  res.json(updatedTicket);
};

/* =========================
   CLOSE TICKET
========================= */
export const closeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("user");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = "Closed";
    await ticket.save();

    // 🔹 send closure email
    await sendEmail(
      ticket.user.email,
      "✅ Ticket Closed - IT Support Hub",
      `
        <h2>Your ticket has been resolved</h2>
        <p><strong>Title:</strong> ${ticket.title}</p>
        <p><strong>Status:</strong> Closed</p>
        <br />
        <p>Thank you for using IT Support Hub.</p>
        <p>If you are satisfied, please leave feedback.</p>
      `
    );

    await createNotification(
  ticket.user._id,
  "✅ Your ticket has been closed"
);


    res.json(ticket);
  } catch (error) {
    console.error("CLOSE TICKET ERROR:", error);
    res.status(500).json({ message: "Failed to close ticket" });
  }
};


/* =========================
   SUBMIT FEEDBACK
========================= */
export const submitFeedback = async (req, res) => {
  const { rating, comment } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (ticket.status !== "Closed") {
    return res
      .status(400)
      .json({ message: "Ticket must be closed first" });
  }

  if (ticket.feedback && ticket.feedback.rating) {
    return res
      .status(400)
      .json({ message: "Feedback already submitted" });
  }

  ticket.feedback = {
    rating,
    comment,
    submittedAt: new Date(),
  };

  await ticket.save();

  await createNotification(
  ticket.user._id,
  "⭐ Thank you for submitting feedback"
);

  
  res.json({ message: "Feedback submitted successfully" });
};



export const closeTicketWithFeedback = async (req, res) => {
  try {
    console.log("FEEDBACK HIT");
    console.log("PARAM ID:", req.params.id);
    console.log("BODY:", req.body);

    const { rating, comment } = req.body;

    const ticket = await Ticket.findById(req.params.id).populate("user");
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = "Closed";
    ticket.feedback = { rating, comment };
    await ticket.save();

    res.json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("BACKEND FEEDBACK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};





