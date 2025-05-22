import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import SidebarLayout from "../components/SidebarLayout";

const EditEmployee = () => {
  const { id } = useParams();
  console.log(id,"prams");
  
  const [formData, setFormData] = useState({ name: "", email: "", role: "employee" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/admin/employees/${id}`);
        setFormData(res.data);
      } catch (err) {
        setError("Failed to load employee");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put(`/admin/employees/${id}`, formData);
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
            name="username"
            placeholder="Name"
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
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
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
