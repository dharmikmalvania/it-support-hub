import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/admin/ticketdetails.css";

const AdminTicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/tickets/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTicket(res.data);
      } catch (error) {
        console.error("Failed to load ticket details", error);
      }
    };

    fetchTicket();
  }, [id, token]);

  if (!ticket) return <p>Loading ticket...</p>;

  return (
  <div className="admin-ticket-detail-page">
    {/* TOP BAR */}
    <div className="admin-detail-top">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <span className={`status-pill ${ticket.status.toLowerCase()}`}>
        {ticket.status}
      </span>
    </div>

    {/* TITLE */}
    <h2 className="detail-title">{ticket.title}</h2>

    {/* BASIC INFO */}
    <div className="detail-meta">
      <div>
        <span>USER</span>
        <p>
          {ticket.user.name}
          <br />
          <small>{ticket.user.email}</small>
        </p>
      </div>

      <div>
        <span>TECHNICIAN</span>
        <p>
          {ticket.assignedTo
            ? `${ticket.assignedTo.name}`
            : "Not assigned"}
          <br />
          <small>{ticket.assignedTo?.email || "—"}</small>
        </p>
      </div>

      <div>
        <span>PRIORITY</span>
        <p>{ticket.priority}</p>
      </div>
    </div>

    {/* DESCRIPTION */}
    <div className="detail-section">
      <h3>Description</h3>
      <p className="detail-text">{ticket.description}</p>
    </div>

    {/* RESOLUTION */}
    {ticket.resolution && (
      <div className="detail-section highlight">
        <h3>Resolution</h3>
        <p><b>Summary:</b> {ticket.resolution.summary}</p>
        <p><b>Root Cause:</b> {ticket.resolution.rootCause || "—"}</p>
        <p>
          <b>Fixed At:</b>{" "}
          {new Date(ticket.resolution.fixedAt).toLocaleString()}
        </p>
      </div>
    )}

    {/* FEEDBACK */}
    {ticket.feedback && (
      <div className="detail-section feedback">
        <h3>User Feedback</h3>
        <p className="rating">
          ⭐ {ticket.feedback.rating} / 5
        </p>
        <p className="comment">{ticket.feedback.comment}</p>
      </div>
    )}
  </div>
);

};

export default AdminTicketDetails;
