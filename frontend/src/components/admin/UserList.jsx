import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../context/UsersContext.jsx';
import { adminPrimaryButton, adminDangerButton } from '../../styles/sharedStyles.js';

const UserList = () => {
  const { users, loading, deleteUser } = useUsers();
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleDeleteUser = (id, username) => {
    if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
      const result = deleteUser(id);

      if (result.success) {
        setSuccessMessage(`User ${username} deleted successfully`);
        setError(null);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setError(result.error || 'Error deleting user');
      }
    }
  };

  if (loading) return <div>Loading users...</div>;

  const userListHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
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

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const thStyle = {
    textAlign: 'left',
    padding: '12px 15px',
    borderBottom: '1px solid #ddd'
  };

  const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd'
  };

  const actionButtonStyle = {
    marginRight: '10px',
    cursor: 'pointer'
  };

  return (
    <div className="user-list">
      <div style={userListHeaderStyle}>
        <h2>Users</h2>
        <Link to="/admin/add" style={{ ...adminPrimaryButton, textDecoration: 'none' }}>Add User</Link>
      </div>
      
      {error && <div style={alertDangerStyle}>{error}</div>}
      {successMessage && <div style={alertSuccessStyle}>{successMessage}</div>}

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={tdStyle}>{user.username}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>
                  <Link
                    to={`/admin/edit/${user.id}`}
                    style={{ ...adminPrimaryButton, ...actionButtonStyle, textDecoration: 'none' }}
                  >
                    Edit
                  </Link>
                  {user.username !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(user.id, user.username)}
                      style={{ ...adminDangerButton, ...actionButtonStyle }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
