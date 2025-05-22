// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, UserCircle } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 hidden md:flex w-full bg-purple-700 text-white p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Employee Manager</h1>
        <div className="flex space-x-4 items-center">
          {user?.role === 'admin' ? <UserCircle onClick={() => navigate("/admin/adminprofile")} className="w-6 h-6 cursor-pointer" /> : <UserCircle onClick={() => navigate("/profile")} className="w-6 h-6 cursor-pointer" /> }
          {user?.role === 'employee' && <Link to="/profile" className="hover:underline">Profile</Link>}
          <button
                    onClick={handleLogout}
                    className="btn flex items-center gap-2 cursor-pointer bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
        </div>
      </div>
    </nav>
  );
}