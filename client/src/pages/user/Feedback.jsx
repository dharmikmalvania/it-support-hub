import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import axiosInstance from "../../utils/axiosInstance";
import "../../styles/ticketforms.css";

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    if (!userInfo?.token) {
      setMessage("Session expired. Please login again.");
      return;
    }

    try {
      await axiosInstance.post(`/tickets/${id}/feedback`, {
        rating,
        comment,
      });

      alert("Thank you for your feedback ❤️");
      navigate("/user/my-tickets");
    } catch (error) {
      console.error(error);
      setMessage("Unable to submit feedback");
    }
  };

  return (
    <div className="user-layout">
      <Sidebar />

      <main className="main-content">
        <div className="ticket-form-page">
          <h1>Feedback</h1>

          {message && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {message}
            </p>
          )}

          <form className="ticket-form" onSubmit={submitFeedback}>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

            <textarea
              placeholder="How was the technician service?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button className="submit-btn">
              Submit Feedback
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
