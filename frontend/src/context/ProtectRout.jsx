import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import {  useAuth } from '../context/AuthContext';

const ProtectRout = ({ children, role }) => {
     const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}

export default ProtectRout