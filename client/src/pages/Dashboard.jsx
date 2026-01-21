import "./../styles/dashboard.css";

const Dashboard = () => {
  let userInfo = null;

  try {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  } catch (err) {
    console.log("User not logged in");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {userInfo?.name || "User"} 👋</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Tickets</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Open Tickets</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Closed Tickets</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
