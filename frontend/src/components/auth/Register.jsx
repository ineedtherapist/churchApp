import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// Кольори з home.jsx
const gold = '#ffd42e';
const white = '#fff';
const hoverPurple = '#9d4edd';
const lightPurple = '#ede7f6';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');
  const { register, isAuthenticated, error } = useAuth();
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

  const { username, password, confirmPassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    // Validate form
    if (!username || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    
    try {
      await register(username, password);
      // Redirect will happen in the useEffect
    } catch (err) {
      console.error('Registration error:', err);
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
        }}>Register</h1>
        {formError && (
          <div style={{
            background:
              formError === 'Password must be at least 6 characters' || formError === 'Passwords do not match'
                ? '#ef233c'
                : '#fff3cd',
            color:
              formError === 'Password must be at least 6 characters' || formError === 'Passwords do not match'
                ? '#fff'
                : '#856404',
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
          <div style={{ marginBottom: 18 }}>
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
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="confirmPassword" style={{
              display: 'block',
              marginBottom: 6,
              color: '#111',
              fontWeight: 600,
              letterSpacing: '0.5px',
              fontFamily: 'inherit',
              fontSize: '1.08rem'
            }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm your password"
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
            Register
          </button>
        </form>
        <p style={{
          marginTop: 22,
          textAlign: 'center',
          color: '#888',
          fontSize: '1.08rem',
          fontFamily: 'inherit'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: hoverPurple,
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: 'inherit'
          }}
            onMouseOver={e => e.target.style.textDecoration = 'underline'}
            onMouseOut={e => e.target.style.textDecoration = 'none'}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

