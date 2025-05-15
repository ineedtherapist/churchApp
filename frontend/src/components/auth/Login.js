import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Update form error when auth error changes
  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  const { username, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    // Validate form
    if (!username || !password) {
      setFormError('Please enter both username and password');
      return;
    }
    
    try {
      await login(username, password);
      // Redirect will happen in the useEffect
    } catch (err) {
      console.error('Login error:', err);
      // Error is handled by the auth context
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Login</h1>
        {formError && <div className="alert alert-danger">{formError}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p className="mt-3">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;