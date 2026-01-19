import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";

import Dashboard from "./pages/user/Dashboard";
import RaiseTicket from "./pages/user/RaiseTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="raise-ticket" element={<RaiseTicket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
