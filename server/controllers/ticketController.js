import Ticket from "../models/Ticket.js";

// DASHBOARD STATS
export const getTicketStats = async (req, res) => {
  try {
    const total = await Ticket.countDocuments({ user: req.user._id });
    const open = await Ticket.countDocuments({
      user: req.user._id,
      status: "Open",
    });
    const closed = await Ticket.countDocuments({
      user: req.user._id,
      status: "Closed",
    });

    res.json({ total, open, closed });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// UPDATE TICKET
export const updateTicket = async (req, res) => {
  try {
    const { title, priority, description } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Ensure user owns the ticket
    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    ticket.title = title || ticket.title;
    ticket.priority = priority || ticket.priority;
    ticket.description = description || ticket.description;

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * CREATE NEW TICKET
 */
export const createTicket = async (req, res) => {
  try {
    const { title, category, priority, description } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET LOGGED-IN USER TICKETS
 */
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * CLOSE TICKET
 */
export const closeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = "Closed";
    await ticket.save();

    res.json({ message: "Ticket closed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
