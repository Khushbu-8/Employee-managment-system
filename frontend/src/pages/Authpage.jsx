import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Authpage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });
      const { token } = res.data;
      const userData = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("token", token);
      login(userData);
   toast.success(res.data.message ||"Login successful!");

      // Navigate to the correct page based on role
      navigate(userData.role === "admin" ? "/admin" : "/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      toast.error(err.response?.data?.message || "Login failed: Invalid credentials",);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-6 rounded shadow-md w-full max-w-md mx-auto mt-10 bg-white">
      <div className="flex justify-around mb-4">
        <button
          className={`text-lg font-semibold ${
            activeTab === "signup"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
        <button
          className={`text-lg font-semibold ${
            activeTab === "login"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
      </div>

      {activeTab === "login" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Email */}
          <div className="flex items-center border rounded px-3 py-2">
            <Mail className="text-gray-500 mr-2 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded px-3 py-2">
            <Lock className="text-gray-500 mr-2 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded w-full ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
           
          </div>
        </form>
      ) : (
        <Signup />
      )}
    </div>
  );
};

export default Authpage;
