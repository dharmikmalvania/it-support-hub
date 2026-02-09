import { Outlet } from "react-router-dom";
import TechnicianSidebar from "../components/TechnicianSidebar";
import "./technicianLayout.css";

const TechnicianLayout = () => {
  return (
    <div className="tech-layout">
      <TechnicianSidebar />

      <main className="tech-main">
        <Outlet />
      </main>
    </div>
  );
};

export default TechnicianLayout;
