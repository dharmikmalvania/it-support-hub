import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/user/Dashboard";
import RaiseTicket from "./pages/user/RaiseTicket";
import MyTickets from "./pages/user/MyTickets";
import History from "./pages/user/History";
// import Feedback from "./pages/user/Feedback";
import Sidebar from "./components/Sidebar";

const PrivateRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo?.token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <div className="user-layout">
                <Sidebar />
                <div className="main-content">
                  <Dashboard />
                </div>
              </div>
            </PrivateRoute>
          }
        />

        <Route
          path="/user/raise-ticket"
          element={
            <PrivateRoute>
              <div className="user-layout">
                <Sidebar />
                <div className="main-content">
                  <RaiseTicket />
                </div>
              </div>
            </PrivateRoute>
          }
        />

        <Route
          path="/user/my-tickets"
          element={
            <PrivateRoute>
              <div className="user-layout">
                <Sidebar />
                <div className="main-content">
                  <MyTickets />
                </div>
              </div>
            </PrivateRoute>
          }
        />

        <Route
          path="/user/history"
          element={
            <PrivateRoute>
              <div className="user-layout">
                <Sidebar />
                <div className="main-content">
                  <History />
                </div>
              </div>
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/user/feedback/:id"
          element={
            <PrivateRoute>
              <div className="user-layout">
                <Sidebar />
                <div className="main-content">
                  <Feedback />
                </div>
              </div>
            </PrivateRoute>
          }
        /> */}

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
