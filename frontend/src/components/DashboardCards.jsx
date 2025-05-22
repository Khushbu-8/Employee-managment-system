import React, { useEffect, useState } from "react";
import {
  BarChart2,
  Clock3,
  CalendarX,
  Contact,
  Database,
} from "lucide-react";
import { Link } from "react-router-dom";
import API from "../services/api"; // Adjust to your API file path

const DashboardCards = () => {
  const [userCount, setUserCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/auth/getAllUsers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const users = res.data;

      const userRoleCount = users.filter(user => user.role === "employee").length;
      const adminRoleCount = users.filter(user => user.role === "admin").length;

      setUserCount(userRoleCount);
      setAdminCount(adminRoleCount);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
 
  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/employee/Viewemployee", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const employee = res.data.viewEmp.length;

   setEmployeeCount(employee)
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
 
  useEffect(() => {
    fetchUserStats();
    fetchEmployee();
  }, []);

  const stats = [
    {
      title: "Employee",
      count: employeeCount,
      icon: <BarChart2 className="w-6 h-6 text-green-500" />,
      color: "border-green-500",
      text: "text-green-600",
    },
    {
      title: "Admin",
      count: adminCount,
      icon: <Database className="w-6 h-6 text-red-500" />,
      color: "border-red-500",
      text: "text-red-600",
    },
    {
      title: "DAYS OFF",
      count: 0,
      icon: <CalendarX className="w-6 h-6 text-yellow-500" />,
      color: "border-yellow-500",
      text: "text-yellow-600",
    },
    {
      title: "PROFILE",
      icon: <Contact className="w-6 h-6 text-purple-500" />,
      link: "/admin/adminprofile",
      color: "border-purple-500",
      text: "text-purple-600",
    },
  ];

  return (
    <>
    <div className="p-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`border rounded-md p-4 flex justify-between items-center ${stat.color}`}
        >
          <div>
            <h3 className="font-semibold text-gray-700">{stat.title}</h3>
            {stat.link ? (
              <Link to={stat.link} className="text-blue-600 underline text-sm">
                 Profile
              </Link>
            ) : (
              <p className={`text-lg font-bold ${stat.text}`}>{stat.count}</p>
            )}
          </div>
          {stat.icon}
        </div>
      ))}
    </div>
    </>
  );
};

export default DashboardCards;
