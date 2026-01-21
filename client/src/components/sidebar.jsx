import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>IT Support</h2>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/raise-ticket">Raise Ticket</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
