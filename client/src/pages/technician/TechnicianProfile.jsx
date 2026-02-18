import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import "../../styles/tech/profile.css";

const TechnicianProfile = () => {
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notificationEnabled, setNotificationEnabled] =
    useState(true);

  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await axios.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setName(data.name);
      setEmail(data.email);
      setNotificationEnabled(data.notificationEnabled);
    } catch (error) {
      console.error("TECH PROFILE LOAD ERROR:", error);
    }
  };

  const toggleNotification = async () => {
    const newValue = !notificationEnabled;

    await axios.put(
      "/user/notification",
      { notificationEnabled: newValue },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotificationEnabled(newValue);
  };

  const changePassword = async () => {
    try {
      await axios.put(
        "/user/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password updated");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      alert("Password change failed");
    }
  };

  return (
    <div className="tech-profile-container">
      <h2>Technician Profile</h2>

      <div className="tech-profile-card">
        <div className="field">
          <label>Name</label>
          <input value={name} disabled />
        </div>

        <div className="field">
          <label>Email</label>
          <input value={email} disabled />
        </div>

        <div className="toggle-section">
          <span>Enable Notifications</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notificationEnabled}
              onChange={toggleNotification}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="tech-profile-card">
        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
        />

        <button onClick={changePassword}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default TechnicianProfile;
