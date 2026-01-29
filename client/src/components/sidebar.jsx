import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2>IT Support</h2>

      <NavLink to="/user/dashboard">Dashboard</NavLink>
      <NavLink to="/user/raise-ticket">Raise Ticket</NavLink>
      <NavLink to="/user/my-tickets">My Tickets</NavLink>
      <NavLink to="/user/history">History</NavLink>

      <button onClick={logout}>Logout</button>
    </aside>
  );
};

export default Sidebar;
