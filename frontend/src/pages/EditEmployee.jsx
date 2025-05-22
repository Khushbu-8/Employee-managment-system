import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import SidebarLayout from "../components/SidebarLayout";
import { useAuth } from "../context/AuthContext";

const EditEmployee = () => {
  const {token} = useAuth()
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dateOfJoining: "",
    role: "employee",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/employee/getEmployeeById/${id}`);
        console.log(res.data);
        
        setFormData({
          name: res.data.employee.name || "",
          email: res.data.employee.email || "",
          phone: res.data.employee.phone || "",
          dateOfJoining: res.data.employee.dateOfJoining?.split("T")[0] || ""
        });
      } catch (err) {
        setError("Failed to load employee");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put(`/employee/updateEmployee/${id}`, formData ,{
         headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/admin/employees");

    } catch (err) {
      setError("Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded">
        <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded"
          >
            {loading ? "Updating..." : "Update Employee"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </SidebarLayout>
  );
};

export default EditEmployee;
