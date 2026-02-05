import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import "../../styles/dashboard.css";
import TicketStatusChart from "../../components/TicketStatusChart";


const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    avgResolution: "--",
  });

  const [recentTickets, setRecentTickets] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // SUMMARY
        const summaryRes = await fetch("/api/dashboard/summary");
        const summaryData = await summaryRes.json();
        setStats(summaryData);

        // RECENT TICKETS
        const recentRes = await fetch("/api/dashboard/recent-tickets");
        const recentData = await recentRes.json();
        setRecentTickets(recentData);

        // CHART DATA
        const chartRes = await fetch("/api/dashboard/charts");
        const chartJson = await chartRes.json();
        setChartData(chartJson);
      } catch (err) {
        console.error("Dashboard load failed", err);
      }
    };

    loadDashboard();
  }, []);

  return (
  <main className="dashboard">
    {/* HERO */}
    <section className="dashboard-header">
      <div>
        <h2>Welcome back 👋</h2>
        <p>
          You have <strong>{stats.open}</strong> open tickets today. Let’s resolve
          them 🚀
        </p>
      </div>

      <div className="hero-actions">
        <button
          className="action-btn primary"
          onClick={() => navigate("/user/raise-ticket")}
        >
          + Raise Ticket
        </button>
        <button
          className="action-btn"
          onClick={() => navigate("/user/my-tickets")}
        >
          My Tickets
        </button>
      </div>
    </section>

    {/* STATS */}
    <section className="stats-grid">
      <div className="stat-card">
        <p>Total Tickets</p>
        <h3>{stats.total}</h3>
      </div>

      <div className="stat-card highlight">
        <p>Open</p>
        <h3>{stats.open}</h3>
      </div>

      <div className="stat-card">
        <p>Closed</p>
        <h3>{stats.closed}</h3>
      </div>

      <div className="stat-card">
        <p>Avg Resolution</p>
        <h3>{stats.avgResolution}</h3>
      </div>
    </section>

        {/* INSIGHT STRIP */}
<section
  style={{
    marginBottom: "32px",
    padding: "22px 26px",
    borderRadius: "22px",
    background: "linear-gradient(135deg, #EEF1FF, #FFFFFF)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 18px 45px rgba(0,0,0,0.08)",
  }}
>
  <div>
    <h4 style={{ margin: 0, color: "#2d2f55" }}>
      🎯 Productivity Insight
    </h4>
    <p style={{ marginTop: "6px", color: "#555" }}>
      You resolve tickets faster than <strong>68%</strong> of users.
    </p>
  </div>

  <div
    style={{
      height: "40px",
      width: "1px",
      background: "#D2DAFF",
    }}
  />

  <div>
    <h4 style={{ margin: 0, color: "#2d2f55" }}>
      🚀 Quick Tip
    </h4>
    <p style={{ marginTop: "6px", color: "#555" }}>
      Adding screenshots improves resolution speed by <strong>35%</strong>.
    </p>
  </div>
</section>
<hr
  style={{
    border: "none",
    height: "1px",
    background: "linear-gradient(to right, transparent, #D2DAFF, transparent)",
    margin: "30px 0",
  }}
/>


    {/* GRID */}
    <section className="dashboard-grid">
      {/* TICKET STATUS */}
      <div className="card">
        <div className="card-header">
          <h3>Ticket Status</h3>
          <span>Open vs Closed</span>
        </div>

        <TicketStatusChart
          openCount={stats.open}
          closedCount={stats.closed}
        />
      </div>

      {/* RECENT TICKETS */}
      <div className="card">
        <div className="card-header">
          <h3>Recent Tickets</h3>
          <button
            className="link-btn"
            onClick={() => navigate("/user/my-tickets")}
          >
            View all →
          </button>
        </div>

        <ul className="ticket-list">
          {recentTickets.map((t) => (
            <li key={t._id}>
              <span>
                <strong>{t.title}</strong>
                <br />
                <small>#{t._id.slice(-5)}</small>
              </span>

              <span
                className={`badge ${
                  t.status.toLowerCase() === "open" ? "open" : "closed"
                }`}
              >
                {t.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* TIP */}
    <div className="dashboard-tip">
      💡 Tip: Clear descriptions help resolve tickets faster.
    </div>
  </main>
);

};

export default Dashboard;
