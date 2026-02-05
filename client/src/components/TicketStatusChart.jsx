import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TicketStatusChart = ({ openCount, closedCount }) => {
  const data = {
    labels: ["Open Tickets", "Closed Tickets"],
    datasets: [
      {
        data: [openCount, closedCount],
        backgroundColor: ["#4ade80", "#6366f1"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
  <div
    style={{
      height: "260px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #EEF1FF, #F7F8FF)",
      borderRadius: "18px",
      boxShadow: "0 14px 40px rgba(177, 178, 255, 0.35)",
      padding: "10px",
    }}
  >
    <Pie data={data} options={options} />
  </div>
);

};

export default TicketStatusChart;
