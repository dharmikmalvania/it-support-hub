import Ticket from "../models/Ticket.js";

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
      user: req.user._id,
      title,
      category,
      priority,
      description,
      attachment: req.file ? req.file.filename : null,
    });

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
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  ticket.status = "Closed";
  await ticket.save();

  res.json({ message: "Ticket closed successfully" });
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

  res.json({ message: "Feedback submitted successfully" });
};

export const closeTicketWithFeedback = async (req, res) => {
  const { rating, comment } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (ticket.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  ticket.status = "Closed";
  ticket.feedback = {
    rating,
    comment,
    createdAt: new Date(),
  };

  await ticket.save();

  res.json({ message: "Ticket closed with feedback" });
};


