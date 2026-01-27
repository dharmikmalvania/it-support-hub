import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword, terms } = formData;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!terms) {
      return setError("Please accept Terms & Conditions");
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Account created successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={onSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={onChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={onChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChange}
            required
          />

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="terms"
              checked={terms}
              onChange={onChange}
            />
            <label>I agree to the Terms & Conditions</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
