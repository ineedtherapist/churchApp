// filepath: c:\Users\Lenovo\Desktop\test\churchApp\frontend\src\components\Services.jsx
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header.jsx';
import WishBox from './WishBox.jsx';
import {
  gold,
  darkGold,
  white,
  hoverPurple
} from '../styles/sharedStyles';

// Service category colors
const categoryColors = {
  prayer: '#3a86ff', // blue for prayer services
  sacrament: '#8a4fff', // purple for sacraments
  ceremony: '#ff8a4f', // orange for ceremonies
  counseling: '#4fff8a', // green for counseling
  reservation: '#ff4f8a' // pink for reservations
};

// Base component for modal window
const Modal = ({ isOpen, onClose, title, icon, children, accentColor = gold }) => {
  if (!isOpen) return null;

  const modalRef = useRef(null);

  useEffect(() => {
    // Prevents background content from scrolling
    document.body.style.overflow = 'hidden';

    // Fade-in animation
    if (modalRef.current) {
      modalRef.current.style.opacity = '0';
      setTimeout(() => {
        if (modalRef.current) modalRef.current.style.opacity = '1';
      }, 10);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease',
      }}
      onClick={onClose}
      ref={modalRef}
    >
      <div
        style={{
          backgroundColor: white,
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          width: '450px',
          maxWidth: '90%',
          maxHeight: '85vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          border: `1px solid ${accentColor}20`,
          opacity: 1,
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          style={{
            borderBottom: `1px solid ${accentColor}30`,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: accentColor + '10',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: '600',
              color: typeof accentColor === 'string' ? accentColor : darkGold,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {icon && <span style={{ fontSize: '24px' }}>{icon}</span>}
            {title}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: typeof accentColor === 'string' ? accentColor : darkGold,
              fontSize: '24px',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = accentColor + '20';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Close"
            title="Close"
          >
            &times;
          </button>
        </div>

        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            maxHeight: 'calc(85vh - 140px)'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Success notification component
const SuccessModal = ({ isOpen, message, subMessage, icon = "✅", countdown }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: white,
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          padding: '32px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          border: `2px solid ${gold}40`,
          animation: 'successPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
        <h3 style={{ fontSize: '22px', color: darkGold, marginBottom: '8px' }}>{message}</h3>
        <p style={{ color: '#666', marginBottom: '12px' }}>{subMessage}</p>
        {countdown !== undefined && (
          <div style={{ color: hoverPurple, fontWeight: '500', marginTop: '12px' }}>
            Closing in {countdown} second{countdown !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

// Component field form for simplifying forms
const FormField = ({ label, type = 'text', value, onChange, placeholder, options, error }) => {
  const [focused, setFocused] = useState(false);

  const fieldProps = {
    value,
    onChange,
    placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      padding: '12px 16px',
      borderRadius: '10px',
      border: `1px solid ${focused ? darkGold : gold + '40'}`,
      fontSize: '16px',
      transition: 'all 0.2s ease',
      outline: 'none',
      backgroundColor: white,
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: focused ? `0 0 0 2px ${gold}30` : 'none'
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '16px',
          fontWeight: '500',
          color: darkGold
        }}
      >
        {label}
      </label>

      {type === 'select' ? (
        <select
          {...fieldProps}
          style={{
            ...fieldProps.style,
            appearance: 'none',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${encodeURIComponent(darkGold)}"><path d="M7 10l5 5 5-5z"/></svg>')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center'
          }}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          {...fieldProps}
          style={{
            ...fieldProps.style,
            resize: 'vertical',
            minHeight: '80px'
          }}
          rows={4}
        />
      ) : (
        <input type={type} {...fieldProps} />
      )}

      {error && (
        <div
          style={{
            color: '#e63946',
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: 'rgba(230, 57, 70, 0.08)',
            padding: '6px 12px',
            borderRadius: '6px',
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>⚠️</span> {error}
        </div>
      )}
    </div>
  );
}

// Shared styles for modal windows
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    backgroundColor: white,
    borderRadius: '20px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
    width: '450px',
    maxWidth: '90%',
    maxHeight: '85vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: `1px solid ${gold}20`
  },
  header: {
    borderBottom: `1px solid ${gold}30`,
    padding: '18px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: gold + '10',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: darkGold,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: darkGold,
    fontSize: '22px',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: gold + '20'
    }
  },
  body: {
    padding: '24px',
    overflowY: 'auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: darkGold
  },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: `1px solid ${gold}40`,
    fontSize: '16px',
    transition: 'all 0.2s ease',
    outline: 'none',
    backgroundColor: white,
    width: '100%',
    boxSizing: 'border-box',
    '&:focus': {
      border: `1px solid ${darkGold}`,
      boxShadow: `0 0 0 2px ${gold}30`
    }
  },
  select: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: `1px solid ${gold}40`,
    fontSize: '16px',
    transition: 'all 0.2s ease',
    outline: 'none',
    backgroundColor: white,
    appearance: 'none',
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${encodeURIComponent(darkGold)}"><path d="M7 10l5 5 5-5H7z"/></svg>')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    width: '100%',
    boxSizing: 'border-box',
    '&:focus': {
      border: `1px solid ${darkGold}`,
      boxShadow: `0 0 0 2px ${gold}30`
    }
  },
  textarea: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: `1px solid ${gold}40`,
    fontSize: '16px',
    transition: 'all 0.2s ease',
    outline: 'none',
    resize: 'vertical',
    minHeight: '80px',
    width: '100%',
    boxSizing: 'border-box',
    '&:focus': {
      border: `1px solid ${darkGold}`,
      boxShadow: `0 0 0 2px ${gold}30`
    }
  },
  error: {
    color: '#e63946',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: 'rgba(230, 57, 70, 0.08)',
    padding: '6px 12px',
    borderRadius: '6px',
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  footer: {
    borderTop: `1px solid ${gold}30`,
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: gold + '05'
  },
  button: {
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }
};

// Applying styles to each input
const getInputStyle = (focused) => ({
  ...modalStyles.input,
  borderColor: focused ? darkGold : gold,
  boxShadow: focused ? '0 2px 8px rgba(201, 164, 58, 0.15)' : '0 2px 4px rgba(0,0,0,0.05)'
});

const availableBenches = [
  'Bench 1', 'Bench 2', 'Bench 3', 'Bench 4', 'Bench 5', 'Bench 6', 'Bench 7', 'Bench 8'
];

function BenchReservationModal({ onPaid, onClose }) {
  const [selectedBench, setSelectedBench] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleReserve = () => {
    if (!name.trim() || !date || !selectedBench || !time) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <label style={{ ...modalStyles.label }}>Name for reservation</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={modalStyles.input}
        />
        <label style={{ ...modalStyles.label }}>Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={modalStyles.input}
        />
        <label style={{ ...modalStyles.label }}>Time</label>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          style={modalStyles.input}
        />
        <label style={{ ...modalStyles.label }}>Available benches</label>
        <select
          value={selectedBench}
          onChange={e => setSelectedBench(e.target.value)}
          style={{
            ...modalStyles.input,
            padding: '10px 12px',
            appearance: 'none',
            background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(gold)}"><path d="M7 10l5 5 5-5H7z"/></svg>') no-repeat right 10px center`
          }}
        >
          <option value="">Select a bench</option>
          {availableBenches.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        {error && <div style={modalStyles.error}>{error}</div>}
        <button
          style={modalStyles.button}
          onClick={handleReserve}
        >
          Reserve (200 UAH)
        </button>
      </div>
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
      <div style={modalStyles.formContainer}>
        <label style={modalStyles.label}>Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Intention</label>
        <select
          value={intention}
          onChange={e => setIntention(e.target.value)}
          style={{
            ...modalStyles.input,
            padding: '10px 12px',
            appearance: 'none',
            background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(gold)}"><path d="M7 10l5 5 5-5H7z"/></svg>') no-repeat right 10px center`
          }}
        >
          <option>For health</option>
          <option>For repose</option>
        </select>
        {error && <div style={modalStyles.error}>{error}</div>}
        <button
          style={modalStyles.button}
          onClick={handlePay}
        >
          Pay (50 UAH)
        </button>
      </div>
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
      <div style={modalStyles.formContainer}>
        <label style={modalStyles.label}>Names (comma separated)</label>
        <textarea
          placeholder="Enter names"
          rows={3}
          value={names}
          onChange={e => setNames(e.target.value)}
          style={{
            ...modalStyles.input,
            resize: 'vertical',
            height: 'auto',
            minHeight: '60px'
          }}
        />
        <label style={modalStyles.label}>Intention</label>
        <select
          value={intention}
          onChange={e => setIntention(e.target.value)}
          style={{
            ...modalStyles.input,
            padding: '10px 12px',
            appearance: 'none',
            background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(gold)}"><path d="M7 10l5 5 5-5H7z"/></svg>') no-repeat right 10px center`
          }}
        >
          <option>For health</option>
          <option>For repose</option>
        </select>
        {error && <div style={modalStyles.error}>{error}</div>}
        <button
          style={modalStyles.button}
          onClick={handlePay}
        >
          Pay (100 UAH)
        </button>
      </div>
    </>
  );
}

function BaptismReservationModal({ onPaid }) {
  const [childName, setChildName] = useState('');
  const [parentName, setParentName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleReserve = () => {
    if (!childName.trim() || !parentName.trim() || !date || !time) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      <div style={modalStyles.formContainer}>
        <label style={modalStyles.label}>Child's Name</label>
        <input
          type="text"
          placeholder="Enter child's name"
          value={childName}
          onChange={e => setChildName(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Parent's Name</label>
        <input
          type="text"
          placeholder="Enter parent's name"
          value={parentName}
          onChange={e => setParentName(e.target.value)}
          style={modalStyles.input}
        />
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={modalStyles.label}>Preferred Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={modalStyles.input}
              min={minDate}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={modalStyles.label}>Preferred Time</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              style={modalStyles.input}
            />
          </div>
        </div>
        {error && <div style={modalStyles.error}>{error}</div>}
        <button
          style={modalStyles.button}
          onClick={handleReserve}
        >
          Reserve (500 UAH)
        </button>
      </div>
    </>
  );
}

function HomeBlessingModal({ onPaid }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!name.trim() || !address.trim() || !date || !time) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };

  return (
    <>
      <div style={modalStyles.formContainer}>
        <label style={modalStyles.label}>Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Address</label>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Preferred Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Preferred Time</label>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          style={modalStyles.input}
        />
        {error && <div style={modalStyles.error}>{error}</div>}
        <button
          style={modalStyles.button}
          onClick={handlePay}
        >
          Pay (400 UAH)
        </button>
      </div>
    </>
  );
}

function ConfessionModal({ onPaid }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!name.trim() || !date || !time) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };

  return (
    <>
      <div style={modalStyles.formContainer}>
        <label style={modalStyles.label}>Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Preferred Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Preferred Time</label>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          style={modalStyles.input}
        />
        {error && <div style={modalStyles.error}>{error}</div>}
        <button
          style={modalStyles.button}
          onClick={handlePay}
        >
          Pay (150 UAH)
        </button>
      </div>
    </>
  );
}

function MemorialServiceModal({ onPaid }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!name.trim() || !date || !time) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };

  return (
    <>
      <div style={modalStyles.formContainer}>
        <label style={modalStyles.label}>Name for Memorial</label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Preferred Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Preferred Time</label>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          style={modalStyles.input}
        />
        {error && <div style={modalStyles.error}>{error}</div>}
        <button
          style={modalStyles.button}
          onClick={handlePay}
        >
          Pay (300 UAH)
        </button>
      </div>
    </>
  );
}

function WeddingReservationModal({ onPaid }) {
  const [names, setNames] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!names.trim() || !date || !time) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };

  return (
    <>
      <div style={modalStyles.formContainer}>
        <label style={modalStyles.label}>Names of Couple</label>
        <input
          type="text"
          placeholder="Enter names"
          value={names}
          onChange={e => setNames(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Preferred Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Preferred Time</label>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          style={modalStyles.input}
        />
        {error && <div style={modalStyles.error}>{error}</div>}
        <button
          style={modalStyles.button}
          onClick={handlePay}
        >
          Pay (700 UAH)
        </button>
      </div>
    </>
  );
}

function SpiritualCounselingModal({ onPaid }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!name.trim() || !date || !time) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };

  return (
    <>
      <div style={modalStyles.formContainer}>
        <label style={modalStyles.label}>Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Preferred Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={modalStyles.input}
        />
        <label style={modalStyles.label}>Preferred Time</label>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          style={modalStyles.input}
        />
        {error && <div style={modalStyles.error}>{error}</div>}
        <button
          style={modalStyles.button}
          onClick={handlePay}
        >
          Pay (250 UAH)
        </button>
      </div>
    </>
  );
}

// --- New modal component implementations ---

// Modal window "Light a Candle"
const NewLightCandleModal = ({ onClose, onPaid }) => {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <FormField
        label="Name"
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={e => setName(e.target.value)}
        error={error}
      />

      <FormField
        label="Intention"
        type="select"
        value={intention}
        onChange={e => setIntention(e.target.value)}
        options={['For health', 'For repose']}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '22px' }}>💰</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: hoverPurple }}>50 UAH</span>
        </div>

        <button
          onClick={handlePay}
          style={{
            backgroundColor: gold,
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = darkGold;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = gold;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
        >
          <span>Pay</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

// Prayer List Modal
const NewPrayerListModal = ({ onClose, onPaid }) => {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <FormField
        label="Names (comma separated)"
        type="textarea"
        placeholder="Enter names"
        value={names}
        onChange={e => setNames(e.target.value)}
        error={error}
      />

      <FormField
        label="Intention"
        type="select"
        value={intention}
        onChange={e => setIntention(e.target.value)}
        options={['For health', 'For repose']}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '22px' }}>💰</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: hoverPurple }}>100 UAH</span>
        </div>

        <button
          onClick={handlePay}
          style={{
            backgroundColor: gold,
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = darkGold;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = gold;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
        >
          <span>Pay</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

// Baptism Reservation Modal
const NewBaptismReservationModal = ({ onClose, onPaid }) => {
  const [childName, setChildName] = useState('');
  const [parentName, setParentName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const handleReserve = () => {
    if (!childName.trim() || !parentName.trim() || !date || !time) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onPaid();
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <FormField
        label="Child's Name"
        type="text"
        placeholder="Enter child's name"
        value={childName}
        onChange={e => setChildName(e.target.value)}
        error={error && !childName.trim() ? 'This field is required' : ''}
      />

      <FormField
        label="Parent's Name"
        type="text"
        placeholder="Enter parent's name"
        value={parentName}
        onChange={e => setParentName(e.target.value)}
        error={error && !parentName.trim() ? 'This field is required' : ''}
      />

      <div style={{ display: 'flex', gap: '15px' }}>
        <FormField
          label="Preferred Date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          min={minDate}
          error={error && !date ? 'Select a date' : ''}
        />
        <FormField
          label="Preferred Time"
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          error={error && !time ? 'Select a time' : ''}
        />
      </div>

      {error && <div style={{ color: '#e63946', fontSize: '14px', fontWeight: '500', backgroundColor: 'rgba(230, 57, 70, 0.08)', padding: '10px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>⚠️</span> {error}
      </div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '22px' }}>💰</span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: categoryColors.sacrament }}>500 UAH</span>
        </div>

        <button
          onClick={handleReserve}
          style={{
            backgroundColor: categoryColors.sacrament,
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
        >
          <span>Reserve</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

// Updated service data with categories and colors
const serviceData = [
  {
    id: 'light-candle',
    title: 'Light a Candle',
    price: 50,
    description: 'Light a candle for health or repose. Please enter a name and intention.',
    icon: "🕯️",
    category: 'prayer',
    color: categoryColors.prayer,
    modalComponent: NewLightCandleModal
  },
  {
    id: 'prayer-list',
    title: 'Prayer List',
    price: 100,
    description: 'Add a list of names for prayer for health or repose.',
    icon: "📜",
    category: 'prayer',
    color: categoryColors.prayer,
    modalComponent: NewPrayerListModal
  },
  {
    id: 'baptism',
    title: 'Baptism Reservation',
    price: 500,
    description: 'Reserve a date for the baptism of your child.',
    icon: "👶",
    category: 'sacrament',
    color: categoryColors.sacrament,
    modalComponent: NewBaptismReservationModal
  },
  {
    id: 'bench',
    title: 'Bench Reservation',
    price: 200,
    description: 'Reserve a bench for upcoming holidays.',
    icon: "🪑",
    category: 'reservation',
    color: categoryColors.reservation,
    modalComponent: BenchReservationModal
  },
  {
    id: 'home-blessing',
    title: 'House Blessing',
    price: 400,
    description: 'Invite a priest to bless your home.',
    icon: "🏠",
    category: 'ceremony',
    color: categoryColors.ceremony,
    modalComponent: HomeBlessingModal
  },
  {
    id: 'confession',
    title: 'Confession Appointment',
    price: 150,
    description: 'Schedule a confession with a priest.',
    icon: "🙏",
    category: 'sacrament',
    color: categoryColors.sacrament,
    modalComponent: ConfessionModal
  },
  {
    id: 'memorial',
    title: 'Memorial Service',
    price: 300,
    description: 'Order a memorial service for your loved ones.',
    icon: "🕊️",
    category: 'ceremony',
    color: categoryColors.ceremony,
    modalComponent: MemorialServiceModal
  },
  {
    id: 'wedding',
    title: 'Wedding Reservation',
    price: 700,
    description: 'Reserve a date for your wedding ceremony.',
    icon: "💍",
    category: 'sacrament',
    color: categoryColors.sacrament,
    modalComponent: WeddingReservationModal
  },
  {
    id: 'counseling',
    title: 'Spiritual Counseling',
    price: 250,
    description: 'Schedule spiritual counseling with a priest.',
    icon: "💬",
    category: 'counseling',
    color: categoryColors.counseling,
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
  const [selectedService, setSelectedService] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (showSuccessModal) {
      setCountdown(2);
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setTimeout(() => {
              setShowSuccessModal(false);
              setSelectedService(null);
            }, 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showSuccessModal]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handlePaid = () => {
    setShowSuccessModal(true);
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
        maxWidth: 1200,
        margin: '0 auto 48px auto',
        padding: '0 32px 48px 32px',
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
          Choose a service for your spiritual needs
        </div>

        {/* Category filter for future use */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {Object.entries(categoryColors).map(([category, color]) => (
            <div
              key={category}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                backgroundColor: color + '15',
                border: `1px solid ${color}`,
                color: color,
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: 0.8
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {category === 'prayer' && 'Prayer'}
              {category === 'sacrament' && 'Sacraments'}
              {category === 'ceremony' && 'Ceremonies'}
              {category === 'counseling' && 'Counseling'}
              {category === 'reservation' && 'Reservation'}
            </div>
          ))}
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
          {serviceData.map((service, idx) => (
            <div
              key={service.id}
              style={{
                background: white,
                border: `2px solid ${service.color || gold}`,
                borderRadius: 18,
                boxShadow: `0 4px 24px ${service.color}11`,
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
              onClick={() => handleServiceClick(service)}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = `0 8px 32px ${service.color}33`;
                e.currentTarget.style.border = `2.5px solid ${service.color || hoverPurple}`;
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.035)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = `0 4px 24px ${service.color}11`;
                e.currentTarget.style.border = `2px solid ${service.color || gold}`;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{
                fontSize: 38,
                marginBottom: 10,
                marginLeft: -2,
                filter: 'drop-shadow(0 2px 6px #9d4edd22)'
              }}>
                {service.icon}
              </div>
              <div style={{ fontWeight: 700, color: service.color || gold, fontSize: '1.18rem', marginBottom: 8 }}>
                {service.title}
              </div>
              <div style={{ color: '#444', fontSize: '1.05rem', marginBottom: 14, minHeight: 48 }}>
                {service.description}
              </div>
              <div style={{
                position: 'absolute',
                bottom: 18,
                right: 18,
                color: service.color || hoverPurple,
                fontWeight: 700,
                fontSize: '1.08rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {service.price} UAH
              </div>
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                backgroundColor: service.color + '15' || gold + '15',
                color: service.color || gold,
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {service.category === 'prayer' && 'Prayer'}
                {service.category === 'sacrament' && 'Sacrament'}
                {service.category === 'ceremony' && 'Ceremony'}
                {service.category === 'counseling' && 'Counseling'}
                {service.category === 'reservation' && 'Reservation'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service modal window */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={handleCloseModal}
          title={selectedService.title}
          icon={selectedService.icon}
          accentColor={selectedService.color}
        >
          <div style={{ padding: '10px 0' }}>
            {React.createElement(selectedService.modalComponent, {
              onClose: handleCloseModal,
              onPaid: handlePaid
            })}
          </div>
        </Modal>
      )}

      {/* Success payment */}
      <SuccessModal
        isOpen={showSuccessModal}
        message="Service Paid Successfully"
        subMessage="Thank you for supporting our church!"
        icon="✅"
        countdown={countdown}
      />

      <WishBox />

      <footer style={{
        background: gold,
        color: white,
        textAlign: 'center',
        padding: '16px 0',
        fontSize: '1rem',
        letterSpacing: '1px'
      }}>
        © 2024 Church Online. All rights reserved.
      </footer>

      {/* Animations and additional styles */}
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
        @keyframes successPop {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          40% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
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
  padding: '30px',
  width: '380px',
  minHeight: '200px',
  position: 'relative'
};

export default Services;
