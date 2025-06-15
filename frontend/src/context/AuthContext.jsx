import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Допоміжні функції для роботи з користувачами в localStorage
const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Ініціалізація системи - створення адміністратора, якщо він ще не існує
const initializeUsers = () => {
  const users = getUsers();
  if (users.length === 0) {
    // Додаємо користувача admin з паролем admin та роллю admin
    users.push({
      id: '1',
      username: 'admin',
      password: 'admin', // У реальному проекті паролі потрібно хешувати
      role: 'admin',
      createdAt: new Date().toISOString()
    });
    saveUsers(users);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ініціалізація системи при першому запуску
  useEffect(() => {
    initializeUsers();
  }, []);

  // Загрузка користувача з localStorage при початковому рендері
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('currentUser');

        if (!savedUser) {
          setLoading(false);
          return;
        }

        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error loading user:', err.message);
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Реєстрація користувача
  const register = (username, password) => {
    try {
      setError(null);

      // Перевіряємо чи користувач вже існує
      const users = getUsers();
      const existingUser = users.find(u => u.username === username);

      if (existingUser) {
        setError('Username already exists');
        return false;
      }

      // Створюємо нового користувача
      const newUser = {
        id: Date.now().toString(),
        username,
        password, // У реальному проекті паролі потрібно хешувати
        role: 'user',
        createdAt: new Date().toISOString()
      };

      // Зберігаємо користувача в списку користувачів
      users.push(newUser);
      saveUsers(users);

      // Зберігаємо поточного користувача
      const currentUser = { ...newUser };
      delete currentUser.password; // Видаляємо пароль з об'єкту поточного користувача

      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Встановлюємо стан користувача та автентифікації
      setUser(currentUser);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError('Registration failed: ' + err.message);
      return false;
    }
  };

  // Вхід користувача
  const login = (username, password) => {
    try {
      setError(null);

      // Знаходимо користувача у списку користувачів
      const users = getUsers();
      const foundUser = users.find(u => u.username === username && u.password === password);

      if (!foundUser) {
        setError('Invalid username or password');
        return false;
      }

      // Зберігаємо поточного користувача
      const currentUser = { ...foundUser };
      delete currentUser.password; // Видаляємо пароль з об'єкту поточного користувача

      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Встановлюємо стан користувача та автентифікації
      setUser(currentUser);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError('Login failed: ' + err.message);
      return false;
    }
  };

  // Вихід користувача
  const logout = () => {
    // Видаляємо поточного користувача з localStorage
    localStorage.removeItem('currentUser');

    // Скидаємо стан
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
