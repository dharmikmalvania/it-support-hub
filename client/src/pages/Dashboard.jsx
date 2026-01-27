import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

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
      } catch (error) {
        console.error("Failed to load stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Tickets</h3>
          <p>{stats.total}</p>
        </div>

        <div className="card">
          <h3>Open Tickets</h3>
          <p>{stats.open}</p>
        </div>

        <div className="card">
          <h3>Closed Tickets</h3>
          <p>{stats.closed}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
