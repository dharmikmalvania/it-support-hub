import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "../../styles/dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();

  // 🔹 Mock dynamic stats (replace with API later)
  const [stats, setStats] = useState({
    total: 3,
    open: 1,
    closed: 2,
    avgResolution: "2.4 hrs",
  });

  const [recentTickets] = useState([
    { title: "Keyboard not working", status: "Open" },
    { title: "Network speed is slow", status: "Closed" },
    { title: "Software install issue", status: "Closed" },
  ]);

  const [notifications] = useState([
    "Your ticket has been created successfully",
    "Feedback submitted successfully",
  ]);

  useEffect(() => {
    // 🔮 Future API call
    // fetchDashboardStats()
  }, []);

 return (
  <div className="user-layout">
    <Sidebar />

    <main className="page-content">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome 👋</h1>
          <p>Manage your support tickets easily</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions">
        <button
          className="action-btn primary"
          onClick={() => navigate("/user/raise-ticket")}
        >
          ➕ Raise Ticket
        </button>
        <button
          className="action-btn"
          onClick={() => navigate("/user/my-tickets")}
        >
          🎫 My Tickets
        </button>
        <button
          className="action-btn"
          onClick={() => navigate("/user/history")}
        >
          📜 History
        </button>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <span className="stat-value">{stats.total}</span>
        </div>

        <div className="stat-card highlight">
          <h3>Open Tickets</h3>
          <span className="stat-value open">{stats.open}</span>
        </div>

        <div className="stat-card">
          <h3>Closed Tickets</h3>
          <span className="stat-value closed">{stats.closed}</span>
        </div>

        <div className="stat-card">
          <h3>Avg Resolution</h3>
          <span className="stat-value">{stats.avgResolution}</span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="dashboard-grid">
        {/* RECENT TICKETS */}
        <div className="dashboard-card">
          <h2>Recent Tickets</h2>
          <ul className="ticket-list">
            {recentTickets.map((t, i) => (
              <li key={i}>
                <span className="ticket-title">{t.title}</span>
                <span className={`status ${t.status.toLowerCase()}`}>
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* NOTIFICATIONS */}
        <div className="dashboard-card">
          <h2>Notifications</h2>
          <ul className="notification-list">
            {notifications.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>

          <button
            className="link-btn"
            onClick={() => navigate("/user/notifications")}
          >
            View all →
          </button>
        </div>
      </div>

      {/* EXTRA INSIGHTS */}
      <div className="dashboard-grid">
        <div className="dashboard-card soft">
          <h2>Performance Insights</h2>
          <p>✔ You close tickets faster than average users</p>
          <p>✔ 80% issues resolved within same day</p>
        </div>

        <div className="dashboard-card soft">
          <h2>Account Health</h2>
          <p>✔ Profile completed</p>
          <p>✔ Email verified</p>
          <p className="warn">⚠ Add phone number for faster support</p>
        </div>
      </div>
    </main>
  </div>
);

};

export default Dashboard;
