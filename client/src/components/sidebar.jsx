import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>IT</span> Support
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/user/dashboard">Dashboard</NavLink>
       <NavLink to="/user/raise-ticket">Raise Ticket</NavLink> 
        <NavLink to="/user/my-tickets">My Tickets</NavLink>
        <NavLink to="/user/logout">Logout</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
