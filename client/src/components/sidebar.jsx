import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css"; // ✅ REQUIRED

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">IT Support</h2>

      <nav className="sidebar-nav">
        <NavLink to="/user/dashboard">Dashboard</NavLink>
        <NavLink to="/user/raise-ticket">Raise Ticket</NavLink>
        <NavLink to="/user/my-tickets">My Tickets</NavLink>
        <NavLink to="/user/history">History</NavLink>
      </nav>

      <button className="logout-btn" onClick={logoutHandler}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
