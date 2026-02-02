import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">💻</span>
        <span className="logo-text">IT Support</span>
      </div>

      <nav className="menu">
        <NavLink to="/dashboard" className="menu-item">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/user/raise-ticket" className="menu-item">
          <FaTicketAlt />
          <span>Raise Ticket</span>
        </NavLink>

        <NavLink to="/user/my-tickets" className="menu-item">
          <FaUser />
          <span>My Tickets</span>
        </NavLink>

       <NavLink to="/user/history" className="menu-item">
          <FaCog />
          <span>History</span>
        </NavLink>

          <NavLink to="/user/profile" className="menu-item">
          <FaCog />
          <span>Profile</span>
        </NavLink>

      </nav>



      <div className="logout">
        <NavLink to="/logout" className="menu-item">
          <FaSignOutAlt />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
