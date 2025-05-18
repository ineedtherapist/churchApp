import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // додано

// Кольори та стилі як у Home.jsx
const gold = '#ffd42e';
const darkGold = '#c9a43a';
const white = '#fff';
const hoverPurple = '#9d4edd';

const holidays = [
  {
    date: '2024-04-07',
    title: 'Annunciation',
    description: 'Celebration of the Annunciation of the Blessed Virgin Mary.'
  },
  {
    date: '2024-04-28',
    title: 'Palm Sunday',
    description: 'Commemoration of Jesus’ triumphal entry into Jerusalem.'
  },
  {
    date: '2024-05-05',
    title: 'Easter',
    description: 'The Resurrection of Jesus Christ. Main Christian holiday.'
  },
  {
    date: '2024-06-23',
    title: 'Trinity Sunday',
    description: 'Celebration of the Holy Trinity.'
  },
  {
    date: '2024-08-19',
    title: 'Transfiguration',
    description: 'Feast of the Transfiguration of Jesus.'
  },
  {
    date: '2024-08-28',
    title: 'Dormition of the Mother of God',
    description: 'Commemoration of the Dormition of the Virgin Mary.'
  },
  {
    date: '2024-09-21',
    title: 'Nativity of the Blessed Virgin Mary',
    description: 'Celebration of the birth of the Virgin Mary.'
  },
  {
    date: '2024-12-25',
    title: 'Christmas',
    description: 'The birth of Jesus Christ. Joyful celebration for all Christians.'
  }
];

const socials = [
  { icon: "📘", label: "Facebook", url: "https://facebook.com/yourchurch" },
  { icon: "📸", label: "Instagram", url: "https://instagram.com/yourchurch" },
  { icon: "✉️", label: "Email", url: "mailto:info@yourchurch.example.com" }
];

const Holidays = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // додано

  // Для анімації появи
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Логаут (коректно скидає авторизацію)
  const handleLogout = () => {
    logout(); // тепер коректно скидає авторизацію
    navigate('/login');
  };

  return (
    <div style={{ background: white, minHeight: '100vh', position: 'relative' }}>
      {/* Header */}
      <header style={{
        background: gold,
        color: white,
        padding: '14px 0',
        marginBottom: 0,
        borderBottom: `2px solid ${gold}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 16px rgba(157, 78, 221, 0.10)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Декоративний градієнт */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(157,78,221,0.10) 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        {/* Логотип-іконка та напис */}
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
          <span style={{
            fontSize: 32,
            marginLeft: 18,
            marginRight: 8,
            userSelect: 'none'
          }}>⛪</span>
          <h1
            style={{
              margin: 0,
              fontSize: '1.1rem',
              letterSpacing: '2px',
              color: white,
              fontWeight: 700,
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            Your Online Church
          </h1>
        </div>
        <nav style={{ marginRight: 32, display: 'flex', gap: 24, alignItems: 'center', zIndex: 1 }}>
          <button
            onClick={() => navigate('/')}
            style={{
              color: darkGold,
              background: white,
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              padding: '7px 14px',
              borderRadius: 6,
              border: 'none',
              transition: 'background 0.2s, color 0.2s, border 0.2s',
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = hoverPurple;
              e.currentTarget.style.color = white;
              e.currentTarget.style.border = 'none';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = white;
              e.currentTarget.style.color = darkGold;
              e.currentTarget.style.border = 'none';
            }}
          >
            <span role="img" aria-label="home" style={{ marginRight: 6, background: 'none', transition: 'color 0.2s' }}>🏠</span>
            Home
          </button>
          <button
            onClick={() => navigate('/shop')}
            style={{
              color: darkGold,
              background: white,
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              padding: '7px 14px',
              borderRadius: 6,
              border: 'none',
              transition: 'background 0.2s, color 0.2s, border 0.2s',
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = hoverPurple;
              e.currentTarget.style.color = white;
              e.currentTarget.style.border = 'none';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = white;
              e.currentTarget.style.color = darkGold;
              e.currentTarget.style.border = 'none';
            }}
          >
            <span role="img" aria-label="shop" style={{ marginRight: 6, background: 'none', transition: 'color 0.2s' }}>🛒</span>
            Church Shop
          </button>
          <button
            onClick={() => navigate('/services')}
            style={{
              color: darkGold,
              background: white,
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              padding: '7px 14px',
              borderRadius: 6,
              border: 'none',
              transition: 'background 0.2s, color 0.2s, border 0.2s',
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = hoverPurple;
              e.currentTarget.style.color = white;
              e.currentTarget.style.border = 'none';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = white;
              e.currentTarget.style.color = darkGold;
              e.currentTarget.style.border = 'none';
            }}
          >
            <span role="img" aria-label="services" style={{ marginRight: 6, background: 'none', transition: 'color 0.2s' }}>🛐</span>
            Services
          </button>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: 24,
              color: white,
              background: '#ef233c',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              padding: '7px 18px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s, border 0.2s',
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#c3001b';
              e.currentTarget.style.color = white;
              e.currentTarget.style.border = 'none';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#ef233c';
              e.currentTarget.style.color = white;
              e.currentTarget.style.border = 'none';
            }}
          >
            Logout
          </button>
        </nav>
        {/* Декоративний роздільник */}
        <div style={{
          position: 'absolute',
          right: 180,
          top: '20%',
          height: '60%',
          width: 2,
          background: 'rgba(255,255,255,0.18)',
          borderRadius: 2,
          zIndex: 0
        }} />
      </header>

      {/* SVG Wave Decoration */}
      <div style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        overflow: 'hidden',
        lineHeight: 0,
        padding: 0
      }}>
        <svg
          viewBox={`0 0 ${window.innerWidth} 60`}
          width="100%"
          height="60"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path
            fill={hoverPurple}
            fillOpacity="0.08"
            d={`
              M0,32
              L${window.innerWidth * 0.033},37.3
              C${window.innerWidth * 0.066},43,${window.innerWidth * 0.133},53,${window.innerWidth * 0.2},58.7
              C${window.innerWidth * 0.266},64,${window.innerWidth * 0.333},64,${window.innerWidth * 0.4},53.3
              C${window.innerWidth * 0.466},43,${window.innerWidth * 0.533},21,${window.innerWidth * 0.6},16
              C${window.innerWidth * 0.666},11,${window.innerWidth * 0.733},21,${window.innerWidth * 0.8},32
              C${window.innerWidth * 0.866},43,${window.innerWidth * 0.933},53,${window.innerWidth * 0.966},58.7
              L${window.innerWidth},64
              L${window.innerWidth},0
              L${window.innerWidth * 0.966},0
              C${window.innerWidth * 0.933},0,${window.innerWidth * 0.866},0,${window.innerWidth * 0.8},0
              C${window.innerWidth * 0.733},0,${window.innerWidth * 0.666},0,${window.innerWidth * 0.6},0
              C${window.innerWidth * 0.533},0,${window.innerWidth * 0.466},0,${window.innerWidth * 0.4},0
              C${window.innerWidth * 0.333},0,${window.innerWidth * 0.266},0,${window.innerWidth * 0.2},0
              C${window.innerWidth * 0.133},0,${window.innerWidth * 0.066},0,${window.innerWidth * 0.033},0
              L0,0Z
            `}
          ></path>
        </svg>
      </div>
      <div style={{ height: 24 }} />

      {/* Holiday Calendar Content */}
      <section style={{
        width: '100vw',
        maxWidth: '100%',
        margin: '0 auto 40px auto',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s, transform 0.7s'
      }}>
        <div style={{
          position: 'relative',
          background: white,
          borderRadius: '12px',
          boxShadow: `0 2px 8px rgba(218,165,32,0.12)`,
          padding: '24px',
          minHeight: 400,
          border: `1.5px solid ${gold}`,
          width: '90vw',
          maxWidth: 900,
          margin: '0 auto'
        }}>
          <h2 style={{
            color: gold,
            margin: 0,
            marginBottom: 24,
            fontSize: '2rem',
            letterSpacing: '1px'
          }}>
            Church Holiday Calendar 2024
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {holidays.map((event, idx) => (
              <li key={idx} style={{
                marginBottom: 28,
                paddingBottom: 18,
                borderBottom: idx !== holidays.length - 1 ? `1px solid ${gold}33` : 'none',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 18,
                justifyContent: 'flex-start'
              }}>
                <span style={{
                  background: hoverPurple,
                  color: '#fff',
                  borderRadius: 8,
                  padding: '8px 18px',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  minWidth: 110,
                  textAlign: 'center',
                  boxShadow: `0 2px 8px ${hoverPurple}11`,
                  marginTop: 2
                }}>
                  {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    color: gold,
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    marginBottom: 2
                  }}>
                    {event.title}
                  </div>
                  <div style={{ color: '#444', fontSize: '1.05rem' }}>
                    {event.description}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div style={{
            marginTop: 36,
            background: `${hoverPurple}11`,
            border: `1.5px solid ${hoverPurple}`,
            borderRadius: 16,
            padding: '24px 18px',
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: `0 2px 12px ${hoverPurple}11`
          }}>
            <h3 style={{ color: hoverPurple, fontSize: '1.2rem', marginBottom: 8 }}>
              Celebrate with Us!
            </h3>
            <p style={{ color: '#444', fontSize: '1.05rem', marginBottom: 0 }}>
              We warmly invite you to join our festive services and events throughout the year.<br />
              Every holiday is a special opportunity to come together as a community and share in faith and joy.
            </p>
          </div>
        </div>
      </section>

      {/* Contacts & Socials */}
      <section id="contacts-section" style={{
        maxWidth: 900,
        margin: '0 auto 48px auto',
        padding: '0 12px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: gold, marginBottom: 18, fontSize: '1.4rem' }}>Contact Us</h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 32,
          flexWrap: 'wrap',
          marginBottom: 18
        }}>
          <div>
            <div style={{ color: hoverPurple, fontWeight: 700, fontSize: '1.1rem' }}>Address</div>
            <div style={{ color: '#444' }}>123 Church St, Kyiv, Ukraine</div>
          </div>
          <div>
            <div style={{ color: hoverPurple, fontWeight: 700, fontSize: '1.1rem' }}>Phone</div>
            <div style={{ color: '#444' }}>+380 44 123 4567</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}>
          {socials.map(s => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: hoverPurple,
                fontSize: 28,
                margin: '0 6px',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.color = gold}
              onMouseOut={e => e.currentTarget.style.color = hoverPurple}
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </section>

      {/* Footer site */}
      <footer style={{
        background: gold,
        color: white,
        textAlign: 'center',
        padding: '16px 0',
        fontSize: '1rem',
        letterSpacing: '1px'
      }}>
        © 2024 Your Online Church. All rights reserved.
      </footer>
    </div>
  );
};

export default Holidays;

