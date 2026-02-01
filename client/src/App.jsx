import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";

import Dashboard from "./pages/user/Dashboard";
import RaiseTicket from "./pages/user/RaiseTicket";
import MyTickets from "./pages/user/MyTickets";
import History from "./pages/user/History";
import Profile from "./pages/user/Profile";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const App = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER PANEL */}
        <Route
          path="/user"
          element={user ? <UserLayout /> : <Navigate to="/login" />}
        >
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/raise-ticket" element={<RaiseTicket />} />
          <Route path="/user/my-tickets" element={<MyTickets />} />
          <Route path="/user/history" element={<History />} />
          <Route path="/user/profile" element={<Profile />} />
        </Route>

        {/* DEFAULT */}
        <Route
          path="*"
          element={<Navigate to={user ? "/user/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
