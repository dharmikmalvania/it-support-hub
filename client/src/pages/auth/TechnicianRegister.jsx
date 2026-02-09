import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css"; // ✅ same CSS as login/register

const TechnicianRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    skills: "",
    experience: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register-technician",
        formData
      );

      // ✅ SAME OTP PAGE (REUSE)
      navigate("/verify-otp", {
        state: { userId: res.data.userId },
      });

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Technician Application 🧑‍🔧</h2>
        <p className="sub-text">Apply to become a support technician</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input name="skills" placeholder="Skills (Hardware, Networking)" onChange={handleChange} required />
          <input name="experience" type="number" placeholder="Experience (years)" onChange={handleChange} required />

          <button className="auth-btn" disabled={loading}>
            {loading ? "Sending OTP..." : "Apply"}
          </button>
        </form>

        <div className="auth-footer">
          Already approved? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default TechnicianRegister;
