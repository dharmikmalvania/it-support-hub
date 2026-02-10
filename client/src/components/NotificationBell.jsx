import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/notifications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotifications(res.data);
      } catch (err) {
        console.error("Notification fetch failed");
      }
    };

    fetchNotifications();
  }, [token]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const openNotification = async (n) => {
    await axios.patch(
      `http://localhost:5000/api/notifications/${n._id}/read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate(n.link || "/");
  };

  return (
    <div className="notif-wrapper">
      <span className="notif-bell">🔔</span>
      {unreadCount > 0 && (
        <span className="notif-count">{unreadCount}</span>
      )}

      <div className="notif-dropdown">
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`notif-item ${n.isRead ? "read" : "unread"}`}
              onClick={() => openNotification(n)}
            >
              <strong>{n.title}</strong>
              <p>{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationBell;
