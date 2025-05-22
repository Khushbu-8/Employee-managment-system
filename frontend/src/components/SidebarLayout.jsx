import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  LogOut,
  X,
  Users,
  UserPlus,
  LayoutDashboard,
  UserCircle,
  UsersIcon
} from "lucide-react"; // icons
import { useAuth } from "../context/AuthContext";
import Navbar from "./navbar";

const SidebarLayout = ({ children }) => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // for active tab

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Sidebar links
  const links = [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: "/admin/employees", label: "Employees", icon: <Users className="w-5 h-5" /> },
    { to: "/admin/add", label: "Add Employee", icon: <UserPlus className="w-5 h-5" /> },
    { to: "/admin/adminprofile", label: "Admin Profile", icon: <UserCircle className="w-5 h-5" /> },
  ];

  return (
    <>
      <Navbar/>
      <div className="min-h-screen flex flex-col md:flex-row pt-0 md:pt-16">
        {/* Sidebar */}
        <aside
          className={`${
            isOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-purple-700 text-white p-4 space-y-6 md:min-h-screen fixed md:relative z-20`}
        >
          {/* Close icon for mobile */}
          <div className="md:hidden flex justify-end">
            <button onClick={() => setIsOpen(false)} className="text-white">
              <X className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          {/* Sidebar Links */}
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-4 py-2 rounded-md ${
                  location.pathname === link.to
                    ? "bg-white text-purple-700 font-semibold"
                    : "hover:bg-purple-600 text-white"
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
  
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100 ml-0">
          {/* Mobile menu toggle */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => setIsOpen(true)}
              className="text-purple-700 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          {children}
        </main>
      </div>
    </>
  );
};

export default SidebarLayout;
