// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaHistory,
  FaUser,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="logo">IT</div>

      <nav>
        <NavLink to="/user/dashboard">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/user/raise-ticket">
          <FaPlus />
          <span>Raise Ticket</span>
        </NavLink>

        <NavLink to="/user/my-tickets">
          <FaTicketAlt />
          <span>My Tickets</span>
        </NavLink>

        <NavLink to="/user/history">
          <FaHistory />
          <span>History</span>
        </NavLink>

        <NavLink to="/user/profile">
          <FaUser />
          <span>Profile</span>
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
