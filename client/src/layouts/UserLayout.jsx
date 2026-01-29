import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
