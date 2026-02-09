import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/tech/dash_technician.css";

const TechnicianDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const statsRes = await axios.get(
        "http://localhost:5000/api/technician/stats",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const recentRes = await axios.get(
        "http://localhost:5000/api/technician/recent",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStats(statsRes.data);
      setRecent(recentRes.data);
    };

    fetchData();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

 return (
  <div className="tech-dashboard">
    <header className="tech-header">
      <h1>Technician Dashboard</h1>
      <p>Overview of your assigned tickets & performance</p>
    </header>

    {/* STATS */}
    <section className="tech-stats">
      <div className="tech-stat-card">
        <h3>{stats.totalAssigned}</h3>
        <p>Total Assigned</p>
      </div>

      <div className="tech-stat-card accent-blue">
        <h3>{stats.openTickets}</h3>
        <p>Open Tickets</p>
      </div>

      <div className="tech-stat-card accent-green">
        <h3>{stats.closedTickets}</h3>
        <p>Closed Tickets</p>
      </div>

      <div className="tech-stat-card accent-purple">
        <h3>{stats.avgRating ?? "—"}</h3>
        <p>Avg Rating</p>
      </div>
    </section>

    {/* RECENT */}
    <section className="tech-recent">
      <div className="tech-recent-header">
        <h3>Recent Tickets</h3>
      </div>

      {recent.length === 0 ? (
        <p className="tech-empty">No recent activity</p>
      ) : (
        <ul className="tech-ticket-list">
          {recent.map((t) => (
            <li key={t._id} className="tech-ticket-item">
              <span className="ticket-title">{t.title}</span>
              <span className={`tech-status ${t.status.toLowerCase()}`}>
                {t.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  </div>
);

};

export default TechnicianDashboard;
