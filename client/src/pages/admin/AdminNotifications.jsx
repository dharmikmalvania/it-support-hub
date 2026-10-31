import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import "../../styles/admin/noti.css";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const { data } = await axios.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(data);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  };

  const markAsRead = async (id) => {
    await axios.put(
      `/notifications/${id}/read`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = async () => {
    await axios.put(
      "/notifications/read-all",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  };

  const handleClick = async (notification) => {
    await markAsRead(notification._id);

    if (notification.relatedTicket) {
      navigate(`/admin/ticket/${notification.relatedTicket}`);
    }
  };

  const unreadCount = notifications.filter(
    (n) => !n.isRead
  ).length;

  return (
    <div className="admin-noti-container">
      <div className="admin-noti-header">
        <h2>Admin Notifications</h2>

        {unreadCount > 0 && (
          <button
            className="mark-all-btn"
            onClick={markAllAsRead}
          >
            Mark All Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="empty">No notifications yet.</p>
      ) : (
        <div className="admin-noti-list">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`admin-noti-card ${
                n.isRead ? "read" : "unread"
              }`}
              onClick={() => handleClick(n)}
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

export default AdminNotifications;
