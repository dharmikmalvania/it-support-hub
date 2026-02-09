import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/admin/technician.css";


const Technicians = () => {
  const [techs, setTechs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTechs = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/admin/technicians",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTechs(res.data);
    };

    fetchTechs();
  }, []);

  return (
  <div className="admin-tech-page">
    {/* HEADER */}
    <div className="admin-page-header">
      <h2>Technicians</h2>
      <p>Manage and review technician profiles</p>
    </div>

    {/* TABLE */}
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Profile</th>
          </tr>
        </thead>

        <tbody>
          {techs.length === 0 ? (
            <tr>
              <td colSpan="3" className="table-empty">
                No technicians found
              </td>
            </tr>
          ) : (
            techs.map((t) => (
              <tr key={t._id}>
                <td className="tech-name">{t.name}</td>
                <td>{t.email}</td>
                <td>
                  <button
                    className="view-profile-btn"
                    onClick={() =>
                      navigate(`/admin/technician/${t._id}`)
                    }
                  >
                    View Profile →
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* FOOTER NOTE */}
    <p className="admin-note">
      👤 Click on “View Profile” to see technician performance and history.
    </p>
  </div>
);

};

export default Technicians;
