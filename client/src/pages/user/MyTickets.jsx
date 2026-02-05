import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEdit,
  FaCommentDots,
  FaCheckCircle,
  FaTicketAlt,
 
} from "react-icons/fa";
import "../../styles/myticket.css";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();


  // 🔹 Fetch user tickets
  useEffect(() => {
  const fetchTickets = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please login again.");
      return;
    }

    const response = await axios.get(
      "http://localhost:5000/api/tickets/my",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTickets(response.data);
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    alert("Unable to load tickets. Please try again later.");
  }
};

    fetchTickets();
  }, []);

  // 🔹 Close ticket
  const closeTicket = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tickets/${id}/close`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setTickets(
        tickets.map((ticket) =>
          ticket._id === id
            ? { ...ticket, status: "Closed" }
            : ticket
        )
      );
    } catch (error) {
      alert("Failed to close ticket");
    }
  };

return (
  <div className="user-layout">
    <main className="main-content">
      <div className="myticket-page">
        {/* HEADER */}
        <div className="myticket-header">
          <div>
            <h1>My Tickets</h1>
            <p>View and manage your support tickets</p>
          </div>
          <div className="ticket-count">
            <FaTicketAlt className="icon" />
            <span>{tickets.length} Tickets</span>
          </div>
        </div>

        {tickets.length === 0 ? (
          <div className="no-tickets">
            <FaTicketAlt className="empty-icon" />
            <h3>No tickets yet</h3>
            <p>Your raised tickets will appear here</p>
          </div>
        ) : (
          <div className="ticket-table-wrapper">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket._id} className="ticket-row">
                    {/* TITLE */}
                   <td className="title-cell">
  <div className="ticket-title-wrap">
    <span className="ticket-title">{ticket.title}</span>
    <span className="ticket-sub">
      Ticket ID: {ticket._id.slice(-6)}
    </span>
  </div>
</td>


                    <td>{ticket.category}</td>

                    {/* PRIORITY */}
                    <td>
                      <span
                        className={`priority ${ticket.priority.toLowerCase()}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`status ${ticket.status.toLowerCase()}`}
                      >
                        <span className="status-dot" />
                        {ticket.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td>
                      {ticket.status === "Open" && (
                        <div className="ticket-actions">
                          <button
                            className="action-btn edit-btn"
                            onClick={() =>
                              navigate(`/user/edit-ticket/${ticket._id}`, {
                                state: ticket,
                              })
                            }
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </button>

                          <button
                            className="action-btn close-btn"
                            onClick={() =>
                              navigate(`/user/feedback/${ticket._id}`)
                            }
                          >
                            <FaCommentDots />
                            <span>Close</span>
                          </button>
                        </div>
                      )}

                      {ticket.status === "Closed" && !ticket.feedback && (
                        <button
                          className="action-btn feedback-btn"
                          onClick={() =>
                            navigate(`/user/feedback/${ticket._id}`)
                          }
                        >
                          <FaCommentDots />
                          <span>Feedback</span>
                        </button>
                      )}

                      {ticket.status === "Closed" && ticket.feedback && (
                        <span className="feedback-done">
                          <FaCheckCircle />
                          <span>Submitted</span>
                        </span>
                      )}
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

export default MyTickets;
