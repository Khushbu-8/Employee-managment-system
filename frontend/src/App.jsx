import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Admin from './pages/Admin';
import EmployeeProfile from './pages/EmployeeProfile';
import EmployeesList from './pages/EmployeesList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';

function App() {
  return (
    
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
            
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<EmployeeProfile />} />
          <Route path="/admin/employees" element={<EmployeesList />} />
          <Route path="/admin/add" element={<AddEmployee />} />
          <Route path="/admin/add" element={<AddEmployee />} />
          <Route path="/admin/edit/:id" element={<EditEmployee />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;