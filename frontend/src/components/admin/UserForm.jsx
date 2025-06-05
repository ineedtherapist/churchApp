import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UsersContext.jsx';
import { adminPrimaryButton, adminDangerButton } from '../../styles/sharedStyles.js';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { getUserById, addUser, updateUser, loading } = useUsers();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { username, password, confirmPassword, role } = formData;

  // Fetch user data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const user = getUserById(id);
      if (user) {
        setFormData({
          username: user.username,
          password: '',
          confirmPassword: '',
          role: user.role
        });
        setError(null);
      } else {
        setError('User not found');
      }
    }
  }, [id, isEditMode, getUserById]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const onSubmit = e => {
    e.preventDefault();
    
    // Validate form
    if (!username) {
      setError('Username is required');
      return;
    }
    
    if (!isEditMode && !password) {
      setError('Password is required');
      return;
    }
    
    if (password && password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Prepare data for saving
    const userData = {
      username,
      role
    };
    
    if (password) {
      userData.password = password;
    }
    
    let result;

    if (isEditMode) {
      // Update user in localStorage
      result = updateUser(id, userData);
      if (result.success) {
        setSuccessMessage('User updated successfully');
      }
    } else {
      // Create user in localStorage
      result = addUser(userData);
      if (result.success) {
        setSuccessMessage('User created successfully');
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          role: 'user'
        });
      }
    }

    if (!result.success) {
      setError(result.error || 'Error saving user');
    } else {
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    }
  };

  if (loading) return <div>Loading user data...</div>;

  const formContainerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px'
  };

  const formGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box'
  };

  const selectStyle = {
    ...inputStyle,
    height: '40px'
  };

  const formActionsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  };

  const alertStyle = {
    padding: '10px 15px',
    borderRadius: '5px',
    marginBottom: '15px'
  };

  const alertSuccessStyle = {
    ...alertStyle,
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  };

  const alertDangerStyle = {
    ...alertStyle,
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  };

  return (
    <div style={formContainerStyle}>
      <h2>{isEditMode ? 'Edit User' : 'Add User'}</h2>
      
      {error && <div style={alertDangerStyle}>{error}</div>}
      {successMessage && <div style={alertSuccessStyle}>{successMessage}</div>}

      <form onSubmit={onSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="username" style={labelStyle}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Enter username"
            style={inputStyle}
          />
        </div>
        
        <div style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>
            Password {isEditMode && '(Leave blank to keep current password)'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder={isEditMode ? 'Enter new password (optional)' : 'Enter password'}
            style={inputStyle}
          />
        </div>
        
        {password && (
          <div style={formGroupStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm password"
              style={inputStyle}
            />
          </div>
        )}
        
        <div style={formGroupStyle}>
          <label htmlFor="role" style={labelStyle}>Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={onChange}
            style={selectStyle}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div style={formActionsStyle}>
          <button type="submit" style={adminPrimaryButton}>
            {isEditMode ? 'Update User' : 'Add User'}
          </button>
          <button
            type="button"
            style={{...adminDangerButton, background: '#6c757d'}}
            onClick={() => navigate('/admin')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

