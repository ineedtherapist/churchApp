import React, { useState } from 'react';
import { gold, hoverPurple, white } from '../styles/sharedStyles';

const WishBox = () => {
  const [donateOpen, setDonateOpen] = useState(false);

  // Функція для перемикання стану скриньки побажань
  const toggleWishBox = () => {
    setDonateOpen(prev => !prev);
  };

  return (
    <>
      {/* Скринька побажань (кнопка) */}
      <button
        onClick={toggleWishBox}
        style={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          zIndex: 1000,
          background: gold,
          color: white,
          border: 'none',
          borderRadius: '50%',
          width: 64,
          height: 64,
          boxShadow: `0 4px 16px ${hoverPurple}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          cursor: 'pointer',
          transition: 'background 0.2s, box-shadow 0.2s'
        }}
        title="Make a wish or donate"
        onMouseOver={e => e.currentTarget.style.background = hoverPurple}
        onMouseOut={e => e.currentTarget.style.background = gold}
      >
        <span role="img" aria-label="donate">🎁</span>
      </button>

      {/* Міні-вікно пожертвувань */}
      {donateOpen && (
        <div
          style={{
            position: 'fixed',
            right: 32,
            bottom: 110,
            zIndex: 1100,
            background: white,
            border: `2px solid ${gold}`,
            borderRadius: 18,
            boxShadow: `0 6px 32px ${hoverPurple}22`,
            width: 340,
            maxWidth: '90vw',
            padding: '24px 22px 22px',
            animation: 'fadeInDonate 0.25s'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14
          }}>
            <div style={{
              fontWeight: 700,
              color: gold,
              fontSize: '1.2rem',
              letterSpacing: '1px'
            }}>
              Wish & Donate Box
            </div>
            <button
              onClick={() => setDonateOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: hoverPurple,
                fontSize: 22,
                fontWeight: 700,
                cursor: 'pointer',
                marginRight: 10,
                padding: 0,
                position: 'absolute',
                right: 18,
                top: 20
              }}
              aria-label="Close"
            >×</button>
          </div>
          <div style={{
            color: '#444',
            fontSize: '1.05rem',
            marginBottom: 18
          }}>
            Leave your wish or make a donation to support our church community.
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              alert('Thank you for your wish or donation! (Demo)');
              setDonateOpen(false);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <textarea
              placeholder="Your wish or prayer request..."
              style={{
                width: '92%',
                minHeight: 60,
                borderRadius: 8,
                border: `1.5px solid ${hoverPurple}`,
                padding: '10px 12px',
                fontSize: '1rem',
                marginBottom: 14,
                resize: 'none',
                outline: 'none'
              }}
              maxLength={200}
              required
            />
            <input
              type="number"
              min={1}
              placeholder="Donation amount (₴, optional)"
              style={{
                width: '92%',
                borderRadius: 8,
                border: `1.5px solid ${gold}`,
                padding: '10px 12px',
                fontSize: '1rem',
                marginBottom: 16,
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                width: '92%',
                background: gold,
                color: white,
                border: 'none',
                borderRadius: 8,
                padding: '12px 0',
                fontWeight: 'bold',
                fontSize: '1.08rem',
                cursor: 'pointer',
                boxShadow: `0 2px 8px ${gold}33`,
                transition: 'background 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.background = hoverPurple}
              onMouseOut={e => e.currentTarget.style.background = gold}
            >
              Send Wish / Donate
            </button>
          </form>
        </div>
      )}
      <style>
        {`
          @keyframes fadeInDonate {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </>
  );
};

export default WishBox;
