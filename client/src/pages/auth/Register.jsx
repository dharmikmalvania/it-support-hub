import { useState } from "react";
import { registerUser } from "../../services/authService";
import "../../styles/auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration successful");
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form className="auth-form" onSubmit={onSubmit}>
          <input name="name" placeholder="Full Name" value={name} onChange={onChange} required />
          <input name="email" placeholder="Email Address" value={email} onChange={onChange} required />
          <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} required />
          <button type="submit">Register</button>
        </form>

        <div className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
