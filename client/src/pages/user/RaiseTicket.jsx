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
  FaInfoCircle,
} from "react-icons/fa";


import "../../styles/raiseTicket.css";

const RaiseTicket = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);


  const handleSubmit = async (e) => {
    
    e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please login again.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("category", category);
    formDataToSend.append("priority", priority);
    formDataToSend.append("description", description);

    if (attachment) {
      formDataToSend.append("attachment", attachment);
    }

    await axios.post(
      "http://localhost:5000/api/tickets",
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Ticket created successfully");
    navigate("/user/my-tickets");

  } catch (error) {
    console.error("CREATE TICKET ERROR:", error);
    alert("Failed to create ticket. Please try again.");
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
                <label>
                  <FaHeading /> Ticket Title
                </label>
                <input
                  type="text"
                  placeholder="Short issue summary"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaLayerGroup /> Category
                </label>
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
                <label>
                  <FaFlag /> Priority
                </label>
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
                <label>
                  <FaPaperclip /> Attachment
                </label>
                <input
                  type="file"
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
              </div>

              <div className="form-group full">
                <label>
                  <FaAlignLeft /> Description
                </label>
                <textarea
                  placeholder="Describe the issue clearly"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <FaPaperPlane /> Submit Ticket
              </button>
            </form>
          </div>

          {/* RIGHT – INFO PANEL */}
          <div className="ticket-info-card">
            <h3>How to get faster support 🚀</h3>

            <ul>
              <li>
                <FaInfoCircle />
                Use a clear and short title
              </li>
              <li>
                <FaInfoCircle />
                Select the correct category
              </li>
              <li>
                <FaInfoCircle />
                Attach screenshots if possible
              </li>
              <li>
                <FaInfoCircle />
                Mention exact error messages
              </li>
            </ul>

            <div className="priority-hint">
              <span>Priority Guide</span>
              <p>
                <strong>Low:</strong> Minor issue<br />
                <strong>Medium:</strong> Work impacted<br />
                <strong>High:</strong> System down
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
);


};

export default RaiseTicket;