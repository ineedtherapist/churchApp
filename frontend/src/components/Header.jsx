import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
    white,
    hoverPurple,
    darkGold,
    headerStyle,
    headerGradient,
    headerLogoWrap,
    headerLogoIcon,
    headerLogoText,
    headerNav,
    headerNavBtn,
    headerNavBtnLogout,
    headerDivider
} from '../styles/sharedStyles';

const Header = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header style={headerStyle}>
            <div style={headerGradient} />
            <div style={headerLogoWrap}>
                <span style={headerLogoIcon}>⛪</span>
                <h1
                    style={headerLogoText}
                    onClick={() => navigate('/')}
                >
                    Your Online Church
                </h1>
            </div>
            <nav style={headerNav}>
                <button
                    onClick={() => navigate('/shop')}
                    style={headerNavBtn}
                    onMouseOver={e => {
                        e.currentTarget.style.background = hoverPurple;
                        e.currentTarget.style.color = white;
                        e.currentTarget.style.border = 'none';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.background = white;
                        e.currentTarget.style.color = darkGold;
                        e.currentTarget.style.border = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <span role="img" aria-label="shop" style={{ marginRight: 6, background: 'none', transition: 'color 0.2s' }}>🛒</span>
                    Church Shop
                </button>
                <button
                    onClick={() => navigate('/holidays')}
                    style={headerNavBtn}
                    onMouseOver={e => {
                        e.currentTarget.style.background = hoverPurple;
                        e.currentTarget.style.color = white;
                        e.currentTarget.style.border = 'none';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.background = white;
                        e.currentTarget.style.color = darkGold;
                        e.currentTarget.style.border = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <span role="img" aria-label="calendar" style={{ marginRight: 6, background: 'none', transition: 'color 0.2s' }}>📅</span>
                    Holiday Calendar
                </button>
                <button
                    onClick={() => navigate('/services')}
                    style={headerNavBtn}
                    onMouseOver={e => {
                        e.currentTarget.style.background = hoverPurple;
                        e.currentTarget.style.color = white;
                        e.currentTarget.style.border = 'none';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.background = white;
                        e.currentTarget.style.color = darkGold;
                        e.currentTarget.style.border = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <span role="img" aria-label="services" style={{ marginRight: 6, background: 'none', transition: 'color 0.2s' }}>🛐</span>
                    Services
                </button>
                <button
                    onClick={handleLogout}
                    style={headerNavBtnLogout}
                    onMouseOver={e => {
                        e.currentTarget.style.background = '#c3001b';
                        e.currentTarget.style.color = white;
                        e.currentTarget.style.border = 'none';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.background = '#ef233c';
                        e.currentTarget.style.color = white;
                        e.currentTarget.style.border = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    Logout
                </button>
            </nav>
            <div style={headerDivider} />
        </header>
    );
};

export default Header;