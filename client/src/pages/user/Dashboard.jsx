import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
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
        console.error("Failed to load stats");
      }
    };

    fetchStats();
  }, []);

return (
  <div className="user-layout">
    <Sidebar />

    <main className="main-content">
      {/* HEADER */}
      <div className="dashborad-container">
        <h1>User Dashboard</h1>
        <p>Welcome back 👋 Here’s your support overview</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Tickets</span>
          <h2>{stats.total}</h2>
        </div>

        <div className="stat-card">
          <span>Open Tickets</span>
          <h2>{stats.open}</h2>
        </div>

        <div className="stat-card">
          <span>Closed Tickets</span>
          <h2>{stats.closed}</h2>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="content-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <a href="/user/raise-ticket">➕ Raise Ticket</a>
          <a href="/user/my-tickets">📄 My Tickets</a>
        </div>
      </div>
    </main>
  </div>
);


};

export default Dashboard;
