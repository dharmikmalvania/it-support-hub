import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaHistory,
  FaUsers,
  FaSignOutAlt
} from "react-icons/fa";
import "../layouts/adminLayout.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      {/* LOGO */}
      <div className="admin-sidebar-logo">🛠️</div>

      {/* MENU */}
      <nav className="admin-sidebar-menu">
        <NavLink
          to="/admin/dashboard"
          className="admin-side-item"
          data-label="Dashboard"
        >
          <FaHome />
        </NavLink>

        <NavLink
          to="/admin/open-tickets"
          className="admin-side-item"
          data-label="Open Tickets"
        >
          <FaTicketAlt />
        </NavLink>

        <NavLink
          to="/admin/ticket-history"
          className="admin-side-item"
          data-label="Ticket History"
        >
          <FaHistory />
        </NavLink>

        <NavLink
          to="/admin/technicians"
          className="admin-side-item"
          data-label="Technicians"
        >
          <FaUsers />
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="admin-sidebar-bottom">
        <button
          className="admin-side-item logout"
          data-label="Logout"
          onClick={logout}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
