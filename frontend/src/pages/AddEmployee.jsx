import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout";
import { useAuth } from "../context/AuthContext";

const AddEmployee = () => {
   const { token } = useAuth();
    //  console.log(token);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfJoining: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    const res =  await API.post("/employee/addEmployee", formData ,{
        headers: { Authorization: `Bearer ${token}` }
    });
      // console.log(res.data,"employee");
      navigate("/admin/employees");
    } catch (err) {
      console.log(err);
      
      setError("Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded">
        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
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
            {loading ? "Submitting..." : "Add Employee"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </SidebarLayout>
  );
};

export default AddEmployee;
