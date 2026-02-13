import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

/* Layouts */
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import TechnicianLayout from "./layouts/TechnicianLayout";

/* User Pages */
import Dashboard from "./pages/user/Dashboard";
import RaiseTicket from "./pages/user/RaiseTicket";
import MyTickets from "./pages/user/MyTickets";
import History from "./pages/user/History";
import Profile from "./pages/user/Profile";
import Feedback from "./pages/user/Feedback";
import EditTicket from "./pages/user/EditTicket";
import TicketDetail from "./pages/user/TicketDetail";

/* Admin Pages */
import AdminDashboard from "./pages/admin/Dashboard";
import OpenTickets from "./pages/admin/OpenTickets";
import TicketHistory from "./pages/admin/TicketHistory";
import Technicians from "./pages/admin/Technicians";
import TechnicianProfile from "./pages/admin/TechnicianProfile";

/* Technician Pages */
import TechnicianDashboard from "./pages/technician/Dashboard";
// import TechnicianTickets from "./pages/technician/Tickets";
import TicketDetails from "./pages/technician/TicketDetails";
import TechnicianPerformance from "./pages/technician/Performance";
import ActiveTickets from "./pages/technician/ActiveTickets";
import ClosedTickets from "./pages/technician/ClosedTickets";
import AdminTicketDetails from "./pages/admin/AdminTicketDetails";

/* Auth */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import TechnicianRegister from "./pages/auth/TechnicianRegister";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* ================= PUBLIC ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/register/technician" element={<TechnicianRegister />} />

          {/* ================= ADMIN ================= */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="open-tickets" element={<OpenTickets />} />
              <Route path="ticket-history" element={<TicketHistory />} />
              <Route path="technicians" element={<Technicians />} />
              <Route path="technician/:id" element={<TechnicianProfile />} />
            <Route path="/admin/tickets/:id"element={<AdminTicketDetails />}/>

            </Route>
          </Route>

          {/* ================= USER ================= */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/user" element={<UserLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="raise-ticket" element={<RaiseTicket />} />
              <Route path="my-tickets" element={<MyTickets />} />
              <Route path="history" element={<History />} />
              <Route path="profile" element={<Profile />} />
              <Route path="feedback/:id" element={<Feedback />} />
              <Route path="edit-ticket/:id" element={<EditTicket />} />
              <Route path="ticket/:id" element={<TicketDetail />} />
            </Route>
          </Route>

          {/* ================= TECHNICIAN ================= */}
          <Route element={<ProtectedRoute allowedRoles={["technician"]} />}>
            <Route path="/technician" element={<TechnicianLayout />}>
              <Route path="dashboard" element={<TechnicianDashboard />} />
              {/* <Route path="tickets" element={<TechnicianTickets />} /> */}
              <Route path="tickets/:id" element={<TicketDetails />} />
              <Route path="performance" element={<TechnicianPerformance />} />
<Route path="tickets/active" element={<ActiveTickets />} />
<Route path="tickets/closed" element={<ClosedTickets />} />


            </Route>
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
