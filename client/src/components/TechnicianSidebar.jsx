import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaCheckCircle,
  FaChartLine,
  FaSignOutAlt
} from "react-icons/fa";
import "../layouts/technicianLayout.css";

const TechnicianSidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className="tech-sidebar">
      {/* LOGO */}
      <div className="tech-sidebar-logo">🧑‍🔧</div>

      {/* MENU */}
      <nav className="tech-sidebar-menu">
        <NavLink
          to="/technician/dashboard"
          className="tech-side-item"
          data-label="Dashboard"
        >
          <FaHome />
        </NavLink>

        <NavLink
          to="/technician/tickets/active"
          className="tech-side-item"
          data-label="Active Tickets"
        >
          <FaTicketAlt />
        </NavLink>

        <NavLink
          to="/technician/tickets/closed"
          className="tech-side-item"
          data-label="Closed Tickets"
        >
          <FaCheckCircle />
        </NavLink>

        <NavLink
          to="/technician/performance"
          className="tech-side-item"
          data-label="Performance"
        >
          <FaChartLine />
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="tech-sidebar-bottom">
        <button
          className="tech-side-item logout"
          data-label="Logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </aside>
  );
};

export default TechnicianSidebar;
