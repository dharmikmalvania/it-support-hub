import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";   // 🔴 MUST HAVE
import "./UserLayout.css";

const UserLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
