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

    // ✅ VALIDATIONS
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!terms) {
      return setError("You must accept Terms & Conditions");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
  name,
  email,
  password,
});


      // ✅ GO TO OTP PAGE
      navigate("/verify-otp", {
        state: { userId: res.data.userId },
      });

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Create Account</h2>

        {error && <p className="error-text">{error}</p>}

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

        <label className="terms">
          <input
            type="checkbox"
            name="terms"
            checked={terms}
            onChange={onChange}
          />
          I agree to the Terms & Conditions
        </label>

        <button type="submit" className="auth-btn">
          Register
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
