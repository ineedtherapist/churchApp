import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// Кольори з home.jsx
const gold = '#ffd42e';
const white = '#fff';
const hoverPurple = '#9d4edd';
const lightPurple = '#ede7f6';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  const { login, isAuthenticated, error, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('User authenticated:', user);
      if (user?.role === 'admin') {
        console.log('Admin user detected in Login, redirecting to /admin');
        // Force a hard navigation to avoid React Router issues
        window.location.href = '/admin';
      } else {
        console.log('Regular user, redirecting to home');
        navigate('/');
      }
    }
  }, [isAuthenticated, user, navigate]);

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
    <div style={{
      minHeight: '100vh',
      background: white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'inherit', // як у всіх інших
      fontSize: '1.08rem'    // як у всіх інших
    }}>
      <div style={{
        background: white,
        border: `2px solid ${gold}`,
        borderRadius: 16,
        boxShadow: `0 4px 24px rgba(157, 78, 221, 0.07)`,
        padding: '40px 32px 32px 32px',
        minWidth: 340,
        maxWidth: 380,
        width: '100%',
        fontFamily: 'inherit',
        fontSize: '1.08rem'
      }}>
        <h1 style={{
          color: gold,
          textAlign: 'center',
          marginBottom: 28,
          fontWeight: 700,
          fontSize: '2rem',
          letterSpacing: '1px',
          fontFamily: 'inherit'
        }}>Login</h1>
        {formError && (
          <div style={{
            background: formError === 'Invalid credentials' ? '#ef233c' : '#fff3cd',
            color: formError === 'Invalid credentials' ? '#fff' : '#856404',
            border: `1px solid ${gold}`,
            borderRadius: 6,
            padding: '10px 16px',
            marginBottom: 18,
            textAlign: 'center',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}>
            {formError}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="username" style={{
              display: 'block',
              marginBottom: 6,
              color: '#111',
              fontWeight: 600,
              letterSpacing: '0.5px',
              fontFamily: 'inherit',
              fontSize: '1.08rem'
            }}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Enter your username"
              style={{
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                padding: '11px 8px 11px 8px',
                borderRadius: 6,
                border: `1.5px solid ${gold}`,
                background: lightPurple,
                fontSize: '1.08rem',
                outline: 'none',
                marginBottom: 2,
                transition: 'border 0.2s',
                marginLeft: 0,
                marginRight: 0,
                textAlign: 'left',
                fontFamily: 'inherit'
              }}
              onFocus={e => e.target.style.border = `1.5px solid ${hoverPurple}`}
              onBlur={e => e.target.style.border = `1.5px solid ${gold}`}
            />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: 6,
              color: '#111',
              fontWeight: 600,
              letterSpacing: '0.5px',
              fontFamily: 'inherit',
              fontSize: '1.08rem'
            }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              style={{
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                padding: '11px 8px 11px 8px',
                borderRadius: 6,
                border: `1.5px solid ${gold}`,
                background: lightPurple,
                fontSize: '1.08rem',
                outline: 'none',
                marginBottom: 2,
                transition: 'border 0.2s',
                marginLeft: 0,
                marginRight: 0,
                textAlign: 'left',
                fontFamily: 'inherit'
              }}
              onFocus={e => e.target.style.border = `1.5px solid ${hoverPurple}`}
              onBlur={e => e.target.style.border = `1.5px solid ${gold}`}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              background: gold,
              color: white,
              fontWeight: 700,
              fontSize: '1.08rem',
              padding: '11px 0',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              fontFamily: 'inherit'
            }}
            onMouseOver={e => {
              e.target.style.background = hoverPurple;
              e.target.style.color = white;
            }}
            onMouseOut={e => {
              e.target.style.background = gold;
              e.target.style.color = white;
            }}
          >
            Login
          </button>
        </form>
        <p style={{
          marginTop: 22,
          textAlign: 'center',
          color: '#888',
          fontSize: '1.08rem',
          fontFamily: 'inherit'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: hoverPurple,
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: 'inherit'
          }}
            onMouseOver={e => e.target.style.textDecoration = 'underline'}
            onMouseOut={e => e.target.style.textDecoration = 'none'}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
