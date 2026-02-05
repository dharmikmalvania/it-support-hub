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
    // if (!userInfo?.token) {
    //   navigate("/login");
    //   return;
    // }

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
    <main className="main-content">
      <div className="history-page">
        {/* HEADER */}
        <div className="history-header">
          <div>
            <h1>Ticket History</h1>
            <p>View all your resolved support tickets</p>
          </div>
        </div>

        {/* FILTER CARD */}
        <div className="history-filter-card">
          <input
            type="text"
            placeholder="Search by ticket title"
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

        {/* TABLE / LIST */}
        {filteredTickets.length === 0 ? (
          <div className="history-empty">
            <p>No closed tickets found</p>
          </div>
        ) : (
          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket._id} className="history-row">
                    {/* TITLE */}
                    <td className="history-title">
                      <div className="title-wrap">
                        <span className="title">{ticket.title}</span>
                        <span className="sub-id">
                          ID: {ticket._id.slice(-6)}
                        </span>
                      </div>
                    </td>

                    <td>{ticket.category}</td>

                    <td>
                      <span
                        className={`priority ${ticket.priority.toLowerCase()}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>

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
          </div>
        )}
      </div>
    </main>
  </div>
);

};

export default History;
