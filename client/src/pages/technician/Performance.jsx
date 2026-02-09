import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/tech/performance.css";


const TechnicianPerformance = () => {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      const statsRes = await axios.get(
        "http://localhost:5000/api/technician/performance",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const historyRes = await axios.get(
        "http://localhost:5000/api/technician/work-history",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStats(statsRes.data);
      setHistory(historyRes.data);
    };

    loadData();
  }, []);

  if (!stats) return <p>Loading performance...</p>;

return (
  <div className="tech-performance-page">
    {/* HEADER */}
    <div className="tech-performance-header">
      <h1>My Performance</h1>
      <p>Your work summary and performance insights</p>
    </div>

    {/* METRICS */}
    <div className="tech-performance-stats">
      <div className="tech-perf-card">
        <h3>{stats.totalAssigned}</h3>
        <p>Total Assigned</p>
      </div>

      <div className="tech-perf-card">
        <h3>{stats.closedCount}</h3>
        <p>Tickets Closed</p>
      </div>

      <div className="tech-perf-card">
        <h3>{stats.avgResolutionTime ?? "—"} hrs</h3>
        <p>Avg Resolution Time</p>
      </div>

      <div className="tech-perf-card">
        <h3>{stats.avgRating ?? "—"}</h3>
        <p>Avg Rating</p>
      </div>
    </div>

    {/* HISTORY */}
    <div className="tech-performance-history">
      <h3>Recent Work</h3>

      {history.length === 0 ? (
        <p className="tech-empty">No closed tickets yet</p>
      ) : (
        <ul className="tech-history-list">
          {history.map((t) => (
            <li key={t._id} className="tech-history-item">
              <span className="history-title">{t.title}</span>
              <span className="history-rating">
                {t.feedback?.rating ? `⭐ ${t.feedback.rating}` : "No feedback"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

};

export default TechnicianPerformance;
