import { useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

const RaiseTicket = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Low",
    description: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("priority", formData.priority);
    data.append("description", formData.description);
    if (formData.attachment) {
      data.append("attachment", formData.attachment);
    }

    try {
      await axios.post("http://localhost:5000/api/tickets", data, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Ticket submitted successfully!");
      setFormData({
        title: "",
        category: "",
        priority: "Low",
        description: "",
        attachment: null,
      });
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="ticket-page">
      <h1 className="page-title">Raise New Ticket</h1>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Ticket Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Network">Network</option>
          <option value="Account">Account</option>
        </select>

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
          placeholder="Describe your issue"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* ✅ ATTACHMENT */}
        <input
          type="file"
          name="attachment"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default RaiseTicket;
