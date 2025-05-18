import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import Home from './components/Home.jsx';
import AdminPanel from './components/admin/AdminPanel.jsx';
import Holidays from './components/Holidays.jsx';
import Shop from './components/Shop.jsx';
import { useAuth } from './context/AuthContext.jsx';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/holidays"
                    element={
                        <ProtectedRoute>
                            <Holidays />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/shop"
                    element={
                        <ProtectedRoute>
                            <Shop />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/*"
                    element={
                        <AdminRoute>
                            <AdminPanel />
                        </AdminRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

// Protected route component
function ProtectedRoute({ children }) {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Redirect admin users to the admin panel
    if (user?.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return children;
}

// Admin route component
function AdminRoute({ children }) {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default App;