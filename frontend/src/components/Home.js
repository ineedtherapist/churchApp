import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Welcome, {user?.username}!</h1>
        <div className="content">
          <h2>Hello World</h2>
          <p>You are now logged in to the Church Website.</p>
          {user?.role === 'admin' && (
            <div className="admin-link">
              <p>
                <a href="/admin">Go to Admin Panel</a>
              </p>
            </div>
          )}
        </div>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
