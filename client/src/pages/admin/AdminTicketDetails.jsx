import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/admin/ticketdetails.css";

const AdminTicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [ticket, setTicket] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/tickets/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTicket(res.data);

      // 🔹 Load technicians ONLY if ticket is not assigned
      if (!res.data.assignedTo) {
        const techRes = await axios.get(
          "http://localhost:5000/api/admin/technicians",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTechnicians(techRes.data);
      }
    } catch (error) {
      console.error("Failed to load ticket details", error);
    }
  };

  const assignTechnician = async (techId) => {
    if (!techId) return;

    try {
      setAssigning(true);

      await axios.patch(
        "http://localhost:5000/api/admin/assign-ticket",
        {
          ticketId: ticket._id,
          technicianId: techId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/admin/open-tickets");
    } catch (error) {
      alert("Failed to assign technician");
    } finally {
      setAssigning(false);
    }
  };

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

    {/* MAIN LAYOUT */}
    <div className="detail-layout">

      {/* LEFT SIDE */}
      <div className="detail-left">

        {/* INFO GRID */}
        <div className="info-grid">
          <div>
            <span>User</span>
            <p>
              {ticket.user.name}
              <br />
              <small>{ticket.user.email}</small>
            </p>
          </div>

          <div>
            <span>Technician</span>
            <p>
              {ticket.assignedTo
                ? ticket.assignedTo.name
                : "Not assigned"}
              <br />
              <small>{ticket.assignedTo?.email || "—"}</small>
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

        {/* DESCRIPTION */}
        <div className="detail-section">
          <h3>Description</h3>
          <p className="detail-text">{ticket.description}</p>
        </div>

        {/* ATTACHMENT */}
        {ticket.attachment && (
          <div className="detail-section">
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
          </div>
        )}

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
            <p className="rating">⭐ {ticket.feedback.rating} / 5</p>
            <p className="comment">{ticket.feedback.comment}</p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE (ACTIONS) */}
      <div className="detail-right">

        {/* ASSIGN TECHNICIAN */}
        {!ticket.assignedTo && ticket.status !== "Closed" && (
          <div className="action-card highlight">
            <h4>Assign Technician</h4>

            <select
              className="assign-select"
              disabled={assigning}
              defaultValue=""
              onChange={(e) => assignTechnician(e.target.value)}
            >
              <option value="">Select Technician</option>
              {technicians.map((tech) => (
                <option key={tech._id} value={tech._id}>
                  {tech.name}
                </option>
              ))}
            </select>

            <p className="action-note">
              Assigning a technician will notify them instantly.
            </p>
          </div>
        )}

      </div>
    </div>
  </div>
);

};

export default AdminTicketDetails;
