import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import './App.css';
import Dashboard from "./pages/user/Dashboard";
import RaiseTicket from "./pages/user/RaiseTicket";
import MyTickets from "./pages/user/MyTickets";
import History from "./pages/user/History";
import Profile from "./pages/user/Profile"
import Feedback from "./pages/user/Feedback";
import EditTicket from "./pages/user/EditTicket";
import TicketDetail from "./pages/user/TicketDetail";
// import Notification from "./pages/user/Notifications";
import VerifyOtp from "./pages/auth/VerifyOtp";


import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import { BsTicketDetailed } from "react-icons/bs";

const App = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* {user && ( */}
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="raise-ticket" element={<RaiseTicket />} />
            <Route path="my-tickets" element={<MyTickets />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
            <Route path="feedback/:id" element={<Feedback/>} />
            <Route path="edit-ticket/:id" element={<EditTicket/>} />
             <Route path="ticket/:id" element={<TicketDetail />} />
            {/* <Route path="notifications" element={<Notifications />}/> */}
          </Route>
        {/* )} */}

        <Route
          path="*"
          element={<Navigate to={user ? "/user/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
