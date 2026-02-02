import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/history.css";

const History = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    if (!userInfo?.token) {
      navigate("/login");
      return;
    }

    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/tickets/my",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        // ✅ ONLY CLOSED TICKETS
        const closedTickets = res.data.filter(
          (t) => t.status === "Closed"
        );

        setTickets(closedTickets);
      } catch (error) {
        console.error("Failed to load history");
      }
    };

    fetchTickets();
  }, []);

  // 🔍 SEARCH + FILTER LOGIC
  const filteredTickets = tickets.filter((ticket) => {
    return (
      ticket.title.toLowerCase().includes(search.toLowerCase()) &&
      (!category || ticket.category === category) &&
      (!priority || ticket.priority === priority)
    );
  });

  return (
    <div className="user-layout">
      
      <div className="main-content">
        <h1>Ticket History</h1>
        <p className="sub-text">
          View all your resolved support tickets
        </p>

        {/* 🔍 FILTERS */}
        <div className="history-filters">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Hardware">Hardware</option>
            <option value="Network">Network</option>
            <option value="Software">Software</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* 📋 TABLE */}
        {filteredTickets.length === 0 ? (
          <p className="no-data">No closed tickets found</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.title}</td>
                  <td>{ticket.category}</td>
                  <td>{ticket.priority}</td>
                  <td>
                    <span className="status closed">Closed</span>
                  </td>
                  <td>
                    {ticket.feedback ? (
                      <span className="badge success">
                        Submitted
                      </span>
                    ) : (
                      <span className="badge muted">—</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/user/ticket/${ticket._id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;
