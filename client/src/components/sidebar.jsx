import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaUser,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const avatarUrl = user?.avatar
    ? `http://localhost:5000${user.avatar}`
    : "/avatar.png";

  return (
    <>
      <aside className="sidebar">

        {/* LOGO */}
        <div className="sidebar-logo">
          <span>IT</span>
        </div>

        {/* MENU */}
        <nav className="sidebar-menu">
  <NavLink to="/user/dashboard" className="side-item" data-label="Dashboard">
    <FaHome />
  </NavLink>

  <NavLink to="/user/raise-ticket" className="side-item" data-label="Raise Ticket">
    <FaTicketAlt />
  </NavLink>

  <NavLink to="/user/my-tickets" className="side-item" data-label="My Tickets">
    <FaUser />
  </NavLink>

  <NavLink to="/user/history" className="side-item" data-label="History">
    <FaHistory />
  </NavLink>

  <NavLink to="/user/profile" className="side-item" data-label="Profile">
    <FaUser />
  </NavLink>
</nav>


        {/* BOTTOM */}
        <div className="sidebar-bottom">
  <img
    src={avatarUrl}
    alt="Profile"
    className="profile-pic"
    onError={(e) => {
      e.target.src = "/avatar.png";
    }}
  />

  <button
    className="side-item logout"
    onClick={() => setShowLogout(true)}
    data-label="Logout"
  >
    <FaSignOutAlt />
  </button>
</div>

      </aside>

      {/* BEAUTIFUL LOGOUT MODAL */}
      {showLogout && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Are you sure?</h3>
            <p>You will be logged out of your account.</p>

            <div className="logout-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
