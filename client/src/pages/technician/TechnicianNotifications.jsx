import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import "../../styles/tech/noti.css";

const TechnicianNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const { data } = await axios.get("/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotifications(data);
  };

  const markAsRead = async (id) => {
    await axios.put(`/notifications/${id}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = async () => {
    await axios.put("/notifications/read-all", {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  };

  const handleClick = async (notification) => {
    await markAsRead(notification._id);

    if (notification.relatedTicket) {
      navigate(`/technician/tickets/${notification.relatedTicket}`);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="tech-noti-container">
      <div className="tech-noti-header">
        <h2>Technician Notifications</h2>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="mark-all-btn">
            Mark All Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <div className="tech-noti-list">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`tech-noti-card ${n.isRead ? "read" : "unread"}`}
              onClick={() => handleClick(n)}
            >
              <p>{n.message}</p>
              <span>{new Date(n.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechnicianNotifications;
