import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/adminDashboard.css";

const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [techReport, setTechReport] = useState([]);
  const [recentTickets, setRecentTickets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const overviewRes = await axios.get(
          "http://localhost:5000/api/admin/analytics/overview",
          { headers }
        );

        const techRes = await axios.get(
          "http://localhost:5000/api/admin/analytics/technicians",
          { headers }
        );

        const recentRes = await axios.get(
          "http://localhost:5000/api/admin/analytics/recent-tickets",
          { headers }
        );

        setOverview(overviewRes.data);
        setTechReport(techRes.data);
        setRecentTickets(recentRes.data);
      } catch (err) {
        console.error("Admin dashboard error", err);
      }
    };

    loadData();
  }, []);

  /* ===== SKELETON LOADING ===== */
  if (!overview) {
    return (
      <div className="admin-container">
        <div className="skeleton-title" />
        <div className="skeleton-subtitle" />

        <div className="stats-grid">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>

        <div className="skeleton-block" />
        <div className="skeleton-block" />
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* HEADER */}
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">
          System overview & performance analytics
        </p>
      </div>

      {/* QUICK INSIGHT STRIP (STATIC) */}
      <div className="admin-insight">
        <p>
          📊 <b>System Health:</b> Tickets are being resolved efficiently.
          Technician performance is within optimal range.
        </p>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="stats-grid">
        <StatCard title="Users" value={overview.totalUsers} />
        <StatCard title="Technicians" value={overview.totalTechnicians} />
        <StatCard title="Total Tickets" value={overview.totalTickets} />
        <StatCard title="Open Tickets" value={overview.openTickets} />
        <StatCard title="Closed Tickets" value={overview.closedTickets} />
      </div>

      {/* ===== TECH PERFORMANCE ===== */}
      <div className="section">
        <div className="section-header">
          <h2>Technician Performance</h2>
          <span className="section-hint">Last 30 days</span>
        </div>

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Assigned</th>
                <th>Closed</th>
                <th>Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              {techReport.map((tech) => (
                <tr key={tech.id}>
                  <td>{tech.name}</td>
                  <td>{tech.assigned}</td>
                  <td>{tech.closed}</td>
                  <td>{tech.avgRating ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== RECENT ACTIVITY ===== */}
      <div className="section">
        <div className="section-header">
          <h2>Recent Ticket Activity</h2>
          <span className="section-hint">Live updates</span>
        </div>

        <ul className="activity-list">
          {recentTickets.map((ticket) => (
            <li key={ticket._id} className="activity-item">
              <span className="ticket-title">{ticket.title}</span>
              <span className={`status ${ticket.status.toLowerCase()}`}>
                {ticket.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h3>{value}</h3>
    <p>{title}</p>
  </div>
);

export default AdminDashboard;
