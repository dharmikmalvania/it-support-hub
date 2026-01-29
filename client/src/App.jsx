import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/user/Dashboard";
import RaiseTicket from "./pages/user/RaiseTicket";
import MyTickets from "./pages/user/MyTickets";
import TicketHistory from "./pages/user/TicketHistory";
import Feedback from "./pages/user/Feedback";

const App = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT */}
        <Route
          path="/"
          element={<Navigate to={userInfo ? "/user/dashboard" : "/login"} />}
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER PAGES */}
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/raise-ticket" element={<RaiseTicket />} />
        <Route path="/user/my-tickets" element={<MyTickets />} />
        <Route path="/user/ticket-history" element={<TicketHistory />} />
        <Route path="/user/feedback/:id" element={<Feedback />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
