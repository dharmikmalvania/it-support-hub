import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.userId;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!userId) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2>Session Expired</h2>
          <p className="sub-text">Please register again</p>
        </div>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        userId,
        otp,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleVerify}>
        <h2>Verify OTP</h2>
        <p className="sub-text">
          Enter the 6-digit code sent to your email
        </p>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-group">
          <input
            className="otp-input"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
          />
        </div>

        <button className="auth-btn" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div className="auth-link">
          Didn’t get the code? <a href="/register">Register again</a>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
