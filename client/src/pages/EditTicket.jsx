import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

const EditTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const ticket = location.state;

  // 🔴 If user opens URL directly
  useEffect(() => {
    if (!ticket) {
      navigate("/my-tickets");
    }
  }, [ticket, navigate]);

  if (!ticket) return null;

  const [formData, setFormData] = useState({
    title: ticket.title,
    priority: ticket.priority,
    description: ticket.description,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/tickets/${ticket._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Ticket updated successfully");
      navigate("/my-tickets");
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <div className="ticket-page">
      <h1>Edit Ticket</h1>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button className="submit-btn">Update Ticket</button>
      </form>
    </div>
  );
};

export default EditTicket;
