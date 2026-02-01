import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>IT Support</h2>

      <nav>
        <NavLink to="/user/dashboard">Dashboard</NavLink>
        <NavLink to="/user/raise-ticket">Raise Ticket</NavLink>
        <NavLink to="/user/my-tickets">My Tickets</NavLink>
        <NavLink to="/user/history">History</NavLink>
        <NavLink to="/user/profile">Profile</NavLink>
      </nav>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("userInfo");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
