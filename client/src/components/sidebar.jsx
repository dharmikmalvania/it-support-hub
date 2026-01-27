import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>IT Support</h2>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/raise-ticket">Raise Ticket</Link>
        <Link to="/my-tickets">My Tickets</Link>


        {/* 🔴 LOGOUT */}
        <button className="logout-btn" onClick={logoutHandler}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
