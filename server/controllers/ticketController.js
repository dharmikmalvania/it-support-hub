import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import notifyUser from "../utils/notify.js";


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

    const attachment = req.file ? req.file.filename : null;

    const ticket = await Ticket.create({
      user: req.user.id,
      title,
      category,
      priority,
      description,
      attachment,
    });

    const user = await User.findById(req.user.id);

    await notifyUser(
      user,
      "🎫 Ticket Created - IT Support Hub",
      "🎫 Ticket Created Successfully",
      `
        <p><strong>Ticket ID:</strong> ${ticket._id}</p>
        <p><strong>Title:</strong> ${ticket.title}</p>
        <p><strong>Priority:</strong> ${ticket.priority}</p>
        <p><strong>Status:</strong> Open</p>
      `
    );

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });

  } catch (error) {
    console.error("CREATE TICKET ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create ticket",
    });
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
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.status === "Closed") {
      return res.status(400).json({
        message: "Closed tickets cannot be edited",
      });
    }

    // Update fields safely
    if (req.body.title !== undefined) {
      ticket.title = req.body.title;
    }

    if (req.body.category !== undefined) {
      ticket.category = req.body.category;
    }

    if (req.body.priority !== undefined) {
      ticket.priority = req.body.priority;
    }

    if (req.body.description !== undefined) {
      ticket.description = req.body.description;
    }

    // Attachment
    if (req.file) {
      ticket.attachment = req.file.filename;
    }

    const updatedTicket = await ticket.save();

    res.json(updatedTicket);

  } catch (error) {
    console.error("UPDATE TICKET ERROR:", error);
    res.status(500).json({ message: "Failed to update ticket" });
  }
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
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating" });
    }

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("user");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.status !== "Closed") {
      return res.status(400).json({
        message: "Feedback allowed only after ticket is closed",
      });
    }

    if (ticket.feedback?.rating) {
      return res.status(400).json({
        message: "Feedback already submitted",
      });
    }

    ticket.feedback = {
      rating,
      comment,
      submittedAt: new Date(),
    };

    await ticket.save();

    // 🔥 Notify Admin
    const admins = await User.find({ role: "admin" });

    for (const admin of admins) {
      await notifyUser(
        admin,
        "New Ticket Feedback Received - IT Support Hub",
        `⭐ New Feedback Received`,
        `
          <p><strong>Ticket ID:</strong> ${ticket._id}</p>
          <p><strong>User:</strong> ${ticket.user.name}</p>
          <p><strong>Rating:</strong> ${rating} ⭐</p>
          <p><strong>Comment:</strong> ${comment || "No comment provided"}</p>
        `
      );
    }

    res.json({ message: "Feedback submitted successfully" });

  } catch (error) {
    console.error("FEEDBACK ERROR:", error);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
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


/* =========================
   GET TICKET HISTORY
   (Closed tickets only)
========================= */
export const getTicketHistory = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      user: req.user.id,
      status: "Closed",
    }).sort({ updatedAt: -1 });

    res.json(tickets);
  } catch (error) {
    console.error("GET TICKET HISTORY ERROR:", error);
    res.status(500).json({ message: "Failed to fetch ticket history" });
  }
};


