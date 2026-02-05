import Ticket from "../models/Ticket.js";

// SUMMARY
export const getDashboardSummary = async (req, res) => {
  try {
    const total = await Ticket.countDocuments();
    const open = await Ticket.countDocuments({ status: "Open" });
    const closed = await Ticket.countDocuments({ status: "Closed" });

    res.json({
      total,
      open,
      closed,
      avgResolution: "2.4 hrs",
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard summary error" });
  }
};

// RECENT TICKETS
export const getRecentTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Recent tickets error" });
  }
};

// CHART DATA
export const getChartData = async (req, res) => {
  try {
    const open = await Ticket.countDocuments({ status: "Open" });
    const closed = await Ticket.countDocuments({ status: "Closed" });

    res.json([
      { name: "Open", value: open },
      { name: "Closed", value: closed },
    ]);
  } catch (err) {
    res.status(500).json({ message: "Chart data error" });
  }
};
