import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import "./layout.css";

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
