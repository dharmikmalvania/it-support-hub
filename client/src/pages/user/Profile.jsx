import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import "../../styles/profile.css";

const Profile = () => {
    const token = localStorage.getItem("token"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notification, setNotification] = useState(true);
  const [avatar, setAvatar] = useState("");





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

    setName(data.name || "");
    setEmail(data.email || "");
    setAvatar(data.avatar || "");
    setNotification(Boolean(data.notificationEnabled));
  } catch (error) {
    console.error("LOAD PROFILE ERROR:", error);
    alert("Failed to load profile");
  }
};


 const uploadAvatar = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const { data } = await axios.post("/user/avatar", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setAvatar(data.avatar);
  } catch (error) {
    console.error("UPLOAD AVATAR ERROR:", error);
    alert("Failed to upload avatar");
  }
};

const changePassword = async () => {
  try {
    await axios.put(
      "/user/change-password",
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    alert(error.response?.data?.message || "Failed to change password");
  }
};

const toggleNotify = async () => {
  try {
    const newValue = !notification;

    const { data } = await axios.put(
      "/user/notification",
      { enabled: newValue },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotification(data.status);
  } catch (error) {
    console.error("NOTIFICATION ERROR:", error);
    alert("Failed to update notification setting");
  }
};


const updateProfile = async () => {
  try {
    await axios.put(
      "/user/profile",
      { name, avatar },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Profile updated");
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    alert("Failed to update profile");
  }
};

return (
  <div className="user-layout">
    <main className="main-content">
      <div className="profile-page">

        {/* HEADER */}
        <div className="profile-header">
          <div>
            <h1>My Profile</h1>
            <p>Manage your personal information and security</p>
          </div>
        </div>

        <div className="profile-grid">

          {/* AVATAR */}
          <div className="profile-avatar-card">
            <div className="avatar-wrapper">
              <img
                src={
                  avatar
                    ? `http://localhost:5000${avatar}`
                    : "/avatar.png"
                }
                alt="Avatar"
                className="profile-avatar"
              />
            </div>

            <div className="avatar-upload">
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={uploadAvatar}
              />
              <label htmlFor="avatar">Update Avatar</label>
            </div>

            <p className="avatar-hint">
              JPG / PNG • Max 2MB
            </p>
          </div>

          {/* ACCOUNT SUMMARY + SECURITY */}
          <div className="profile-summary-stack">
            {/* ACCOUNT SUMMARY */}
            <div className="profile-summary-card">
              <h4>Account Summary</h4>

              <div className="summary-item">
                <span>Status</span>
                <strong>Active</strong>
              </div>

              <div className="summary-item">
                <span>Role</span>
                <strong>User</strong>
              </div>

              <div className="summary-item">
                <span>Email Alerts</span>
                <strong>{notification ? "Enabled" : "Disabled"}</strong>
              </div>
            </div>

            {/* SECURITY (MOVED HERE) */}
            <div className="profile-card security">
              <div className="card-header">
                <h3>Security</h3>
                <span className="card-sub">
                  Update your password
                </span>
              </div>

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

              <div className="card-actions">
                <button
                  className="primary-btn"
                  onClick={changePassword}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* BASIC INFO + EMAIL (SIDE BY SIDE) */}
          <div className="profile-sections two-col">

            {/* BASIC INFO */}
            <div className="profile-card basic-info">
              <div className="card-header">
                <h3>Basic Information</h3>
                <span className="card-sub">
                  Visible to support team
                </span>
              </div>

              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Email</label>
              <input value={email} disabled />

              <div className="card-actions">
                <button
                  className="primary-btn"
                  onClick={updateProfile}
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* EMAIL NOTIFICATION (RIGHT SIDE) */}
            <div className="profile-card toggle-card">
              <div>
                <h4>Email Notifications</h4>
                <p className="card-sub">
                  Get ticket updates via email
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={notification}
                  onChange={toggleNotify}
                />
                <span className="slider"></span>
              </label>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
);



};

export default Profile;
