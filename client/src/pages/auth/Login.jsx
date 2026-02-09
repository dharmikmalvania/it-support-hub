import { useState } from "react";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    const role = res.data.user.role;

if (role === "technician") {
  navigate("/technician/dashboard");
} else if (role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate("/user/dashboard");
}

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Login</h2>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
<div className="auth-footer">
  Don’t have an account? <Link to="/register">Register</Link>
</div>
<div className="auth-footer">
  Technician? <Link to="/register/technician">Apply here</Link>
</div>


      </div>
    </div>
  );
};

export default Login;
