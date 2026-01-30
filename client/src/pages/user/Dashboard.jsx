import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/tickets/stats",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="user-layout">
      {/* ✅ SIDEBAR */}
      <Sidebar />

      {/* ✅ MAIN CONTENT */}
      <div className="main-content">
        <h1>User Dashboard</h1>
        <p>Welcome back 👋 Here’s your support overview</p>

        <h3>Total Tickets</h3>
        <p>{stats.total}</p>

        <h3>Open Tickets</h3>
        <p>{stats.open}</p>

        <h3>Closed Tickets</h3>
        <p>{stats.closed}</p>

        <h2>Quick Actions</h2>
        <button onClick={() => (window.location.href = "/user/raise-ticket")}>
          Raise Ticket
        </button>
        <button onClick={() => (window.location.href = "/user/my-tickets")}>
          My Tickets
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
