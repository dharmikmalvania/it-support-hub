import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHeading,
  FaLayerGroup,
  FaFlag,
  FaPaperclip,
  FaAlignLeft,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

import "../../styles/raiseTicket.css";

const RaiseTicket = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("priority", priority);
      formData.append("description", description);
      if (attachment) formData.append("attachment", attachment);

      await axios.post("http://localhost:5000/api/tickets", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/user/my-tickets");
      }, 2000);
    } catch (error) {
      console.error("CREATE TICKET ERROR:", error);
      alert("Failed to create ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-layout">
      <main className="main-content">
        <div className="ticket-form-page">
          <div className="ticket-layout">

            {/* LEFT – FORM */}
            <div className="ticket-form-card">
              <div className="ticket-form-header">
                <h1>Raise New Ticket</h1>
                <p>Submit your issue and our support team will help you</p>
              </div>

              <form className="ticket-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label><FaHeading /> Ticket Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Short issue summary"
                    required
                  />
                </div>

                <div className="form-group">
                  <label><FaLayerGroup /> Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Network">Network</option>
                  </select>
                </div>

                <div className="form-group">
                  <label><FaFlag /> Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label><FaPaperclip /> Attachment</label>
                  <input
                    type="file"
                    onChange={(e) => setAttachment(e.target.files[0])}
                  />
                </div>

                <div className="form-group full">
                  <label><FaAlignLeft /> Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue clearly"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`submit-btn ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Submit Ticket
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT – INFO */}
            <div className="ticket-info-card">
              <h3>📌 Before You Submit</h3>

              <ul className="info-list">
                <li>✔ Use a clear and short title</li>
                <li>✔ Select correct category & priority</li>
                <li>✔ Attach screenshots if possible</li>
                <li>✔ Mention steps to reproduce the issue</li>
              </ul>

              <div className="priority-hint">
                <h4>🚦 Priority Guide</h4>
                <p><b>High:</b> System down / blocking work</p>
                <p><b>Medium:</b> Feature partially broken</p>
                <p><b>Low:</b> Minor or cosmetic issue</p>
              </div>

              <div className="response-box">
                <h4>⏱ Expected Response</h4>
                <p>
                  Most tickets are reviewed within <b>24 hours</b>.
                  Updates will appear in <b>My Tickets</b>.
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
            <h2>Ticket Raised!</h2>
            <p>Your issue has been submitted successfully 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaiseTicket;
