import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Sidebar />

      <main className="user-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
