import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/sidebar";

const UserLayout = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo || !userInfo.token) {
    return <Navigate to="/login" replace />;
  }

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