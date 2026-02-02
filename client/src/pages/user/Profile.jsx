import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/profile.css";

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emailNotifications: true,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userInfo?.token) return;

    const loadProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          emailNotifications: res.data.preferences?.emailNotifications ?? true,
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: formData.name,
          phone: formData.phone,
          preferences: {
            emailNotifications: formData.emailNotifications,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setMessage("Profile updated successfully ✅");
    } catch (error) {
      setMessage("Failed to update profile ❌");
    }
  };

  return (
    <div className="user-layout">
      

      <main className="page-content">
        <div className="profile-container">
          <h1>User Profile</h1>

          {/* Tabs */}
          <div className="profile-tabs">
            <button
              className={activeTab === "basic" ? "active" : ""}
              onClick={() => setActiveTab("basic")}
            >
              Basic Info
            </button>
            <button
              className={activeTab === "preferences" ? "active" : ""}
              onClick={() => setActiveTab("preferences")}
            >
              Preferences
            </button>
            <button
              className={activeTab === "security" ? "active" : ""}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>
          </div>

          {/* Content */}
          <form className="profile-card" onSubmit={updateProfile}>
            {activeTab === "basic" && (
              <>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <label>Email (read-only)</label>
                <input type="email" value={formData.email} disabled />

                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </>
            )}

            {activeTab === "preferences" && (
              <>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                  />
                  Receive email notifications
                </label>
              </>
            )}

            {activeTab === "security" && (
              <p className="security-note">
                🔒 Password change feature can be added later.
              </p>
            )}

            {message && <p className="profile-message">{message}</p>}

            {activeTab !== "security" && (
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
