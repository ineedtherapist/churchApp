import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import UserList from './UserList.jsx';
import UserForm from './UserForm.jsx';
import {
  adminContainerStyle,
  adminHeaderStyle,
  adminTitleStyle,
  adminNavStyle,
  adminPrimaryButton,
  adminDangerButton
} from '../../styles/sharedStyles.js';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToHomePage = () => {
    // Navigate to the actual home page outside of admin routes
    window.location.href = '/';
  };

  return (
    <div style={adminContainerStyle}>
      <div style={adminHeaderStyle}>
        <h1 style={adminTitleStyle}>Admin Panel</h1>
        <div style={adminNavStyle}>
          <button onClick={goToHomePage} style={adminPrimaryButton}>Home</button>
          <button onClick={handleLogout} style={adminDangerButton}>Logout</button>
        </div>
      </div>
      
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;
