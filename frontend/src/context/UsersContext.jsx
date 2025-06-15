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
            id: '1',
            username: 'admin',
            password: 'admin', // У реальному проекті паролі потрібно хешувати
            role: 'admin',
            createdAt: new Date().toISOString()
          };
          localStorage.setItem('users', JSON.stringify([defaultAdmin]));
          setUsers([defaultAdmin]);
        } else {
          // Перевіряємо чи існує адмін-користувач
          const adminExists = parsedUsers.some(user => user.username === 'admin' && user.role === 'admin');
          if (!adminExists) {
            // Додаємо адміністратора, якщо його немає
            const adminUser = {
              id: Date.now().toString(),
              username: 'admin',
              password: 'admin',
              role: 'admin',
              createdAt: new Date().toISOString()
            };
            const updatedUsers = [...parsedUsers, adminUser];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
          } else {
            setUsers(parsedUsers);
          }
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
    return users.find(user => user.id === id);
  };

  // Add new user
  const addUser = (userData) => {
    try {
      // Generate a unique ID
      const newId = Date.now().toString();
      const newUser = {
        ...userData,
        id: newId,
        createdAt: new Date().toISOString()
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
      const userIndex = users.findIndex(user => user.id === id);

      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }

      const updatedUsers = [...users];
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        ...userData,
        id: id // Ensure the ID remains unchanged
      };

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      // Якщо оновлено поточного користувача, оновлюємо також його дані в localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser.id === id) {
        const updatedCurrentUser = { ...updatedUsers[userIndex] };
        delete updatedCurrentUser.password; // Видаляємо пароль
        localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
      }

      return { success: true, user: updatedUsers[userIndex] };
    } catch (err) {
      console.error('Error updating user:', err);
      return { success: false, error: 'Failed to update user' };
    }
  };

  // Delete user
  const deleteUser = (id) => {
    try {
      const userExists = users.some(user => user.id === id);

      if (!userExists) {
        return { success: false, error: 'User not found' };
      }

      // Перевіряємо чи користувач є адміністратором
      const user = users.find(u => u.id === id);
      if (user.role === 'admin') {
        // Рахуємо кількість адміністраторів
        const adminCount = users.filter(u => u.role === 'admin').length;

        // Забороняємо видалення останнього адміністратора
        if (adminCount <= 1) {
          return { success: false, error: 'Cannot delete the only admin user' };
        }
      }

      const updatedUsers = users.filter(user => user.id !== id);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      // Якщо видалено поточного користувача, виходимо з системи
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser.id === id) {
        localStorage.removeItem('currentUser');
      }

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
