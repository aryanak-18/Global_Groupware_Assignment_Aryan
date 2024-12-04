import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import UserDashboard from "./components/UserDashboard";

const App = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route
            path="/users-list"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
