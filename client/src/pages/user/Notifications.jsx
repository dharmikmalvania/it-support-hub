import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/user/noti.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(res.data);
    } catch (error) {
      console.error("Fetch notification error:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notifications/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Mark read error:", error);
    }
  };

  const handleNotificationClick = async (notification) => {
    await markAsRead(notification._id);

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === notification._id ? { ...n, isRead: true } : n
      )
    );

    // 🔥 Navigate to related ticket if exists
    if (notification.relatedTicket) {
      navigate(`/user/ticket/${notification.relatedTicket}`);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/notifications/read-all",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (error) {
      console.error("Mark all error:", error);
    }
  };

  if (!token) {
    return <p>Please login to view notifications.</p>;
  }

  return (
    <div className="noti-container">
      <div className="noti-header">
        <h2>Notifications</h2>

        {notifications.some((n) => !n.isRead) && (
          <button onClick={markAllAsRead} className="mark-all-btn">
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-noti">
          <p>No notifications yet 🚀</p>
        </div>
      ) : (
        <div className="noti-list">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`noti-card ${
                n.isRead ? "read" : "unread"
              }`}
              onClick={() => handleNotificationClick(n)}
            >
              <p>{n.message}</p>
              <span>
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
