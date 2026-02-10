import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaHeading,
  FaLayerGroup,
  FaFlag,
  FaPaperclip,
  FaAlignLeft,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";

import "../../styles/raiseTicket.css";

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const [attachment, setAttachment] = useState(null); // new file
  const [existingAttachment, setExistingAttachment] = useState(null); // old file

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ LOAD TICKET
  useEffect(() => {
    if (location.state) {
      const ticket = location.state;
      setTitle(ticket.title);
      setCategory(ticket.category);
      setPriority(ticket.priority);
      setDescription(ticket.description);
      setExistingAttachment(ticket.attachment || null);
    } else {
      fetchTicket();
    }
  }, []);

  const fetchTicket = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle(res.data.title);
      setCategory(res.data.category);
      setPriority(res.data.priority);
      setDescription(res.data.description);
      setExistingAttachment(res.data.attachment || null);
    } catch (error) {
      console.error("FETCH TICKET ERROR:", error);
      alert("Failed to load ticket details");
      navigate("/user/my-tickets");
    }
  };

  // ✅ UPDATE TICKET
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("priority", priority);
      formData.append("description", description);

      if (attachment) {
        formData.append("attachment", attachment);
      }

      await axios.put(
        `http://localhost:5000/api/tickets/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/user/my-tickets");
      }, 2000);
    } catch (error) {
      console.error("UPDATE TICKET ERROR:", error);
      alert(
        error.response?.data?.message ||
        "Failed to update ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="user-layout">
    <main className="main-content">
      <div className="ticket-form-page">
        <div className="ticket-layout">

          {/* LEFT – FORM CARD */}
          <div className="ticket-form-card">
            <div className="ticket-form-header">
              <h1>Edit Ticket</h1>
              <p>Update your ticket details</p>
            </div>

            <form className="ticket-form" onSubmit={handleSubmit}>
              {/* Ticket Title */}
              <div className="form-group">
                <label>
                  <FaHeading /> Ticket Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label>
                  <FaLayerGroup /> Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Network">Network</option>
                </select>
              </div>

              {/* Priority */}
              <div className="form-group">
                <label>
                  <FaFlag /> Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Attachment */}
             <div className="form-group">
  <label>
    <FaPaperclip /> Attachment
  </label>

  <div className="attachment-box">
    {existingAttachment && (
      <a
        className="view-attachment"
        href={`http://localhost:5000/uploads/${existingAttachment}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View current attachment
      </a>
    )}

    <input
      type="file"
      onChange={(e) => setAttachment(e.target.files[0])}
    />
  </div>
</div>


              {/* Description */}
              <div className="form-group full">
                <label>
                  <FaAlignLeft /> Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`submit-btn ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT – INFO CARD */}
         
<div className="ticket-info-card edit-info">
  <h3>✏️ Editing This Ticket</h3>

  <ul className="info-list">
    <li>✔ Review details carefully before saving</li>
    <li>✔ Update priority if urgency has changed</li>
    <li>✔ Replace attachment only if necessary</li>
    <li>✔ Changes notify the support team instantly</li>
  </ul>

  <div className="edit-note">
    <p>
      💡 Tip: Clear updates help technicians resolve your issue faster.
    </p>
  </div>
</div>


        </div>
      </div>
    </main>

    {/* SUCCESS MODAL */}
    {showSuccess && (
      <div className="success-overlay">
        <div className="success-modal">
          <FaCheckCircle className="success-icon" />
          <h2>Ticket Updated!</h2>
          <p>Your changes have been saved successfully ✅</p>
        </div>
      </div>
    )}
  </div>
);

};

export default EditTicket;
