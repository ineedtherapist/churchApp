import React, { createContext, useState, useContext, useEffect } from 'react';

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load users from localStorage on initial render
  useEffect(() => {
    const loadUsers = () => {
      try {
        const storedUsers = localStorage.getItem('users');
        const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];

        // If no users exist yet, create a default admin user
        if (parsedUsers.length === 0) {
          const defaultAdmin = {
            _id: '1',
            username: 'admin',
            password: 'admin123', // In a real app, this should be hashed
            role: 'admin'
          };
          localStorage.setItem('users', JSON.stringify([defaultAdmin]));
          setUsers([defaultAdmin]);
        } else {
          setUsers(parsedUsers);
        }
      } catch (err) {
        console.error('Error loading users from localStorage:', err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Get all users
  const getAllUsers = () => {
    return users;
  };

  // Get user by ID
  const getUserById = (id) => {
    return users.find(user => user._id === id);
  };

  // Add new user
  const addUser = (userData) => {
    try {
      // Generate a unique ID
      const newId = Date.now().toString();
      const newUser = {
        ...userData,
        _id: newId
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      return { success: true, user: newUser };
    } catch (err) {
      console.error('Error adding user:', err);
      return { success: false, error: 'Failed to add user' };
    }
  };

  // Update user
  const updateUser = (id, userData) => {
    try {
      const userIndex = users.findIndex(user => user._id === id);

      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }

      const updatedUsers = [...users];
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        ...userData,
        _id: id // Ensure the ID remains unchanged
      };

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      return { success: true, user: updatedUsers[userIndex] };
    } catch (err) {
      console.error('Error updating user:', err);
      return { success: false, error: 'Failed to update user' };
    }
  };

  // Delete user
  const deleteUser = (id) => {
    try {
      const userExists = users.some(user => user._id === id);

      if (!userExists) {
        return { success: false, error: 'User not found' };
      }

      const updatedUsers = users.filter(user => user._id !== id);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      return { success: true };
    } catch (err) {
      console.error('Error deleting user:', err);
      return { success: false, error: 'Failed to delete user' };
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        getAllUsers,
        getUserById,
        addUser,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
