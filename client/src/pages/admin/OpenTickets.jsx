import { useEffect, useState } from "react";
import axios from "axios";import "../../styles/admin/opentickets.css";


const OpenTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [techs, setTechs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const t = await axios.get(
      "http://localhost:5000/api/admin/open-tickets",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const techRes = await axios.get(
      "http://localhost:5000/api/admin/technicians",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTickets(t.data);
    setTechs(techRes.data);
  };

  const assignTech = async (ticketId, techId) => {
    await axios.patch(
      "http://localhost:5000/api/admin/assign-ticket",
      { ticketId, technicianId: techId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchData();
  };

return (
  <div className="admin-open-page">
    {/* HEADER */}
    <div className="admin-page-header">
      <h2>Open Tickets</h2>
      <p>Manage and assign open tickets to technicians</p>
    </div>

    {/* TABLE */}
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="5" className="table-empty">
                No open tickets available
              </td>
            </tr>
          ) : (
            tickets.map((t) => (
              <tr key={t._id}>
                <td className="ticket-title">{t.title}</td>
                <td>{t.user.name}</td>
                <td>
                  <span className={`status-badge ${t.status.toLowerCase()}`}>
                    {t.status}
                  </span>
                </td>
                <td>
                  {t.assignedTo?.name || (
                    <span className="not-assigned">Not Assigned</span>
                  )}
                </td>
                <td>
  <button
    className="admin-view-btn"
    onClick={() =>
      window.location.href = `/admin/tickets/${t._id}`
    }
  >
    View
  </button>
</td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* STATIC NOTE */}
    <p className="admin-note">
      ℹ Assigning a technician will immediately notify them.
    </p>
  </div>
);

};

export default OpenTickets;
