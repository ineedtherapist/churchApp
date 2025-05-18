import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // додати цей імпорт

// Імпорт локальних зображень
import image1 from '../assets/images/1image.jpg';
import image2 from '../assets/images/2image.jpg';
import image3 from '../assets/images/3image.jpg';

const newsEvents = [
  {
    title: 'Sunday Service',
    description: 'Join us every Sunday at 10:00 AM for our main worship service.',
    image: image1
  },
  {
    title: 'Charity Fair',
    description: 'Participate in our annual charity fair on July 15th. All proceeds go to local families in need.',
    image: image2
  },
  {
    title: 'Youth Bible Study',
    description: 'Every Friday at 6:00 PM. All teens are welcome!',
    image: image3
  }
];

const workingHours = [
  { day: 'Monday', hours: '09:00 - 17:00' },
  { day: 'Tuesday', hours: '09:00 - 17:00' },
  { day: 'Wednesday', hours: '09:00 - 17:00' },
  { day: 'Thursday', hours: '09:00 - 17:00' },
  { day: 'Friday', hours: '09:00 - 17:00' },
  { day: 'Saturday', hours: '10:00 - 14:00' },
  { day: 'Sunday', hours: '10:00 - 13:00' }
];

const churchDescription = [
  {
    icon: '🙏',
    title: 'Our Mission',
    text: 'We strive to bring people together in faith, hope, and love, creating a welcoming community for all ages and backgrounds.'
  },
  {
    icon: '🤝',
    title: 'Community',
    text: 'Our church is a place where friendships are formed, families are supported, and everyone is encouraged to grow spiritually.'
  },
  {
    icon: '🌟',
    title: 'Inspiration',
    text: 'Through worship, service, and learning, we inspire each other to live meaningful lives and make a positive impact in the world.'
  }
];

const gold = '#ffd42e'; // новий золотий
const darkGold = '#c9a43a'; // темніший золотий (як у фоні Church Working Hours)
const white = '#fff';
const hoverPurple = '#9d4edd';
const headerPurple = '#9d4edd'; // фіолетовий для хедера

const reviews = [
  {
    name: "Anna P.",
    text: "This church has become my second family. The community is so warm and welcoming!"
  },
  {
    name: "Oleh S.",
    text: "I love the youth programs and the inspiring sermons every Sunday."
  },
  {
    name: "Maria K.",
    text: "A place where I found peace, support, and true friends."
  }
];

const socials = [
  { icon: "📘", label: "Facebook", url: "https://facebook.com/yourchurch" },
  { icon: "📸", label: "Instagram", url: "https://instagram.com/yourchurch" },
  { icon: "✉️", label: "Email", url: "mailto:info@yourchurch.example.com" }
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { logout } = useAuth(); // отримати logout з контексту

  // Для анімації появи
  const [sliderVisible, setSliderVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);

  React.useEffect(() => {
    setTimeout(() => setSliderVisible(true), 100);
    setTimeout(() => setDescVisible(true), 400);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsEvents.length) % newsEvents.length);
  };

  const handleLogout = () => {
    logout(); // коректно скидає авторизацію
    navigate('/login');
  };

  return (
    <div style={{ background: white, minHeight: '100vh', position: 'relative' }}>
      {/* Header */}
      <header style={{
        background: gold,
        color: white,
        padding: '14px 0',
        marginBottom: 0, // прибрано відступ під хедером
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
        {/* Логотип-іконка та напис ближче один до одного */}
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
          <span style={{
            fontSize: 32,
            marginLeft: 18,
            marginRight: 8,
            userSelect: 'none'
          }}>⛪</span>
          <h1 style={{
            margin: 0,
            fontSize: '1.1rem',
            letterSpacing: '2px',
            color: white,
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            Your Online Church
          </h1>
        </div>
        <nav style={{ marginRight: 32, display: 'flex', gap: 24, alignItems: 'center', zIndex: 1 }}>
          <button
            onClick={() => scrollToSection('shop-section')}
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
            onClick={() => navigate('/holidays')}
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
            <span role="img" aria-label="calendar" style={{ marginRight: 6, background: 'none', transition: 'color 0.2s' }}>📅</span>
            Holiday Calendar
          </button>
          <button
            onClick={() => scrollToSection('services-section')}
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
              alignItems: 'center',
              position: 'relative',
              zIndex: 2
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
          zIndex: 0 // змінено з 1 на 0, щоб не перекривати кнопки
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
      {/* Додаємо відступ після хвильки */}
      <div style={{ height: 24 }} />

      {/* News & Events Slider */}
      <section id="slider-section" style={{
        width: '100vw', maxWidth: '100%', margin: '0 auto 40px auto', textAlign: 'center',
        opacity: sliderVisible ? 1 : 0,
        transform: sliderVisible ? 'translateY(0)' : 'translateY(40px)',
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
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          <h2 style={{
            color: gold,
            margin: 0,
            marginBottom: 24,
            fontSize: '2rem',
            letterSpacing: '1px'
          }}>
            Church News & Events
          </h2>
          <img
            src={newsEvents[currentSlide].image}
            alt={newsEvents[currentSlide].title}
            style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: '8px', border: `1px solid ${gold}` }}
          />
          <h3 style={{ margin: '16px 0 8px 0', color: gold }}>{newsEvents[currentSlide].title}</h3>
          <p style={{ color: '#444' }}>{newsEvents[currentSlide].description}</p>
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              color: gold,
              border: 'none',
              borderRadius: '50%',
              width: 54,
              height: 54,
              fontSize: 44,
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s, background 0.2s',
              padding: 0,
              lineHeight: 1
            }}
            onMouseOver={e => {
              e.target.style.color = hoverPurple;
              e.target.style.background = 'none';
            }}
            onMouseOut={e => {
              e.target.style.color = gold;
              e.target.style.background = 'none';
            }}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              fontWeight: 900,
              fontSize: 44,
              lineHeight: 1
            }}>
              {/* Більш жирна стрілка вліво */}
              <svg width="38" height="38" viewBox="0 0 38 38" style={{ display: 'block' }}>
                <polyline
                  points="25,8 13,19 25,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              color: gold,
              border: 'none',
              borderRadius: '50%',
              width: 54,
              height: 54,
              fontSize: 44,
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s, background 0.2s',
              padding: 0,
              lineHeight: 1
            }}
            onMouseOver={e => {
              e.target.style.color = hoverPurple;
              e.target.style.background = 'none';
            }}
            onMouseOut={e => {
              e.target.style.color = gold;
              e.target.style.background = 'none';
            }}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              fontWeight: 900,
              fontSize: 44,
              lineHeight: 1
            }}>
              {/* Більш жирна стрілка вправо */}
              <svg width="38" height="38" viewBox="0 0 38 38" style={{ display: 'block' }}>
                <polyline
                  points="13,8 25,19 13,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
        <div style={{ marginTop: 8 }}>
          {newsEvents.map((_, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: idx === currentSlide ? hoverPurple : '#bbb',
                margin: '0 4px'
              }}
            />
          ))}
        </div>
      </section>

      {/* Church Description */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto 48px auto',
        display: 'flex',
        gap: 24,
        justifyContent: 'center',
        flexWrap: 'wrap',
        opacity: descVisible ? 1 : 0,
        transform: descVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s, transform 0.7s'
      }}>
        {churchDescription.map((desc, idx) => (
          <div
            key={idx}
            style={{
              background: white,
              border: `1.5px solid ${gold}`,
              borderRadius: 12,
              boxShadow: `0 2px 8px rgba(218,165,32,0.08)`,
              padding: 24,
              flex: '1 1 250px',
              minWidth: 250,
              maxWidth: 300,
              textAlign: 'center',
              transition: 'box-shadow 0.3s, transform 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={e => {
              e.currentTarget.style.boxShadow = `0 8px 24px ${hoverPurple}22`;
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.boxShadow = `0 2px 8px rgba(218,165,32,0.08)`;
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>{desc.icon}</div>
            <h4 style={{ color: gold, marginBottom: 8 }}>{desc.title}</h4>
            <p style={{ color: '#444', fontSize: '1rem' }}>{desc.text}</p>
          </div>
        ))}
      </section>

      {/* Banner Join Us */}
      <section style={{
        background: `${hoverPurple}11`,
        border: `1.5px solid ${hoverPurple}`,
        borderRadius: 16,
        maxWidth: 700,
        margin: '0 auto 48px auto',
        padding: '32px 24px',
        textAlign: 'center',
        boxShadow: `0 2px 12px ${hoverPurple}11`
      }}>
        <h3 style={{ color: hoverPurple, fontSize: '1.5rem', marginBottom: 12 }}>Become Part of Our Family!</h3>
        <p style={{ color: '#444', fontSize: '1.08rem', marginBottom: 18 }}>
          We invite you to join our vibrant community, participate in events, and grow in faith together.
        </p>
        <button
          style={{
            background: gold,
            color: white,
            border: 'none',
            borderRadius: 8,
            padding: '10px 32px',
            fontWeight: 'bold',
            fontSize: '1.08rem',
            cursor: 'pointer',
            boxShadow: `0 2px 8px ${gold}33`,
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = hoverPurple}
          onMouseOut={e => e.currentTarget.style.background = gold}
          onClick={() => scrollToSection('contacts-section')}
        >
          Join Us
        </button>
      </section>

      {/* Reviews */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto 48px auto',
        padding: '0 12px'
      }}>
        <h3 style={{ color: gold, marginBottom: 18, textAlign: 'center', fontSize: '1.4rem' }}>What Our Members Say</h3>
        <div style={{
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {reviews.map((review, idx) => (
            <div key={idx} style={{
              background: white,
              border: `1.5px solid ${hoverPurple}`,
              borderRadius: 12,
              boxShadow: `0 2px 8px ${hoverPurple}11`,
              padding: 20,
              flex: '1 1 220px',
              minWidth: 220,
              maxWidth: 300,
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              <p style={{ color: '#444', marginBottom: 10 }}>"{review.text}"</p>
              <div style={{ color: hoverPurple, fontWeight: 700 }}>{review.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Working Hours */}
      <footer style={{
        background: white,
        color: '#222', // чорний колір тексту
        textAlign: 'center',
        padding: '32px 0 24px 0',
        marginTop: 40
      }}>
        <h2 style={{
          color: gold,
          marginBottom: 18,
          fontSize: '1.7rem',
          letterSpacing: '1.2px',
          fontWeight: 700
        }}>
          Church Working Hours
        </h2>
        <div style={{
          display: 'inline-block',
          background: '#fff',
          border: `1.5px solid ${gold}`,
          borderRadius: 12,
          boxShadow: `0 2px 8px rgba(218,165,32,0.08)`,
          padding: '24px 36px 18px 36px',
          marginBottom: 10,
          minWidth: 260
        }}>
          <table style={{
            margin: '0 auto 12px auto',
            fontSize: '1.08rem',
            borderCollapse: 'separate',
            borderSpacing: '0 6px',
            fontFamily: 'inherit',
            background: 'white'
          }}>
            <tbody>
              {workingHours.map(({ day, hours }) => (
                <tr key={day}>
                  <td style={{
                    padding: '4px 24px 4px 0',
                    fontWeight: 'bold',
                    color: gold,
                    textAlign: 'right',
                    fontSize: '1em',
                    letterSpacing: '0.5px',
                    borderBottom: 'none'
                  }}>{day}</td>
                  <td style={{
                    padding: '4px 0 4px 24px',
                    color: '#222', // чорний колір тексту
                    background: '#fff',
                    borderRadius: 8,
                    minWidth: 110,
                    fontWeight: 'normal',
                    border: 'none',
                    boxShadow: 'none',
                    fontSize: '1em',
                    letterSpacing: '0.3px'
                  }}>{hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{
            marginTop: 10,
            marginBottom: 0,
            color: '#888',
            fontSize: '1.05rem',
            background: '#f8f6ff',
            display: 'inline-block',
            padding: '7px 18px',
            borderRadius: 8,
            boxShadow: `0 1px 4px ${hoverPurple}09`
          }}>
            <span role="img" aria-label="church">⛪</span> We welcome you to visit us during our working hours!
          </p>
        </div>
      </footer>

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

export default Home;

