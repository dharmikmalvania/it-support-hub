import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import RaiseTicket from "./pages/RaiseTicket";
import Sidebar from "./components/Sidebar";
import "./styles/dashboard.css";
import MyTickets from "./pages/MyTickets";
import EditTicket from "./pages/EditTicket";

function App() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER ROUTES WITH SIDEBAR */}
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route
        path="/"
        element={
          <div className="layout">
            <Sidebar />
            <div className="main-content">
              <Dashboard />
            </div>
          </div>
        }
      />

      <Route
        path="/raise-ticket"
        element={
          <div className="layout">
            <Sidebar />
            <div className="main-content">
              <RaiseTicket />
            </div>
          </div>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/my-tickets" element={<MyTickets />} />
      <Route path="/edit-ticket/:id" element={<EditTicket />} />
    </Routes>
  );
}

export default App;
