import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/user/Dashboard";
import MyTickets from "./pages/user/MyTickets";
import RaiseTicket from "./pages/user/RaiseTicket";
import EditTicket from "./pages/user/EditTicket";
import Feedback from "./pages/user/Feedback";
import History from "./pages/user/History";
import TicketDetail from "./pages/user/TicketDetail";

import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route
  path="/user/*"
  element={
    <PrivateRoute>
      <div className="user-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="raise-ticket" element={<RaiseTicket />} />
            <Route path="my-tickets" element={<MyTickets />} />
            <Route path="edit-ticket/:id" element={<EditTicket />} />
            <Route path="feedback/:id" element={<Feedback />} />
            <Route path="history" element={<History />} />
            <Route path="/user/ticket/:id" element={<TicketDetail />} />
          </Routes>
        </div>
      </div>
    </PrivateRoute>
  }
/>


      </Routes>
    </Router>
  );
}

export default App;
