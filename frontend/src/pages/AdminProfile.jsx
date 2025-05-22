import React, { useEffect, useState } from 'react'
import { useAuth } from "../context/AuthContext";
import API from '../services/api';
import Navbar from '../components/navbar';
import SidebarLayout from '../components/SidebarLayout';

const AdminProfile = () => {
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
    <SidebarLayout>
   
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header Banner */}
      <div className="h-24 bg-gradient-to-r from-purple-400 to-purple-600 relative">
        {/* Avatar */}
        <div className="absolute -bottom-8 left-6">
          <img
            src="https://i.pravatar.cc/100"
            alt="Avatar"
            className="w-16 h-16 rounded-full border-4 border-white"
          />
        </div>
        {/* Edit Button */}
        <div className="absolute top-4 right-4">
          <button className="bg-purple-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-10 px-6 pb-4">
        <h2 className="text-xl font-semibold text-gray-800">{profile?.username}</h2>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, expedita!
        </p>
        <div className="text-sm text-gray-600 mt-2 space-x-4">
          
          <span>
            Status: <span className="text-green-600 font-semibold">Active</span>
          </span>
        </div>

        {/* Details */}
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="font-medium">🧑‍💼 Role:</span>
            <span>{profile?.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">📧 Email:</span>
            <span>{profile?.email}</span>
          </div>
          
        </div>
      </div>
    </div>
    </SidebarLayout>
   </>
  )
}

export default AdminProfile
