import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ticketDetail.css";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        if (!token) {
          alert("Session expired. Please login again.");
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/tickets/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTicket(res.data);
      } catch (error) {
        alert("Failed to load ticket");
        navigate("/user/my-tickets");
      }
    };

    fetchTicket();
  }, [id]);

  if (!ticket) return <p>Loading ticket...</p>;

  return (
    <div className="ticket-detail-page">
      <div className="ticket-detail-header">
        <div>
          <h1>{ticket.title}</h1>
          <p>Your support request details</p>
        </div>
        <button onClick={() => navigate(-1)}>← Back</button>
      </div>

      <div className="ticket-detail-grid">
        {/* DETAILS */}
        <div className="ticket-detail-card">
          <div className="meta-grid">
            <div>
              <span>Status</span>
              <p className={`status ${ticket.status.toLowerCase()}`}>
                {ticket.status}
              </p>
            </div>

            <div>
              <span>Priority</span>
              <p className={`priority ${ticket.priority.toLowerCase()}`}>
                {ticket.priority}
              </p>
            </div>

            <div>
              <span>Category</span>
              <p>{ticket.category}</p>
            </div>
          </div>

          <h3>Description</h3>
          <p>{ticket.description}</p>

          {ticket.status === "Closed" && ticket.resolution && (
            <div className="resolution-box">
              <h3>Resolution</h3>
              <p><b>Summary:</b> {ticket.resolution.summary}</p>
              <p>
                <b>Fixed At:</b>{" "}
                {new Date(ticket.resolution.fixedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* FEEDBACK */}
        <div className="ticket-feedback-card">
          <h3>Feedback</h3>

          {ticket.feedback ? (
            <>
              <div className="rating-box">
                ⭐ {ticket.feedback.rating} / 5
              </div>
              <p>{ticket.feedback.comment}</p>
            </>
          ) : (
            <p className="no-feedback">
              Feedback not submitted yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
