import { Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const role = isAdmin ? "admin" : "employee";
      const res = await API.post("/auth/signup", {
        username,
        email,
        password,
        role,
      });
 toast.success(res.data.message ||"SignUp successful!");

      setSuccess("User SignUp successfully! Please Login..");
      setUsername("");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white"
    >
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>

      {success && <p className="text-green-600 text-sm text-center">{success}</p>}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <div className="flex items-center border rounded px-3 py-2">
        <User className="text-gray-500 mr-2 w-5 h-5" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full outline-none"
        />
      </div>

      <div className="flex items-center border rounded px-3 py-2">
        <Mail className="text-gray-500 mr-2 w-5 h-5" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full outline-none"
        />
      </div>

      <div className="flex items-center border rounded px-3 py-2">
        <Lock className="text-gray-500 mr-2 w-5 h-5" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full outline-none"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        <label className="text-sm">Register me as Admin</label>
      </div>

      <button
        type="submit"
        className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded w-full ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Registering..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
