import { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setNotifications(res.data);
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={n.isRead ? "read" : "unread"}
            >
              {n.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
