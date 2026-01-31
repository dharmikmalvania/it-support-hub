import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        userId: state.userId,
        otp,
      });
      alert("Email verified successfully");
      navigate("/login");
    } catch (err) {
      setMessage("Invalid OTP");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Verify Email</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button type="submit">Verify</button>
    </form>
  );
};

export default VerifyOtp;
