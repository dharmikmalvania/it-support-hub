import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
 import {
  FaStar,
  FaCommentAlt,
  FaPaperPlane,
  FaInfoCircle,
} from "react-icons/fa";
import "../../styles/RaiseTicket.css"; // SAME CSS

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
    <main className="main-content">
      <div className="ticket-form-page">
        <div className="ticket-layout">

          {/* LEFT – FEEDBACK FORM */}
          <div className="ticket-form-card">
            <div className="ticket-form-header">
              <h1>Submit Feedback</h1>
              <p>Your feedback helps us improve our service</p>
            </div>

            {message && (
              <p style={{ color: "red", marginBottom: "12px" }}>
                {message}
              </p>
            )}

            <form className="ticket-form" onSubmit={submitFeedback}>
              {/* Rating */}
              <div className="form-group full">
                <label>
                  <FaStar /> Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) =>
                    setRating(Number(e.target.value))
                  }
                >
                  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                  <option value="4">⭐⭐⭐⭐ Good</option>
                  <option value="3">⭐⭐⭐ Average</option>
                  <option value="2">⭐⭐ Poor</option>
                  <option value="1">⭐ Very Poor</option>
                </select>
              </div>

              {/* Comment */}
              <div className="form-group full">
                <label>
                  <FaCommentAlt /> Comment
                </label>
                <textarea
                  placeholder="How was the technician service?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* Submit */}
              <button className="submit-btn" type="submit">
                <FaPaperPlane /> Submit Feedback
              </button>
            </form>
          </div>

          {/* RIGHT – INFO PANEL */}
          <div className="ticket-info-card">
            <h3>Why your feedback matters ⭐</h3>

            <ul>
              <li>
                <FaInfoCircle /> Helps us improve service quality
              </li>
              <li>
                <FaInfoCircle /> Rewards good technicians
              </li>
              <li>
                <FaInfoCircle /> Improves future support
              </li>
            </ul>

            <div className="priority-hint">
              <span>Note</span>
              <p>
                Feedback can be submitted only once per ticket.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
);

};

export default Feedback;
