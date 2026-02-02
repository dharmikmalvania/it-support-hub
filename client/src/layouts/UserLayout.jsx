// src/layouts/UserLayout.jsx
import Sidebar from "../components/sidebar";
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
