import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

export const getTechnicianDashboard = async (req, res) => {
  try {
    // req.user is set by protect middleware
    const technician = await User.findById(req.user._id).select("-password");

    if (!technician || technician.role !== "technician") {
      return res.status(404).json({ message: "Technician not found" });
    }

    res.json({
      message: "Technician dashboard data",
      technician: {
        id: technician._id,
        name: technician.name,
        email: technician.email,
        profile: technician.technicianProfile,
        createdAt: technician.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const technicianId = req.user._id;

    const tickets = await Ticket.find({
      assignedTo: technicianId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to load tickets" });
  }
};

export const getTicketDetails = async (req, res) => {
  const ticket = await Ticket.findOne({
    _id: req.params.id,
    assignedTo: req.user._id,
  }).populate("user", "name email");

  res.json(ticket); // feedback included
};

export const getTechnicianStats = async (req, res) => {
  const techId = req.user._id;

  const totalAssigned = await Ticket.countDocuments({
    assignedTo: techId,
  });

  const openTickets = await Ticket.countDocuments({
    assignedTo: techId,
    status: { $in: ["Open", "In Progress"] },
  });

  const closedTickets = await Ticket.countDocuments({
    assignedTo: techId,
    status: "Closed",
  });

  const feedbacks = await Ticket.find({
    assignedTo: techId,
    "feedback.rating": { $exists: true },
  }).select("feedback.rating");

  const avgRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, t) => sum + t.feedback.rating, 0) /
          feedbacks.length
        ).toFixed(1)
      : null;

  res.json({
    totalAssigned,
    openTickets,
    closedTickets,
    avgRating,
  });
};

export const getRecentTickets = async (req, res) => {
  const tickets = await Ticket.find({
    assignedTo: req.user._id,
  })
    .sort({ updatedAt: -1 })
    .limit(5)
    .select("title status priority updatedAt");

  res.json(tickets);
};

export const getTechnicianPerformance = async (req, res) => {
  try {
    const techId = req.user._id;

    const tickets = await Ticket.find({ assignedTo: techId });

    const totalAssigned = tickets.length;
    const closedTickets = tickets.filter(t => t.status === "Closed");

    // ⏱ Avg resolution time (in hours)
    let avgResolutionTime = null;
    if (closedTickets.length > 0) {
      const totalTime = closedTickets.reduce((sum, t) => {
        if (!t.closedAt) return sum;
        return sum + (t.closedAt - t.createdAt);
      }, 0);

      avgResolutionTime = (
        totalTime / closedTickets.length / (1000 * 60 * 60)
      ).toFixed(1);
    }

    // ⭐ Average feedback rating
    const feedbacks = closedTickets.filter(t => t.feedback?.rating);
    const avgRating =
      feedbacks.length > 0
        ? (
            feedbacks.reduce((sum, t) => sum + t.feedback.rating, 0) /
            feedbacks.length
          ).toFixed(1)
        : null;

    res.json({
      totalAssigned,
      closedCount: closedTickets.length,
      avgResolutionTime,
      avgRating,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load performance data" });
  }
};

export const getTechnicianWorkHistory = async (req, res) => {
  const tickets = await Ticket.find({
    assignedTo: req.user._id,
    status: "Closed",
  })
    .sort({ closedAt: -1 })
    .limit(5)
    .select("title closedAt feedback.rating");

  res.json(tickets);
};

