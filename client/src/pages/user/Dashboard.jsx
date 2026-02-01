import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
  });

  const [recentTickets, setRecentTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${userInfo.token}`,
        };

        const statsRes = await axios.get(
          "http://localhost:5000/api/tickets/stats",
          { headers }
        );

        const ticketsRes = await axios.get(
          "http://localhost:5000/api/tickets/my",
          { headers }
        );

        const notifRes = await axios.get(
          "http://localhost:5000/api/notifications",
          { headers }
        );

        setStats(statsRes.data);
        setRecentTickets(ticketsRes.data.slice(0, 5));
        setNotifications(notifRes.data.slice(0, 4));
      } catch (error) {
        console.error("Dashboard load failed");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-layout">
      <Sidebar />

      <main className="main-content">
        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Welcome 👋</h1>
          <p>Manage your support tickets easily</p>
        </div>

        {/* QUICK ACTIONS */}
        <div className="quick-actions">
          <a href="/user/raise-ticket" className="qa-btn">
            ➕ Raise Ticket
          </a>
          <a href="/user/my-tickets" className="qa-btn">
            📂 My Tickets
          </a>
          <a href="/user/history" className="qa-btn">
            🕒 History
          </a>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Tickets</h3>
            <span>{stats.total}</span>
          </div>
          <div className="stat-card">
            <h3>Open</h3>
            <span>{stats.open}</span>
          </div>
          <div className="stat-card">
            <h3>Closed</h3>
            <span>{stats.closed}</span>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="dashboard-grid">
          {/* RECENT TICKETS */}
          <div className="panel">
            <h2>Recent Tickets</h2>
            {recentTickets.length === 0 ? (
              <p className="muted">No tickets yet</p>
            ) : (
              <ul>
                {recentTickets.map((t) => (
                  <li key={t._id}>
                    <span>{t.title}</span>
                    <small className={t.status.toLowerCase()}>
                      {t.status}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <div className="panel">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
              <p className="muted">No notifications</p>
            ) : (
              <ul>
                {notifications.map((n) => (
                  <li key={n._id}>{n.message}</li>
                ))}
              </ul>
            )}
            <a href="/user/notifications" className="view-all">
              View all →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
