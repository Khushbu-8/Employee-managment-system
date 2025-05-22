import React from "react";
import {
  BarChart2,
  Clock3,
  CalendarX,
  Contact,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "PROJECTS",
    count: 0,
    icon: <BarChart2 className="w-6 h-6 text-green-500" />,
    color: "border-green-500",
    text: "text-green-600",
  },
  {
    title: "PENDING",
    count: 0,
    icon: <Clock3 className="w-6 h-6 text-red-500" />,
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
    link: "/profile",
    color: "border-purple-500",
    text: "text-purple-600",
  },
];

const DashboardCards = () => {
  return (
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
                Update Profile
              </Link>
            ) : (
              <p className={`text-lg font-bold ${stat.text}`}>{stat.count}</p>
            )}
          </div>
          {stat.icon}
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
