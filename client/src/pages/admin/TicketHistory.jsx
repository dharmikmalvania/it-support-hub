import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/admin/ticketshistory.css";

const TicketHistory = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/ticket-history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTickets(res.data);
      } catch (error) {
        console.error("Failed to load ticket history", error);
      }
    };

    fetchHistory();
  }, [token]);

return (
  <div className="admin-history-page">
    {/* HEADER */}
    <div className="admin-page-header">
      <h2>Ticket History</h2>
      <p>All resolved tickets with technician performance</p>
    </div>

    {/* TABLE */}
    <div className="admin-history-table">
      <table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>User</th>
            <th>Technician</th>
            <th>Closed At</th>
            <th>Rating</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-row">
                No closed tickets found
              </td>
            </tr>
          ) : (
            tickets.map((t) => (
              <tr key={t._id}>
                <td>
                  <div className="ticket-cell">
                    <span className="ticket-title">{t.title}</span>
                  </div>
                </td>

                <td>{t.user?.name}</td>

                <td>{t.assignedTo?.name || "—"}</td>

                <td className="muted">
                  {new Date(t.closedAt).toLocaleString()}
                </td>

                <td>
                  <span className="rating-badge">
                    {t.feedback?.rating
                      ? `⭐ ${t.feedback.rating}`
                      : "—"}
                  </span>
                </td>

                <td className="action-cell">
                  <button
                    className="admin-view-btn"
                    onClick={() =>
                      navigate(`/admin/tickets/${t._id}`)
                    }
                  >
                    View →
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* NOTE */}
    <p className="admin-note">
      📌 Ratings are submitted by users after ticket resolution.
    </p>
  </div>
);

};

export default TicketHistory;
