import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import "../../styles/ticketDetail.css";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo?.token) {
      navigate("/login");
      return;
    }

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
      } catch (err) {
        setError("Unable to load ticket details");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  // ✅ ALWAYS RENDER SOMETHING
  return (
    <div className="user-layout">
      <Sidebar />

      <div className="main-content">
        {loading && <p>Loading ticket...</p>}

        {error && <p className="error-text">{error}</p>}

        {!loading && ticket && (
          <div className="ticket-detail-card">
            <h1>{ticket.title}</h1>

            <div className="detail-row">
              <span>Category:</span>
              <strong>{ticket.category}</strong>
            </div>

            <div className="detail-row">
              <span>Priority:</span>
              <strong>{ticket.priority}</strong>
            </div>

            <div className="detail-row">
              <span>Status:</span>
              <strong>{ticket.status}</strong>
            </div>

            <div className="detail-desc">
              <h3>Description</h3>
              <p>{ticket.description}</p>
            </div>

            {/* ✅ FEEDBACK READ-ONLY */}
            {ticket.feedback && (
              <div className="feedback-box">
                <h3>User Feedback</h3>
                <p>⭐ Rating: {ticket.feedback.rating}</p>
                <p>{ticket.feedback.comment}</p>
              </div>
            )}

            <button
              className="back-btn"
              onClick={() => navigate("/user/history")}
            >
              ← Back to History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetail;
