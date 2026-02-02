import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../styles/myticket.css";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();


  // 🔹 Fetch user tickets
  useEffect(() => {
    const fetchTickets = async () => {

       const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // ✅ SAFETY CHECK
    if (!userInfo || !userInfo.token) {
      console.warn("No user token found");
      return;
    }
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
  <div className="user-layout">
    {/* SIDEBAR */}
   

    {/* MAIN CONTENT */}
    <main className="main-content">
      <div className="myticket-page">
        {/* PAGE HEADER */}
        <div className="myticket-header">
          <h1>My Tickets</h1>
          <p>View and manage your support tickets</p>
        </div>

        {tickets.length === 0 ? (
          <div className="no-tickets">No tickets found</div>
        ) : (
          <div className="ticket-table-wrapper">
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
                    <td className="title-cell">{ticket.title}</td>
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
  {/* 🟢 OPEN TICKET ACTIONS */}
  {ticket.status === "Open" && (
    <div className="ticket-actions">
      <button
        className="edit-btn"
        onClick={() =>
          navigate(`/user/edit-ticket/${ticket._id}`, {
            state: ticket,
          })
        }
      >
        Edit
      </button>

      <button
        className="close-btn"
        onClick={() =>
          navigate(`/user/feedback/${ticket._id}`)
        }
      >
        Close & Feedback
      </button>
    </div>
  )}

  {/* 🟡 CLOSED BUT FEEDBACK NOT GIVEN */}
  {ticket.status === "Closed" && !ticket.feedback && (
    <button
      className="feedback-btn"
      onClick={() =>
        navigate(`/user/feedback/${ticket._id}`)
      }
    >
      Give Feedback
    </button>
  )}

  {/* ✅ CLOSED & FEEDBACK SUBMITTED */}
  {ticket.status === "Closed" && ticket.feedback && (
    <span className="feedback-done">
      ✔ Feedback Submitted
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
