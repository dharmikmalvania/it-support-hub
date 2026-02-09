import Ticket from "../models/Ticket.js";


/**
 * @desc    Get all tickets assigned to logged-in technician
 * @route   GET /api/technician/tickets
 * @access  Technician (Protected)
 */
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

/**
 * @desc    Get single ticket details (technician)
 * @route   GET /api/technician/tickets/:id
 * @access  Technician (Protected)
 */
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


/**
 * @desc    Update ticket status (Open → Closed)
 * @route   PATCH /api/technician/tickets/:id/status
 * @access  Technician (Protected)
 */
export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Open", "Closed"].includes(status)) {
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

    res.json({ message: "Ticket status updated", ticket });
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
};

export const startTicketWork = async (req, res) => {
  const ticket = await Ticket.findOne({
    _id: req.params.id,
    assignedTo: req.user._id,
  });

  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  ticket.status = "In Progress";
  ticket.startedAt = new Date();
  ticket.workLog.push({
    message: "Technician started working on the issue",
    by: req.user._id,
  });

  await ticket.save();
  res.json(ticket);
};


export const closeTicket = async (req, res) => {
  const { summary, rootCause } = req.body;

  const ticket = await Ticket.findOne({
    _id: req.params.id,
    assignedTo: req.user._id,
  });

  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

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
  res.json(ticket);
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



