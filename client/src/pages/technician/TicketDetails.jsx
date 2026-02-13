import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/tech/ticketdetails.css";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [ticket, setTicket] = useState(null);
  const [summary, setSummary] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTicket = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/technician/tickets/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTicket(res.data);
    } catch (err) {
      alert("Unable to load ticket");
      navigate("/technician/tickets/active");
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Session expired. Login again.");
      navigate("/login");
      return;
    }
    fetchTicket();
  }, [id, token]);

  // 🔹 START WORK
  const startWork = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:5000/api/technician/tickets/${id}/start`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTicket();
    } catch (error) {
      alert("Failed to start work");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 CLOSE TICKET
  const closeTicket = async () => {
    if (!summary.trim()) {
      alert("Resolution summary is required");
      return;
    }

    try {
      setLoading(true);

      await axios.patch(
        `http://localhost:5000/api/technician/tickets/${id}/close`,
        { summary, rootCause },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/technician/tickets/active");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to close ticket. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!ticket) return <p>Loading ticket...</p>;

  return (
    <div className="tech-ticket-detail-page">

      {/* HEADER */}
      <div className="tech-detail-top">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <span className={`status-pill ${ticket.status.toLowerCase()}`}>
          {ticket.status}
        </span>
      </div>

      {/* TITLE */}
      <h2 className="detail-title">{ticket.title}</h2>

      {/* META INFO */}
      <div className="tech-meta-grid">
        <div>
          <span>User</span>
          <p>{ticket.user.name}</p>
          <small>{ticket.user.email}</small>
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

        <div>
          <span>Created</span>
          <p>{new Date(ticket.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="detail-section">
        <h3>Description</h3>
        <p className="detail-text">{ticket.description}</p>
      </section>

      {/* ATTACHMENT */}
      {ticket.attachment && (
        <section className="detail-section">
          <h3>Attachment</h3>
          <div className="attachment-card">
            <a
              href={`http://localhost:5000/uploads/${ticket.attachment}`}
              target="_blank"
              rel="noopener noreferrer"
              className="attachment-link"
            >
              📎 View / Download Attachment
            </a>
          </div>
        </section>
      )}

      {/* 🔥 ACTIONS SECTION */}

      {/* OPEN → SHOW START WORK */}
      {ticket.status?.toLowerCase() === "open" && (
        <section className="detail-section">
          <button
            className="start-btn"
            onClick={startWork}
            disabled={loading}
          >
            ▶ {loading ? "Starting..." : "Start Work"}
          </button>
        </section>
      )}

      {/* IN PROGRESS → SHOW RESOLUTION FORM */}
      {ticket.status?.toLowerCase() === "in progress" && (
        <section className="detail-section resolution-form">
          <h3>Complete Work & Close Ticket</h3>

          <input
            type="text"
            placeholder="Resolution summary *"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <textarea
            placeholder="Root cause (optional)"
            value={rootCause}
            onChange={(e) => setRootCause(e.target.value)}
          />

          <button
            className="close-btn"
            onClick={closeTicket}
            disabled={loading}
          >
            ✔ {loading ? "Closing..." : "Close Ticket"}
          </button>
        </section>
      )}

      {/* CLOSED → SHOW RESOLUTION */}
      {ticket.status?.toLowerCase() === "closed" && ticket.resolution && (
        <section className="detail-section resolution-box">
          <h3>Resolution Summary</h3>
          <p><b>Summary:</b> {ticket.resolution.summary}</p>
          <p><b>Root Cause:</b> {ticket.resolution.rootCause || "—"}</p>
          <p>
            <b>Fixed At:</b>{" "}
            {new Date(ticket.resolution.fixedAt).toLocaleString()}
          </p>
        </section>
      )}

      {/* FEEDBACK */}
      {ticket.feedback && (
        <section className="detail-section feedback-box">
          <h3>User Feedback</h3>
          <div className="rating">⭐ {ticket.feedback.rating} / 5</div>
          <p className="comment">{ticket.feedback.comment}</p>
        </section>
      )}

    </div>
  );
};

export default TicketDetails;
