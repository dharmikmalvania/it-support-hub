import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Dashboard from "./pages/user/Dashboard";
import MyTickets from "./pages/user/MyTickets";
import RaiseTicket from "./pages/user/RaiseTicket";
import History from "./pages/user/History";
import EditTicket from "./pages/user/EditTicket";
import TicketDetail from "./pages/user/TicketDetail";
import Feedback from "./pages/user/Feedback";

function App() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <BrowserRouter>
      <Routes>
       
        <Route
          path="/"
          element={
            userInfo ? (
              <Navigate to="/user/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />


        {/* USER */}
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/raise-ticket" element={<RaiseTicket />} />
        <Route path="/user/my-tickets" element={<MyTickets />} />
        <Route path="/user/history" element={<History />} />
         <Route path="/user/edit-ticket/:id" element={<EditTicket />} />
        <Route path="/user/ticket/:id" element={<TicketDetail />} />
        <Route path="/user/feedback/:id" element={<Feedback/>}/>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
