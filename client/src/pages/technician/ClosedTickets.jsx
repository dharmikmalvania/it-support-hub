import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/tech/closedtickets.css";

const ClosedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/technician/tickets/closed",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTickets(res.data);
    };

    fetchTickets();
  }, []);

 return (
  <div className="tech-tickets-page">
    {/* HEADER */}
    <div className="tech-tickets-header">
      <h1>Closed Tickets</h1>
      <p>Tickets you have successfully resolved</p>
    </div>

    {tickets.length === 0 ? (
      <div className="tech-empty">
        <p>No closed tickets yet</p>
      </div>
    ) : (
      <div className="tech-ticket-list">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="tech-ticket-card closed-card">
            {/* TITLE */}
            <div className="tech-ticket-title">
              <h3>{ticket.title}</h3>
            </div>

            {/* META */}
            <div className="tech-closed-meta">
              <p>
                <b>User:</b> {ticket.user.name}
              </p>

              <p>
                <b>Closed At:</b>{" "}
                {new Date(ticket.closedAt).toLocaleString()}
              </p>

              <p>
                <b>Rating:</b>{" "}
                <span className="tech-rating">
                  {ticket.feedback?.rating
                    ? `⭐ ${ticket.feedback.rating}`
                    : "—"}
                </span>
              </p>
            </div>

            {/* ACTION */}
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

export default ClosedTickets;
