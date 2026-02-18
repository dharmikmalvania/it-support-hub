import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaCheckCircle,
  FaChartLine,
  FaSignOutAlt,
  FaBell,
  FaUser,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

const TechnicianSidebar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const { data } = await axios.get("/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const count = data.filter((n) => !n.isRead).length;
        setUnreadCount(count);
      } catch (error) {
        console.error("TECH UNREAD ERROR:", error);
      }
    };

    if (token) fetchUnread();
  }, [token]);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <aside className="tech-sidebar">

        <div className="tech-sidebar-logo">
          IT
        </div>

        <nav className="tech-sidebar-menu">

          <NavLink to="/technician/dashboard" className="tech-side-item" data-label="Dashboard">
            <FaHome />
          </NavLink>

          <NavLink to="/technician/notifications" className="tech-side-item" data-label="Notifications">
            <FaBell />
            {unreadCount > 0 && (
              <span className="badge">{unreadCount}</span>
            )}
          </NavLink>

          <NavLink to="/technician/tickets/active" className="tech-side-item" data-label="Active Tickets">
            <FaTicketAlt />
          </NavLink>

          <NavLink to="/technician/tickets/closed" className="tech-side-item" data-label="Closed Tickets">
            <FaCheckCircle />
          </NavLink>

          <NavLink to="/technician/performance" className="tech-side-item" data-label="Performance">
            <FaChartLine />
          </NavLink>
                <NavLink
  to="/technician/profile"
  className="tech-side-item"
  data-label="Profile"
>
  <FaUser />
</NavLink>

        </nav>

        <div className="tech-sidebar-bottom">
          <button
            className="tech-side-item logout"
            data-label="Logout"
            onClick={() => setShowLogout(true)}
          >
            <FaSignOutAlt />
          </button>
        </div>
      </aside>

      {showLogout && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="logout-actions">
              <button className="cancel-btn" onClick={() => setShowLogout(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TechnicianSidebar;
