import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Sidebar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
