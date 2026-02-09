import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

export const getTechnicianProfile = async (req, res) => {
  try {
    const techId = req.params.id;

    const tech = await User.findById(techId).select("name email");
    if (!tech) {
      return res.status(404).json({ message: "Technician not found" });
    }

    const tickets = await Ticket.find({
      assignedTo: techId,
      status: "Closed",
    })
      .populate("user", "name")
      .sort({ closedAt: -1 });

    const avgRating =
      tickets.filter(t => t.feedback?.rating).length > 0
        ? (
            tickets.reduce(
              (s, t) => s + (t.feedback?.rating || 0),
              0
            ) / tickets.filter(t => t.feedback?.rating).length
          ).toFixed(1)
        : null;

    res.json({
      technician: tech,
      stats: {
        totalAssigned: tickets.length,
        avgRating,
      },
      tickets,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load technician profile" });
  }
};
