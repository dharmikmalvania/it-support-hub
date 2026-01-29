import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ticketforms.css";


const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo?.token) {
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
          },
        }
      );

      navigate("/user/ticket-history");
    } catch (error) {
      console.error(error);
      setMessage("Unable to submit feedback");
    }
  };

  return (
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
          onChange={(e) => setRating(Number(e.target.value))}
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
  );
};

export default Feedback;
