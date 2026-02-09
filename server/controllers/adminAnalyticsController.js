import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

export const getAdminOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalTechnicians = await User.countDocuments({ role: "technician" });

    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({
      status: { $in: ["Open", "In Progress"] },
    });
    const closedTickets = await Ticket.countDocuments({ status: "Closed" });

    res.json({
      totalUsers,
      totalTechnicians,
      totalTickets,
      openTickets,
      closedTickets,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load overview" });
  }
};

export const getTechnicianReport = async (req, res) => {
  const technicians = await User.find({ role: "technician" }).select(
    "name email"
  );

  const report = [];

  for (const tech of technicians) {
    const assigned = await Ticket.countDocuments({
      assignedTo: tech._id,
    });

    const closed = await Ticket.countDocuments({
      assignedTo: tech._id,
      status: "Closed",
    });

    const feedbacks = await Ticket.find({
      assignedTo: tech._id,
      "feedback.rating": { $exists: true },
    }).select("feedback.rating");

    const avgRating =
      feedbacks.length > 0
        ? (
            feedbacks.reduce((s, t) => s + t.feedback.rating, 0) /
            feedbacks.length
          ).toFixed(1)
        : null;

    report.push({
      id: tech._id,
      name: tech.name,
      email: tech.email,
      assigned,
      closed,
      avgRating,
    });
  }

  res.json(report);
};
export const getRecentTicketsReport = async (req, res) => {
  const tickets = await Ticket.find()
    .sort({ updatedAt: -1 })
    .limit(8)
    .populate("user", "name")
    .populate("assignedTo", "name")
    .select("title status updatedAt");

  res.json(tickets);
};
