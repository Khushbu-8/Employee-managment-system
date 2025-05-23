import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout";
import { useAuth } from "../context/AuthContext";

const EmployeesList = () => {
  const {token} = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortKey, setSortKey] = useState("name"); // "name" or "date"
  const [sortOrder, setSortOrder] = useState("asc");
  
const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/employee/Viewemployee");
        setEmployees(res.data.viewEmp);
      } catch (err) {
        setError("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employee/deleteEmployee/${id}`,{
         headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (err) {
      alert("Error deleting employee");
    }
  };

  const filteredEmployees = employees
    .filter((emp) => {
      const matchesSearch = `${emp.username} ${emp.email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesDate =
        !dateFilter ||
        (emp.dateOfJoining &&
          new Date(emp.dateOfJoining).toISOString().split("T")[0] === dateFilter);

      return matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      if (sortKey === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortKey === "date") {
        return sortOrder === "asc"
          ? new Date(a.dateOfJoining) - new Date(b.dateOfJoining)
          : new Date(b.dateOfJoining) - new Date(a.dateOfJoining);
      }
      return 0;
    });

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <SidebarLayout>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold">Employees</h2>
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="Search name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-2 border-purple-500 rounded px-3 py-1"
            />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-2 border-purple-500 rounded px-3 py-1"
            />
            <button
              className="bg-purple-700 text-white px-4 py-1 font-semibold rounded hover:bg-purple-600"
              onClick={() => navigate("/admin/add")}
            >
              Add Employees
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
          <div className="overflow-x-auto rounded-lg hidden md:flex flex-col overflow-hidden">
            <table className="min-w-full rounded-lg overflow-hidden ">
              <thead className="border border-2  border-purple-700  text-white text-sm sm:text-base">
                <tr>
                  <th className="px-2 py-2" onClick={() => toggleSort("name")}><div className=" px-2 border rounded-sm py-2 bg-purple-700 w-full">  Full Name {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</div></th>
                  <th className="px-2 py-2">
                    <div className=" px-2 border rounded-sm py-2 bg-purple-700 w-full">Email</div>
                    </th>
                  <th className="px-2 py-2">
                    <div className=" px-2 border rounded-sm py-2 bg-purple-700 w-full">Phone</div>
                    </th>
                  <th className="px-2 py-2"  onClick={() => toggleSort("date")}><div className=" px-2 border rounded-sm py-2 bg-purple-700 w-full"> Date of Joining {sortKey === "date" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</div></th>
                 
                   <th className="px-2 py-2"><div className=" px-2 border rounded-sm py-2 bg-purple-700 w-full">Action</div></th>
                 
                </tr>
              </thead>
              <tbody className="font-semibold">
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="border border-2 border border-purple-700 rounded-sm hover:bg-gray-100 text-center text-sm sm:text-base"
                  >
                    <td className="p-2 ">{emp.name}</td>
                    <td className="p-2 ">{emp.email}</td>
                    <td className="p-2 ">{emp.phone}</td>
                    <td className="p-2 ">
                      {emp.dateOfJoining
                        ? new Date(emp.dateOfJoining).toLocaleDateString()
                        : "Not Specified"}
                    </td>
                    <td className="p-2 space-x-6 ">
                      <Link
                        to={`/admin/edit/${emp._id}`}
                        className="border border-2 m-2 border-purple-500 text-purple-700 px-2 py-1 rounded hover:bg-purple-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="border m-2 border-2 border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           <div className="mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn px-4 py-2 border border-2 border-purple-700 rounded mr-2 text-purple-700 cursor-pointer">Prev</button>
        <button onClick={() => setPage(page + 1)} className="btn px-4 py-2 border border-2 border-purple-700 rounded text-purple-700 cursor-pointer">Next</button>
      </div>
          </div>
          <div className="overflow-x-auto md:hidden rounded-lg border border-purple-700">
      <table className="min-w-full text-sm text-center sm:text-base">
        <thead className="bg-purple-700 text-white">
          <tr>
            <th className="px-4 py-2 cursor-pointer items-center" onClick={() => toggleSort("name")}>
              Full Name
            </th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => toggleSort("date")}>
              Date of Joining {sortKey === "date" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {filteredEmployees.map((emp) => (
            <tr
              key={emp._id}
              className="border-t border-purple-300 hover:bg-gray-100"
            >
              <td className="px-4 py-2">{emp.name}</td>
              <td className="px-4 py-2">{emp.email}</td>
              <td className="px-4 py-2">{emp.phone}</td>
              <td className="px-4 py-2">
                {emp.dateOfJoining
                  ? new Date(emp.dateOfJoining).toLocaleDateString()
                  : "Not Specified"}
              </td>
              <td className="px-4 py-2 space-x-2">
                <Link
                  to={`/admin/edit/${emp._id}`}
                  className="border m-2 border-purple-500 text-purple-700 px-2 py-1 rounded hover:bg-purple-600 hover:text-white"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="border m-2 border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border border-purple-700 rounded text-purple-700 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border border-purple-700 rounded text-purple-700"
        >
          Next
        </button>
      </div>
    </div>
          </>
        )}
      </div>
    </SidebarLayout>
  );
};

export default EmployeesList;

