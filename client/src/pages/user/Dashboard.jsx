// src/pages/Dashboard.jsx
import "../..//styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome 👋</h1>
      <p className="subtitle">Manage your support tickets easily</p>

      {/* Quick actions */}
      <div className="quick-actions">
        <button>➕ Raise Ticket</button>
        <button>📄 My Tickets</button>
        <button>🕒 History</button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <span>3</span>
        </div>
        <div className="stat-card">
          <h3>Open</h3>
          <span>1</span>
        </div>
        <div className="stat-card">
          <h3>Closed</h3>
          <span>2</span>
        </div>
      </div>

      {/* Bottom section */}
      <div className="dashboard-grid">
        <div className="card">
          <h3>Recent Tickets</h3>
          <ul>
            <li>Network speed is slow <span className="closed">Closed</span></li>
            <li>Keyboard not working <span className="open">Open</span></li>
          </ul>
        </div>

        <div className="card">
          <h3>Notifications</h3>
          <p>Your ticket has been created successfully</p>
          <a href="#">View all →</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
