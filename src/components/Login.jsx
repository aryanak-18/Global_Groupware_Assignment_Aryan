import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showAlert } from "./Alert";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      showAlert("success", "Logged In successfully");
      navigate("/users-list");
    } catch (error) {
      alert("Error logging in: " + error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-500">Sign in to continue</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
