import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { username, password, confirmPassword, role } = formData;

  // Fetch user data if in edit mode
  useEffect(() => {
    const fetchUser = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const res = await axios.get(`/api/users/${id}`);
          setFormData({
            username: res.data.username,
            password: '',
            confirmPassword: '',
            role: res.data.role
          });
          setError(null);
        } catch (err) {
          setError(err.response?.data?.message || 'Error fetching user');
          console.error('Error fetching user:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [id, isEditMode]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const onSubmit = async e => {
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
    
    // Prepare data for API
    const userData = {
      username,
      role
    };
    
    if (password) {
      userData.password = password;
    }
    
    try {
      if (isEditMode) {
        // Update user
        await axios.put(`/api/users/${id}`, userData);
        setSuccessMessage('User updated successfully');
      } else {
        // Create user
        await axios.post('/api/users', userData);
        setSuccessMessage('User created successfully');
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          role: 'user'
        });
      }
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving user');
      console.error('Error saving user:', err);
    }
  };

  if (loading) return <div>Loading user data...</div>;

  return (
    <div className="form-container">
      <h2>{isEditMode ? 'Edit User' : 'Add User'}</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Enter username"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">
            Password {isEditMode && '(Leave blank to keep current password)'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder={isEditMode ? 'Enter new password (optional)' : 'Enter password'}
          />
        </div>
        
        {password && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm password"
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={onChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditMode ? 'Update User' : 'Add User'}
          </button>
          <button
            type="button"
            className="btn"
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