import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import "../../styles/ticketforms.css";

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
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="ticket-form-page">
          <div className="ticket-form-header">
            <h1>Edit Ticket</h1>
            <p>Update your ticket details</p>
          </div>

          <div className="ticket-form-card">
            <form className="ticket-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ticket Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

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

              <textarea
                className="full"
                placeholder="Describe your issue in detail"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <button type="submit" className="submit-btn">
                Update Ticket
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditTicket;
