import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import notifyUser from "../utils/notify.js";


export const getMyTickets = async (req, res) => {
  try { 
    const technicianId = req.user._id;

    const tickets = await Ticket.find({
      assignedTo: technicianId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    console.error("GET TECHNICIAN TICKETS ERROR:", error);
    res.status(500).json({
      message: "Failed to load assigned tickets",
    });
  }
};

export const getTicketDetails = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      assignedTo: req.user._id, // 🔒 security check
    }).populate("user", "name email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Failed to load ticket details" });
  }
};

export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Open", "In Progress", "Waiting for User", "Closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status;
    await ticket.save();

    const user = await User.findById(ticket.user);

    await notifyUser(
      user,
      "Ticket Status Updated - IT Support Hub",
      "🔄 Ticket Status Updated",
      `
        <p><strong>Ticket ID:</strong> ${ticket._id}</p>
        <p><strong>Title:</strong> ${ticket.title}</p>
        <p><strong>Status:</strong> 
          <span style="color:green;">${ticket.status}</span>
        </p>
      `
    );

    res.json({ message: "Ticket status updated", ticket });

  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);
    res.status(500).json({ message: "Status update failed" });
  }
};

export const startTicketWork = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = "In Progress";
    ticket.startedAt = new Date();

    ticket.workLog.push({
      message: "Technician started working on the issue",
      by: req.user._id,
    });

    await ticket.save();

    const user = await User.findById(ticket.user);

    await notifyUser(
      user,
      "Work Started - IT Support Hub",
      "🚀 Technician Started Working",
      `
        <p>Your ticket is now in progress.</p>
        <p><strong>Ticket ID:</strong> ${ticket._id}</p>
        <p><strong>Title:</strong> ${ticket.title}</p>
      `
    );

    res.json(ticket);

  } catch (error) {
    console.error("START WORK ERROR:", error);
    res.status(500).json({ message: "Failed to start work" });
  }
};

export const closeTicket = async (req, res) => {
  try {
    const { summary, rootCause } = req.body;

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = "Closed";
    ticket.closedAt = new Date();
    ticket.resolution = {
      summary,
      rootCause,
      fixedAt: new Date(),
    };

    ticket.workLog.push({
      message: "Ticket closed with resolution",
      by: req.user._id,
    });

    await ticket.save();

    const user = await User.findById(ticket.user);

    await notifyUser(
      user,
      "Ticket Resolved - IT Support Hub",
      "✅ Ticket Resolved",
      `
        <p>Your issue has been resolved successfully.</p>
        <p><strong>Ticket ID:</strong> ${ticket._id}</p>
        <p><strong>Title:</strong> ${ticket.title}</p>
        <p>Please log in and provide feedback.</p>
      `
    );

    res.json(ticket);

  } catch (error) {
    console.error("CLOSE TICKET ERROR:", error);
    res.status(500).json({ message: "Failed to close ticket" });
  }
};

export const addWorkLog = async (req, res) => {
  const { message } = req.body;

  const ticket = await Ticket.findOne({
    _id: req.params.id,
    assignedTo: req.user._id,
  });

  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  ticket.workLog.push({
    message,
    by: req.user._id,
  });

  await ticket.save();
  res.json(ticket);
};

export const getMyClosedTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      assignedTo: req.user._id,
      status: "Closed",
    })
      .populate("user", "name email")
      .sort({ closedAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to load closed tickets" });
  }
};

export const getMyActiveTickets = async (req, res) => {
  try {
    

    const tickets = await Ticket.find({
      assignedTo: req.user._id,
      status: { $ne: "Closed" },
    })
      .populate("user", "name email")
      .sort({ updatedAt: -1 });

    res.json(tickets);
  } catch (error) {
    console.error("ACTIVE TICKETS ERROR:", error);
    res.status(500).json({ message: "Failed to load active tickets" });
  }
};



