import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaTicketAlt,
  FaHistory,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import "../layouts/adminLayout.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <aside className="admin-sidebar">
        {/* LOGO */}
        <div className="admin-sidebar-logo">
          <span>IT</span>
          
        </div>

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
            onClick={() => setShowLogout(true)}
          >
            <FaSignOutAlt />
          </button>
        </div>
      </aside>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Logout Admin?</h3>
            <p>
              You are about to exit the admin panel.
              Make sure all changes are saved.
            </p>

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

export default AdminSidebar;
