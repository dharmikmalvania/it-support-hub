import { useState } from "react";
import { loginUser } from "../../services/authService";
import "../../styles/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      // ✅ SAVE USER
      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Login successful");

      // ✅ ROLE BASED REDIRECT
      if (data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/user/dashboard";
      }
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <form className="auth-form" onSubmit={onSubmit}>
          <input
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={onChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="auth-footer">
          Don’t have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
