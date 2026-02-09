import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/tech/opentickets.css";

const ActiveTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/technician/tickets/active",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTickets(res.data);
      } catch (error) {
        console.error("Failed to load active tickets", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="tech-tickets-page">
      {/* HEADER */}
      <div className="tech-tickets-header">
        <h1>My Active Tickets</h1>
        <p>Tickets currently assigned to you</p>
      </div>

      {tickets.length === 0 ? (
        <div className="tech-empty">
          <p>No active tickets</p>
        </div>
      ) : (
        <div className="tech-ticket-list">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="tech-ticket-card">
              <div className="tech-ticket-title">
                <h3>{ticket.title}</h3>
              </div>

              <div className="tech-ticket-meta">
                <span>
                  <b>Status:</b>{" "}
                  <span className={`tech-badge ${ticket.status.toLowerCase()}`}>
                    {ticket.status}
                  </span>
                </span>

                <span>
                  <b>Priority:</b>{" "}
                  <span
                    className={`tech-priority ${ticket.priority.toLowerCase()}`}
                  >
                    {ticket.priority}
                  </span>
                </span>
              </div>

              <p className="tech-ticket-user">
                <b>User:</b> {ticket.user.name}
              </p>

              <div className="tech-ticket-action">
                <button
                  className="tech-view-btn"
                  onClick={() =>
                    navigate(`/technician/tickets/${ticket._id}`)
                  }
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveTickets;
