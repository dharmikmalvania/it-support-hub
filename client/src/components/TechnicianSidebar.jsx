import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaCheckCircle,
  FaChartLine,
  FaSignOutAlt
} from "react-icons/fa";
import { useState } from "react";

const TechnicianSidebar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

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

          <NavLink to="/technician/tickets/active" className="tech-side-item" data-label="Active Tickets">
            <FaTicketAlt />
          </NavLink>

          <NavLink to="/technician/tickets/closed" className="tech-side-item" data-label="Closed Tickets">
            <FaCheckCircle />
          </NavLink>

          <NavLink to="/technician/performance" className="tech-side-item" data-label="Performance">
            <FaChartLine />
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

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>
              Are you sure you want to logout from Technician Panel?
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

export default TechnicianSidebar;
