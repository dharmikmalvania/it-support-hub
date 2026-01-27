import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setLoading(true);

    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    // ✅ SAVE USER
    localStorage.setItem("userInfo", JSON.stringify(data));

    // ✅ FORCE REDIRECT (SAFE)
    window.location.href = "/Dashboard";

  } catch (err) {
    setError(err.response?.data?.message || "Invalid email or password");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={onSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
