import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/profile.css";

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userInfo) {
      setForm({
        name: userInfo.name,
        email: userInfo.email,
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setMessage("Profile updated successfully ✅");
    } catch (err) {
      setMessage("Failed to update profile ❌");
    }
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      {message && <p className="profile-msg">{message}</p>}

      <form onSubmit={updateProfile} className="profile-form">
        <label>Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input value={form.email} disabled />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
