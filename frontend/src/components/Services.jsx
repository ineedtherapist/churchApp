import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import WishBox from './WishBox.jsx';
import {
  gold,
  darkGold,
  white,
  hoverPurple
} from '../styles/sharedStyles';

const availableBenches = [
  'Bench 1', 'Bench 2', 'Bench 3', 'Bench 4', 'Bench 5', 'Bench 6', 'Bench 7', 'Bench 8'
];

function BenchReservationModal({ onPaid, onClose }) {
  const [selectedBench, setSelectedBench] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleReserve = () => {
    if (!name.trim() || !date || !selectedBench) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };

  return (
    <>
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Name for reservation</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Available benches</label>
      <select
        value={selectedBench}
        onChange={e => setSelectedBench(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 16
        }}
      >
        <option value="">Select a bench</option>
        {availableBenches.map(b => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      {error && <div style={{ color: '#ef233c', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
      <button
        style={{
          background: gold, color: white, border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'
        }}
        onClick={handleReserve}
      >
        Reserve (200 UAH)
      </button>
    </>
  );
}

function LightCandleModal({ onPaid }) {
  const [name, setName] = useState('');
  const [intention, setIntention] = useState('For health');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!name.trim()) {
      setError('Please enter a name.');
      return;
    }
    setError('');
    onPaid();
  };

  return (
    <>
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Name</label>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Intention</label>
      <select
        value={intention}
        onChange={e => setIntention(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 16
        }}
      >
        <option>For health</option>
        <option>For repose</option>
      </select>
      {error && <div style={{ color: '#ef233c', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
      <button
        style={{
          background: gold, color: white, border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'
        }}
        onClick={handlePay}
      >
        Pay (50 UAH)
      </button>
    </>
  );
}

function PrayerListModal({ onPaid }) {
  const [names, setNames] = useState('');
  const [intention, setIntention] = useState('For health');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!names.trim()) {
      setError('Please enter at least one name.');
      return;
    }
    setError('');
    onPaid();
  };

  return (
    <>
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Names (comma separated)</label>
      <textarea
        placeholder="Enter names"
        rows={3}
        value={names}
        onChange={e => setNames(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Intention</label>
      <select
        value={intention}
        onChange={e => setIntention(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 16
        }}
      >
        <option>For health</option>
        <option>For repose</option>
      </select>
      {error && <div style={{ color: '#ef233c', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
      <button
        style={{
          background: gold, color: white, border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'
        }}
        onClick={handlePay}
      >
        Pay (100 UAH)
      </button>
    </>
  );
}

function BaptismReservationModal({ onPaid }) {
  const [childName, setChildName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleReserve = () => {
    if (!childName.trim() || !date) {
      setError('Please enter child\'s name and date.');
      return;
    }
    setError('');
    onPaid();
  };

  return (
    <>
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Child’s Name</label>
      <input
        type="text"
        placeholder="Enter child’s name"
        value={childName}
        onChange={e => setChildName(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Preferred Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 16
        }}
      />
      {error && <div style={{ color: '#ef233c', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
      <button
        style={{
          background: gold, color: white, border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'
        }}
        onClick={handleReserve}
      >
        Reserve (500 UAH)
      </button>
    </>
  );
}

function HomeBlessingModal({ onPaid }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const handlePay = () => {
    if (!name.trim() || !address.trim() || !date) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };
  return (
    <>
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Your Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Address</label>
      <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Preferred Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 16
        }}
      />
      {error && <div style={{ color: '#ef233c', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
      <button
        style={{
          background: gold, color: white, border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'
        }}
        onClick={handlePay}
      >
        Pay (400 UAH)
      </button>
    </>
  );
}

function ConfessionModal({ onPaid }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const handlePay = () => {
    if (!name.trim() || !date) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };
  return (
    <>
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Your Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Preferred Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 16
        }}
      />
      {error && <div style={{ color: '#ef233c', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
      <button
        style={{
          background: gold, color: white, border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'
        }}
        onClick={handlePay}
      >
        Pay (150 UAH)
      </button>
    </>
  );
}

function MemorialServiceModal({ onPaid }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const handlePay = () => {
    if (!name.trim() || !date) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };
  return (
    <>
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Name for Memorial</label>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Preferred Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 16
        }}
      />
      {error && <div style={{ color: '#ef233c', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
      <button
        style={{
          background: gold, color: white, border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'
        }}
        onClick={handlePay}
      >
        Pay (300 UAH)
      </button>
    </>
  );
}

function WeddingReservationModal({ onPaid }) {
  const [names, setNames] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const handlePay = () => {
    if (!names.trim() || !date) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };
  return (
    <>
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Names of Couple</label>
      <input
        type="text"
        placeholder="Enter names"
        value={names}
        onChange={e => setNames(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Preferred Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 16
        }}
      />
      {error && <div style={{ color: '#ef233c', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
      <button
        style={{
          background: gold, color: white, border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'
        }}
        onClick={handlePay}
      >
        Pay (700 UAH)
      </button>
    </>
  );
}

function SpiritualCounselingModal({ onPaid }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const handlePay = () => {
    if (!name.trim() || !date) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };
  return (
    <>
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Your Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 12
        }}
      />
      <label style={{ display: 'block', marginBottom: 8, color: darkGold }}>Preferred Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{
          width: '100%', padding: 8, borderRadius: 6, border: `1px solid ${gold}`, marginBottom: 16
        }}
      />
      {error && <div style={{ color: '#ef233c', marginBottom: 10, fontWeight: 500 }}>{error}</div>}
      <button
        style={{
          background: gold, color: white, border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'
        }}
        onClick={handlePay}
      >
        Pay (250 UAH)
      </button>
    </>
  );
}

const services = [
  {
    title: 'Light a Candle',
    price: 50,
    description: 'Light a candle for health or repose. Please enter the name and intention.',
    modalComponent: LightCandleModal
  },
  {
    title: 'Prayer List',
    price: 100,
    description: 'Submit a list of names for prayer for health or repose.',
    modalComponent: PrayerListModal
  },
  {
    title: 'Baptism Reservation',
    price: 500,
    description: 'Reserve a date for your child’s baptism.',
    modalComponent: BaptismReservationModal
  },
  {
    title: 'Bench Reservation',
    price: 200,
    description: 'Reserve a bench for the upcoming holidays.',
    modalComponent: BenchReservationModal
  },
  {
    title: 'Request Home Blessing',
    price: 400,
    description: 'Request a priest to bless your home on a chosen date.',
    modalComponent: HomeBlessingModal
  },
  {
    title: 'Confession Appointment',
    price: 150,
    description: 'Book a confession appointment with a priest.',
    modalComponent: ConfessionModal
  },
  {
    title: 'Order Memorial Service',
    price: 300,
    description: 'Order a memorial service for a loved one.',
    modalComponent: MemorialServiceModal
  },
  {
    title: 'Wedding Reservation',
    price: 700,
    description: 'Reserve a date for your wedding ceremony.',
    modalComponent: WeddingReservationModal
  },
  {
    title: 'Request Spiritual Counseling',
    price: 250,
    description: 'Book a spiritual counseling session with a priest.',
    modalComponent: SpiritualCounselingModal
  }
];

// --- Icons for services ---
const serviceIcons = [
  "🕯️", // Light a Candle
  "📜", // Prayer List
  "👶", // Baptism Reservation
  "🪑", // Bench Reservation
  "🏠", // Home Blessing
  "🙏", // Confession
  "🕊️", // Memorial Service
  "💍",  // Wedding Reservation
  "💬"   // Spiritual Counseling
];

const Services = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const [showPaid, setShowPaid] = useState(false);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (showPaid) {
      setCountdown(2);
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showPaid]);

  const handlePaid = () => {
    setShowPaid(true);
    setTimeout(() => {
      setShowPaid(false);
      setOpenIdx(null);
    }, 2000);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8f8ff 0%, #fffbe6 100%)',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <Header />
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

      <section style={{
        maxWidth: 1200, // збільшено ширину секції
        margin: '0 auto 48px auto',
        padding: '0 32px 48px 32px', // збільшено падінги
        textAlign: 'center',
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 18,
        boxShadow: `0 2px 24px ${hoverPurple}10`,
        position: 'relative'
      }}>
        <h2 style={{
          color: gold,
          marginBottom: 8,
          fontSize: '2.2rem',
          letterSpacing: '1px',
          fontWeight: 800
        }}>
          Church Services
        </h2>
        <div style={{
          width: 80,
          height: 4,
          background: hoverPurple,
          borderRadius: 2,
          margin: '0 auto 18px auto',
          opacity: 0.18
        }} />
        <div style={{
          color: darkGold,
          fontWeight: 500,
          fontSize: '1.08rem',
          marginBottom: 32,
          letterSpacing: '.5px'
        }}>
          Choose a service to support your spiritual needs
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 36,
            justifyItems: 'center',
            alignItems: 'stretch',
            minHeight: 340
          }}
        >
          {services.map((s, idx) => (
            <div
              key={s.title}
              style={{
                background: white,
                border: `2px solid ${gold}`,
                borderRadius: 18,
                boxShadow: `0 4px 24px ${hoverPurple}11`,
                padding: '38px 28px 28px 28px',
                width: 270,
                minHeight: 220,
                cursor: 'pointer',
                transition: 'box-shadow 0.25s, border 0.25s, transform 0.18s',
                textAlign: 'left',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                opacity: 1,
                animation: 'fadeInUp 0.7s cubic-bezier(.23,1.02,.47,.98)',
                animationDelay: `${idx * 0.08}s`,
                animationFillMode: 'backwards'
              }}
              onClick={() => setOpenIdx(idx)}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = `0 8px 32px ${hoverPurple}33`;
                e.currentTarget.style.border = `2.5px solid ${hoverPurple}`;
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.035)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = `0 4px 24px ${hoverPurple}11`;
                e.currentTarget.style.border = `2px solid ${gold}`;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{
                fontSize: 38,
                marginBottom: 10,
                marginLeft: -2,
                filter: 'drop-shadow(0 2px 6px #9d4edd22)'
              }}>
                {serviceIcons[idx]}
              </div>
              <div style={{ fontWeight: 700, color: gold, fontSize: '1.18rem', marginBottom: 8 }}>
                {s.title}
              </div>
              <div style={{ color: '#444', fontSize: '1.05rem', marginBottom: 14, minHeight: 48 }}>
                {s.description}
              </div>
              <div style={{
                position: 'absolute',
                bottom: 18,
                right: 18,
                color: hoverPurple,
                fontWeight: 700,
                fontSize: '1.08rem'
              }}>
                {s.price} UAH
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {openIdx !== null && (
        <div style={{
          ...modalStyle,
          backdropFilter: 'blur(2.5px)'
        }} onClick={() => setOpenIdx(null)}>
          <div
            style={{
              ...modalContentStyle,
              boxShadow: `0 8px 40px ${hoverPurple}33, 0 1.5px 8px #0001`,
              animation: 'modalPop 0.33s cubic-bezier(.23,1.02,.47,.98)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontWeight: 700, color: gold, fontSize: '1.18rem', marginBottom: 12 }}>
              {serviceIcons[openIdx]} {services[openIdx].title}
            </div>
            <div style={{ marginBottom: 18, color: '#444' }}>
              {services[openIdx].description}
            </div>
            {React.createElement(services[openIdx].modalComponent, { onPaid: handlePaid })}
            <button
              onClick={() => setOpenIdx(null)}
              style={{
                position: 'absolute',
                top: 10,
                right: 14,
                background: 'none',
                border: 'none',
                color: hoverPurple,
                fontSize: 22,
                cursor: 'pointer',
                fontWeight: 700
              }}
              aria-label="Close"
              title="Close"
            >×</button>
          </div>
        </div>
      )}

      {/* Paid Modal */}
      {showPaid && (
        <div style={{
          ...modalStyle,
          backdropFilter: 'blur(2.5px)'
        }}>
          <div style={{
            ...modalContentStyle,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 220,
            maxWidth: 260,
            padding: '36px 24px',
            animation: 'modalPop 0.33s cubic-bezier(.23,1.02,.47,.98)'
          }}>
            <span style={{ fontSize: 38, color: gold, marginBottom: 12 }}>✔️</span>
            <div style={{ color: gold, fontWeight: 700, fontSize: '1.18rem', marginBottom: 6 }}>
              Service paid
            </div>
            <div style={{ color: hoverPurple, fontWeight: 500, fontSize: '1rem' }}>
              Closing in {countdown} second{countdown !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}

      <WishBox />

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
      {/* Keyframes for fadeInUp and modalPop animation */}
      <style>
        {`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes modalPop {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(24px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        `}
      </style>
    </div>
  );
};

// --- Modal styles ---
const modalStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.18)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
const modalContentStyle = {
  background: white,
  borderRadius: 14,
  boxShadow: `0 4px 32px ${hoverPurple}22`,
  padding: '32px 24px 24px 24px',
  minWidth: 260,
  maxWidth: 340,
  minHeight: 120,
  position: 'relative'
};

export default Services;

