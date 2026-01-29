import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import "../../styles/ticketforms.css";

const RaiseTicket = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
     const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // ✅ SAFETY CHECK
    if (!userInfo || !userInfo.token) {
      console.warn("No user token found");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("priority", priority);
      formData.append("description", description);
      if (attachment) formData.append("attachment", attachment);

      await axios.post(
        "http://localhost:5000/api/tickets",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Ticket submitted successfully");
      setTitle("");
      setCategory("");
      setPriority("");
      setDescription("");
      setAttachment(null);
    } catch (error) {
      console.error(error);
      alert("Failed to submit ticket");
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
            <h1>Raise New Ticket</h1>
            <p>Describe your issue and submit a support request</p>
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

              <input
                type="file"
                onChange={(e) => setAttachment(e.target.files[0])}
              />

              <textarea
                className="full"
                placeholder="Describe your issue in detail"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <button type="submit" className="submit-btn">
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RaiseTicket;
