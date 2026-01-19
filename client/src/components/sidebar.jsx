import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>IT Support Hub</h2>

      <nav>
        <Link to="/user/dashboard">Dashboard</Link>
        <Link to="/user/raise-ticket">Raise Ticket</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
