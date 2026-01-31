import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ FIX: DEFINE userInfo
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    if (!userInfo || !userInfo.token) {
      setMessage("Session expired. Please login again.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/tickets/${id}/close-feedback`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Thank you for your feedback ❤️");
      navigate("/user/history");

    } catch (error) {
      console.error("FEEDBACK ERROR:", error);
      setMessage(
        error.response?.data?.message || "Failed to submit feedback"
      );
    }
  };

  return (
    <div className="user-layout">
      <Sidebar />

      <main className="main-content">
        <div className="ticket-form-page">
          <h1>Submit Feedback</h1>

          {message && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {message}
            </p>
          )}

          <form className="ticket-form" onSubmit={submitFeedback}>
            <label>Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

            <label>Comment</label>
            <textarea
              placeholder="How was the technician service?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button className="submit-btn" type="submit">
              Submit Feedback
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
