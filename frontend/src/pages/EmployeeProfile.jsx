import React from 'react'
import { useAuth } from "../context/AuthContext";

const EmployeeProfile = () => {
     const { user } = useAuth();
    
  return (
    <div>
     <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      <div className="bg-white shadow-md rounded p-6 space-y-4">
        <p className='text-black'><strong>Name:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
    </div>
    </div>
  )
}

export default EmployeeProfile
