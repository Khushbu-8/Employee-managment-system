import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeesList from "./pages/EmployeesList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import { useAuth } from "./context/AuthContext";
import AdminProfile from "./pages/AdminProfile";

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  console.log(user,"uuuusss");
  
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          !user ? <Login /> : <Navigate to={user.role === "admin" ? "/admin" : "/profile"} />
        }
      />
      <Route
        path="/admin"
        element={   
              user ? <Admin /> : <Navigate to={user?.role === "admin" ? "/admin" : "/admin/adminprofile"} />  
        }
      />
      <Route
        path="/profile"
        element={
           user ?  <EmployeeProfile /> : <Navigate to={user?.role === "employee" ? "/profile" : "/admin"} />  
           
          
        }
      />
      <Route
        path="/admin/adminprofile"
        element={
           user ?  <AdminProfile /> : <Navigate to={user?.role === "admin" ? "/admin/adminprofile" : "/admin"} />  
           
          
        }
      />
      <Route path="/admin/employees" element={<EmployeesList />} />
      <Route path="/admin/add" element={<AddEmployee />} />
      <Route path="/admin/edit/:id" element={<EditEmployee />} />
    </Routes>
  );
};

export default AppRoutes;
