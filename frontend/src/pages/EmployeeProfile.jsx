import React, { useEffect, useState } from 'react'
import { useAuth } from "../context/AuthContext";
import API from '../services/api';
import Navbar from '../components/navbar';

const EmployeeProfile = () => {
     const { token } = useAuth();
     console.log(token);
     
  const [profile, setProfile] = useState(null);
  const fetchProfile = async () => {
     const res = await API.get("/auth/employeeProfile",{
      headers: { Authorization: `Bearer ${token}` }
     })
        
    
    console.log(res.data,"Profiledataaa");
    
    setProfile(res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
   <>
   <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">Employee Profile</h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <label className="font-semibold">Name:</label>
            <p className="ml-2 text-lg text-indigo-900">{profile?.username}</p>
          </div>
          <div>
            <label className="font-semibold">Email:</label>
            <p className="ml-2 text-lg text-indigo-900">{profile?.email}</p>
          </div>
          <div>
            <label className="font-semibold">Role:</label>
            <p className="ml-2 text-lg text-indigo-900 capitalize">{profile?.role}</p>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default EmployeeProfile
