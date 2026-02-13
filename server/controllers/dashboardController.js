import Ticket from "../models/Ticket.js";

/* ===============================
   SUMMARY
================================ */
export const getDashboardSummary = async (req, res) => {
  try {
    const total = await Ticket.countDocuments();
    const open = await Ticket.countDocuments({ status: "Open" });
    const closed = await Ticket.countDocuments({ status: "Closed" });

    return res.status(200).json({
      total,
      open,
      closed,
      avgResolution: "2.4 hrs", // static for now
    });

  } catch (err) {
    console.error("❌ Dashboard Summary Error:", err);

    return res.status(500).json({
      success: false,
      message: "Dashboard summary error",
      error: err.message,
    });
  }
};


/* ===============================
   RECENT TICKETS
================================ */
export const getRecentTickets = async (req, res) => {
  try {
    // safer sorting using _id (works even without timestamps)
    const tickets = await Ticket.find()
      .sort({ _id: -1 })
      .limit(5);

    return res.status(200).json(tickets);

  } catch (err) {
    console.error("❌ Recent Tickets Error:", err);

    return res.status(500).json({
      success: false,
      message: "Recent tickets error",
      error: err.message,
    });
  }
};


/* ===============================
   CHART DATA
================================ */
export const getChartData = async (req, res) => {
  try {
    const open = await Ticket.countDocuments({ status: "Open" });
    const closed = await Ticket.countDocuments({ status: "Closed" });

    return res.status(200).json([
      { name: "Open", value: open },
      { name: "Closed", value: closed },
    ]);

  } catch (err) {
    console.error("❌ Chart Data Error:", err);

    return res.status(500).json({
      success: false,
      message: "Chart data error",
      error: err.message,
    });
  }
};
