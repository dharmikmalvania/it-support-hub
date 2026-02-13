import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import notifyUser from "../utils/notify.js";




export const assignTicketToTechnician = async (req, res) => {
  try {
    const { ticketId, technicianId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const technician = await User.findById(technicianId);
    const user = await User.findById(ticket.user);

    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    ticket.assignedTo = technicianId;
    await ticket.save();

    // 🔔 Notify Technician
    await notifyUser(
      technician,
      "New Ticket Assigned - IT Support Hub",
      "🛠 New Ticket Assigned",
      `
        <p>You have been assigned a new ticket.</p>
        <p><strong>Ticket ID:</strong> ${ticket._id}</p>
        <p><strong>Title:</strong> ${ticket.title}</p>
        <p><strong>Priority:</strong> ${ticket.priority}</p>
      `
    );

    // 🔔 Notify User
    await notifyUser(
      user,
      "Technician Assigned - IT Support Hub",
      "👨‍🔧 Technician Assigned",
      `
        <p>Your ticket has been assigned to a technician.</p>
        <p><strong>Ticket ID:</strong> ${ticket._id}</p>
        <p><strong>Title:</strong> ${ticket.title}</p>
      `
    );

    res.json({ message: "Ticket assigned successfully" });

  } catch (error) {
    console.error("ASSIGN ERROR:", error);
    res.status(500).json({ message: "Assignment failed" });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

export const getOpenTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      status: "Open",
      assignedTo: { $exists: false }, // 🔥 KEY LINE
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch open tickets" });
  }
};

export const getTicketHistory = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      status: "Closed",
      assignedTo: { $exists: true }, // 🔥 only worked tickets
    })
      .populate("user", "name email")
      .populate("assignedTo", "name email")
      .sort({ closedAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to load ticket history" });
  }
};

export const getAdminTicketDetails = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("user", "name email")
      .populate("assignedTo", "name email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    console.error("ADMIN TICKET DETAILS ERROR:", error);
    res.status(500).json({ message: "Failed to load ticket details" });
  }
};


