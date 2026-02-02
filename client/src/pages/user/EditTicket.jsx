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
} from "react-icons/fa";
import "../../styles/raiseTicket.css"; // 👈 SAME CSS FILE

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  // ✅ LOAD TICKET (FROM STATE OR API)
  useEffect(() => {
    if (location.state) {
      const ticket = location.state;
      setTitle(ticket.title);
      setCategory(ticket.category);
      setPriority(ticket.priority);
      setDescription(ticket.description);
    } else {
      // If user refreshes page
      fetchTicket();
    }
  }, []);

  const fetchTicket = async () => {

     const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // ✅ SAFETY CHECK
    if (!userInfo || !userInfo.token) {
      console.warn("No user token found");
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      setTitle(res.data.title);
      setCategory(res.data.category);
      setPriority(res.data.priority);
      setDescription(res.data.description);
    } catch (error) {
      console.error(error);
      alert("Failed to load ticket");
      navigate("/user/my-tickets");
    }
  };

  // ✅ UPDATE TICKET
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/tickets/${id}`,
        {
          title,
          category,
          priority,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      alert("Ticket updated successfully");
      navigate("/user/my-tickets");
    } catch (error) {
      console.error(error);
      alert("Failed to update ticket");
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
              <h1>Edit Ticket</h1>
              <p>Update your ticket details</p>
            </div>

            <form className="ticket-form" onSubmit={handleSubmit}>
              {/* Title */}
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
                <input
                  type="file"
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
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
              <button type="submit" className="submit-btn">
                <FaSave /> Save Changes
              </button>
            </form>
          </div>

          {/* RIGHT – INFO PANEL (reused layout) */}
          <div className="ticket-info-card">
            <h3>Editing Tips ✏️</h3>

            <ul>
              <li>Update the title to reflect the issue clearly</li>
              <li>Change priority if urgency has changed</li>
              <li>Add more details if the issue evolved</li>
              <li>Attach new screenshots if needed</li>
            </ul>

            <div className="priority-hint">
              <span>Reminder</span>
              <p>
                After saving, support will be notified of updates.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
);

};

export default EditTicket;
