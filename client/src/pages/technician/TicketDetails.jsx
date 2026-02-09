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
      navigate("/technician/tickets");
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


  const startWork = async () => {
    setLoading(true);
    await axios.patch(
      `http://localhost:5000/api/technician/tickets/${id}/start`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTicket();
    setLoading(false);
  };

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
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ Redirect to ACTIVE tickets (correct page)
    navigate("/technician/tickets/active");
  } catch (error) {
    console.error("Close ticket failed:", error.response?.data || error);
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
    <div className="ticket-details">
      <div className="ticket-header">
        <h2>{ticket.title}</h2>
        <span className={`status-badge ${ticket.status.replace(" ", "-")}`}>
          {ticket.status}
        </span>
      </div>

      <p className="ticket-user">
        User: <b>{ticket.user.name}</b> ({ticket.user.email})
      </p>

      <div className="ticket-meta-grid">
        <div><span>Category</span><p>{ticket.category}</p></div>
        <div><span>Priority</span><p>{ticket.priority}</p></div>
        <div>
          <span>Created</span>
          <p>{new Date(ticket.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="ticket-section">
        <h4>Description</h4>
        <p>{ticket.description}</p>
      </div>

      {/* ACTIONS */}
      {ticket.status === "Open" && (
        <button className="start-btn" onClick={startWork} disabled={loading}>
          ▶ Start Work
        </button>
      )}

      {ticket.status === "In Progress" && (
        <div className="ticket-section">
          <h4>Resolution</h4>

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

          <button className="close-btn" onClick={closeTicket} disabled={loading}>
            ✔ Close Ticket
          </button>
        </div>
      )}

      {ticket.status === "Closed" && ticket.resolution && (
        <div className="ticket-section resolution-box">
          <h4>Resolution Details</h4>
          <p><b>Summary:</b> {ticket.resolution.summary}</p>
          <p><b>Root Cause:</b> {ticket.resolution.rootCause || "—"}</p>
          <p>
            <b>Fixed At:</b>{" "}
            {new Date(ticket.resolution.fixedAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
