import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/users');
        setUsers(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id, username) => {
    if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
      try {
        await axios.delete(`/api/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
        setSuccessMessage(`User ${username} deleted successfully`);
        setDeleteError(null);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } catch (err) {
        setDeleteError(err.response?.data?.message || 'Error deleting user');
        console.error('Error deleting user:', err);
      }
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>Users</h2>
        <Link to="/admin/add" className="btn btn-primary">Add User</Link>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {deleteError && <div className="alert alert-danger">{deleteError}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/admin/edit/${user._id}`} className="btn">Edit</Link>
                  {user.username !== 'admin' && (
                    <button
                      onClick={() => deleteUser(user._id, user.username)}
                      className="btn btn-danger"
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