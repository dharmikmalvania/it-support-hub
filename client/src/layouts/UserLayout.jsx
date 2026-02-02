import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../components/sidebar.css";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Sidebar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
