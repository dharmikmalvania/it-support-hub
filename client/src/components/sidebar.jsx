import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaUser,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // ✅ hook inside component

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // clear session
    navigate("/login"); // redirect
  };

  // 🔹 Get user from storage / context
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Build avatar URL safely
  const avatarUrl = user?.avatar
    ? `http://localhost:5000${user.avatar}`
    : "/avatar.png"; // fallback

  return (
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

        <NavLink
          to="/login"
          className="side-item logout"
          data-label="Logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
