import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/user/Dashboard";
import RaiseTicket from "./pages/user/RaiseTicket";
import MyTickets from "./pages/user/MyTickets";
import EditTicket from "./pages/user/EditTicket";
import Feedback from "./pages/user/Feedback";
import TicketHistory from "./pages/user/TicketHistory"; // ✅ ADD THIS

import UserLayout from "./layouts/UserLayout";

function App() {
  return (
    
    <BrowserRouter>
    <div style={{ padding: "40px", fontSize: "24px" }}>
      LOGIN PAGE TEST
    </div>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED USER ROUTES */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="raise-ticket" element={<RaiseTicket />} />
          <Route path="my-tickets" element={<MyTickets />} />
          <Route path="edit-ticket/:id" element={<EditTicket />} />
          <Route path="feedback/:id" element={<Feedback />} />       {/* ✅ FIXED */}
          <Route path="ticket-history" element={<TicketHistory />} /> {/* ✅ FIXED */}
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
    
  );
  
}

export default App;
