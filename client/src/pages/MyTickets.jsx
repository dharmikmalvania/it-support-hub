import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboard.css";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 🔹 Fetch user tickets
  useEffect(() => {
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

        setTickets(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load tickets");
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
    <div>
      <h1>My Tickets</h1>

      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.title}</td>
                <td>{ticket.category}</td>
                <td>{ticket.priority}</td>
                <td>
                  <span
                    className={`status ${ticket.status.toLowerCase()}`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td>
                  {ticket.status === "Open" && (
                    <>
                      {/* ✅ EDIT BUTTON */}
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(
                            `/edit-ticket/${ticket._id}`,
                            { state: ticket }
                          )
                        }
                      >
                        Edit
                      </button>

                      {/* ✅ CLOSE BUTTON */}
                      <button
                        className="close-btn"
                        onClick={() => closeTicket(ticket._id)}
                      >
                        Close
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyTickets;
