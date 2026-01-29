import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo?.token) return;

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/tickets/stats",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setStats(res.data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-page">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p className="welcome-text">
          Welcome back 👋 Here’s your support overview
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Tickets</h3>
          <p className="card-value">{stats.total}</p>
        </div>

        <div className="card">
          <h3>Open Tickets</h3>
          <p className="card-value">{stats.open}</p>
        </div>

        <div className="card">
          <h3>Closed Tickets</h3>
          <p className="card-value">{stats.closed}</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <a href="/user/raise-ticket" className="action-btn primary">
            ➕ Raise Ticket
          </a>

          <a href="/user/my-tickets" className="action-btn secondary">
            📄 My Tickets
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
