import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ticketDetail.css";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setTicket(res.data);
      } catch (error) {
        console.error("Failed to load ticket");
      }
    };

    fetchTicket();
  }, [id]);

  if (!ticket) return <p>Loading ticket...</p>;


return (
  <div className="user-layout">
    <main className="main-content">
      <div className="ticket-detail-page">

        {/* HEADER */}
        <div className="ticket-detail-header">
          <div>
            <h1>Ticket Details</h1>
            <p>Detailed view of your support request</p>
          </div>

          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="ticket-detail-grid">

          {/* LEFT – DETAILS */}
          <div className="ticket-detail-card">
            <div className="meta-grid">
              <div className="meta-item">
                <span>Title</span>
                <p>{ticket.title}</p>
              </div>

              <div className="meta-item">
                <span>Category</span>
                <p>{ticket.category}</p>
              </div>

              <div className="meta-item">
                <span>Priority</span>
                <p className={`priority ${ticket.priority.toLowerCase()}`}>
                  {ticket.priority}
                </p>
              </div>

              <div className="meta-item">
                <span>Status</span>
                <p className={`status ${ticket.status.toLowerCase()}`}>
                  {ticket.status}
                </p>
              </div>
            </div>

            <div className="detail-section">
              <h3>Description</h3>
              <p>{ticket.description}</p>
            </div>
          </div>

          {/* RIGHT – FEEDBACK */}
          <div className="ticket-feedback-card">
            <h3>Feedback</h3>

            {ticket.feedback ? (
              <>
                <div className="rating-box">
                  ⭐ {ticket.feedback.rating} / 5
                </div>
                <p className="feedback-text">
                  {ticket.feedback.comment}
                </p>
              </>
            ) : (
              <p className="no-feedback">
                Feedback not submitted for this ticket
              </p>
            )}
          </div>

        </div>
      </div>
    </main>
  </div>
);

};

export default TicketDetails;
