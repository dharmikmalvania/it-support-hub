import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/admin/tech_profile.css";


const TechnicianProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/admin/technicians/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(res.data);
    };

    fetchProfile();
  }, []);

  if (!data) return <p>Loading...</p>;

 return (
  <div className="admin-tech-profile">
    {/* HEADER */}
    <div className="tech-profile-header">
      <div className="tech-avatar">
        {data.technician.name.charAt(0)}
      </div>

      <div className="tech-info">
        <h2>{data.technician.name}</h2>
        <p>{data.technician.email}</p>
      </div>
    </div>

    {/* STATS */}
    <div className="tech-profile-stats">
      <div className="tech-stat">
        <h3>{data.stats.totalAssigned}</h3>
        <p>Total Closed Tickets</p>
      </div>

      <div className="tech-stat">
        <h3>{data.stats.avgRating ?? "—"}</h3>
        <p>Average Rating</p>
      </div>
    </div>

    {/* HISTORY */}
    <div className="tech-work-history">
      <h3>Work History</h3>

      {data.tickets.length === 0 ? (
        <p className="empty-history">No completed tickets yet</p>
      ) : (
        <ul className="history-list">
          {data.tickets.map((t) => (
            <li key={t._id} className="history-item">
              <span className="history-title">{t.title}</span>
              <span className="history-rating">
                {t.feedback?.rating
                  ? `⭐ ${t.feedback.rating}`
                  : "No rating"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

};

export default TechnicianProfile;
