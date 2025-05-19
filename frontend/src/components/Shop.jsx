import React, { useState } from 'react';
import Header from './Header.jsx';
import WishBox from './WishBox.jsx';
import {
  gold,
  darkGold,
  white,
  hoverPurple
} from '../styles/sharedStyles';

// Import images
import BibleNotebook from '../assets/images/BibleNotebook.jpg';
import ChildrensTshirt from '../assets/images/Children\'sT-shirt.jpg';
import ChurchCandleSet from '../assets/images/ChurchCandleSet.jpg';
import ChurchHat from '../assets/images/churchhat.jpg';
import ChurchHoodie from '../assets/images/churchhoodie.jpg';
import ChurchMug from '../assets/images/ChurchMug.jpg';
import FaithTshirt from '../assets/images/faitht-shirt.jpg';
import GuardianAngelIcon from '../assets/images/guardianangelicon.jpg';
import HolyTrinityIcon from '../assets/images/holytrinityicon.jpg';
import IncensePack from '../assets/images/IncensePack.jpg';
import JesusIcon from '../assets/images/jesusicon.jpg';
import PrayerShawl from '../assets/images/PrayerShawl.jpg';
import RosaryBeads from '../assets/images/RosaryBeads.jpg';
import StNicholasIcon from '../assets/images/stnicholasicon.jpg';
import VirginMaryIcon from '../assets/images/virginmaryicon.jpg';

// Update products array to use imported images
const products = [
  {
    id: 1,
    name: 'Icon of Jesus Christ',
    description: 'Hand-painted icon of Jesus Christ. Blessed in our church.',
    price: 1200,
    image: JesusIcon
  },
  {
    id: 2,
    name: 'Icon of Virgin Mary',
    description: 'Beautiful icon of the Virgin Mary. A symbol of hope and love.',
    price: 1100,
    image: VirginMaryIcon
  },
  {
    id: 3,
    name: 'Saint Nicholas Icon',
    description: 'Small icon of Saint Nicholas, patron of travelers and children.',
    price: 950,
    image: StNicholasIcon
  },
  {
    id: 4,
    name: 'Guardian Angel Icon',
    description: 'Icon for home protection and blessing.',
    price: 850,
    image: GuardianAngelIcon
  },
  {
    id: 5,
    name: 'Holy Trinity Icon',
    description: 'Traditional icon of the Holy Trinity. Perfect for prayer corner.',
    price: 1300,
    image: HolyTrinityIcon
  },
  {
    id: 6,
    name: 'Faith T-shirt',
    description: 'Comfortable cotton T-shirt with inspirational print.',
    price: 250,
    image: FaithTshirt
  },
  {
    id: 7,
    name: 'Church Hoodie',
    description: 'Warm hoodie with church logo. Unisex, all sizes.',
    price: 480,
    image: ChurchHoodie
  },
  {
    id: 8,
    name: 'Christian Cap',
    description: 'Stylish cap with cross embroidery.',
    price: 180,
    image: ChurchHat
  },
  {
    id: 9,
    name: 'Prayer Shawl',
    description: 'Lightweight shawl for prayer and church visits.',
    price: 220,
    image: PrayerShawl
  },
  {
    id: 10,
    name: 'Children\'s T-shirt',
    description: 'Soft T-shirt for kids with a joyful Christian message.',
    price: 160,
    image: ChildrensTshirt
  },
  {
    id: 11,
    name: 'Church Candle Set',
    description: 'Set of 10 beeswax candles for home prayer.',
    price: 70,
    image: ChurchCandleSet
  },
  {
    id: 12,
    name: 'Incense Pack',
    description: 'Natural incense for spiritual atmosphere.',
    price: 60,
    image: IncensePack
  },
  {
    id: 13,
    name: 'Bible Notebook',
    description: 'A5 notebook for your notes and prayers.',
    price: 90,
    image: BibleNotebook
  },
  {
    id: 14,
    name: 'Rosary Beads',
    description: 'Wooden rosary beads for daily prayer.',
    price: 110,
    image: RosaryBeads
  },
  {
    id: 15,
    name: 'Church Mug',
    description: 'Ceramic mug with church logo. Perfect for your morning coffee.',
    price: 120,
    image: ChurchMug
  }
];

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map(item =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Фільтрація товарів за пошуком
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: white, minHeight: '100vh', position: 'relative' }}>
      <Header />
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        maxWidth: 1400,
        margin: '0 auto',
        padding: '36px 0 48px 0',
        gap: 48
      }}>
        {/* Товари */}
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          {/* Пошук */}
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: `1.5px solid ${gold}`,
                fontSize: '1.05rem',
                width: 320,
                maxWidth: '90%',
                outline: 'none',
                marginBottom: 8,
                transition: 'border 0.2s'
              }}
            />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
            justifyItems: 'center',
            minWidth: 0
          }}>
            {filteredProducts.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', color: '#888', fontSize: '1.1rem', marginTop: 32 }}>
                No products found.
              </div>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} style={{
                  background: white,
                  border: `1.5px solid ${gold}`,
                  borderRadius: 14,
                  boxShadow: `0 2px 8px ${hoverPurple}11`,
                  width: 270,
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'box-shadow 0.2s, transform 0.2s'
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: 160,
                      objectFit: 'cover',
                      borderRadius: 8,
                      marginBottom: 14,
                      border: `1px solid ${gold}`
                    }}
                  />
                  <h3 style={{ color: gold, margin: '8px 0 4px 0', fontSize: '1.18rem' }}>{product.name}</h3>
                  <div style={{ color: '#444', fontSize: '1rem', marginBottom: 10, textAlign: 'center' }}>{product.description}</div>
                  <div style={{ color: hoverPurple, fontWeight: 700, fontSize: '1.08rem', marginBottom: 12 }}>
                    {product.price} ₴
                  </div>
                  <button
                    style={{
                      background: gold,
                      color: white,
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 24px',
                      fontWeight: 'bold',
                      fontSize: '1.05rem',
                      cursor: 'pointer',
                      boxShadow: `0 2px 8px ${gold}33`,
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = hoverPurple}
                    onMouseOut={e => e.currentTarget.style.background = gold}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Корзина */}
        <div style={{
          width: 340,
          minWidth: 260,
          background: white,
          border: `2px solid ${hoverPurple}`,
          borderRadius: 16,
          boxShadow: `0 2px 12px ${hoverPurple}11`,
          padding: '24px 18px',
          position: 'sticky',
          top: 36
        }}>
          <h3 style={{ color: hoverPurple, fontSize: '1.25rem', marginBottom: 18, textAlign: 'center' }}>🛒 Your Cart</h3>
          {cart.length === 0 ? (
            <div style={{ color: '#888', textAlign: 'center', margin: '32px 0' }}>Cart is empty</div>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                  borderBottom: `1px solid ${gold}33`,
                  paddingBottom: 10
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: gold, fontWeight: 700 }}>{item.name}</div>
                    <div style={{ color: '#444', fontSize: '0.98rem' }}>{item.price} ₴</div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                      <button
                        style={{
                          background: hoverPurple,
                          color: white,
                          border: 'none',
                          borderRadius: 6,
                          width: 26,
                          height: 26,
                          fontWeight: 'bold',
                          fontSize: 18,
                          cursor: 'pointer',
                          marginRight: 6
                        }}
                        onClick={() => changeQty(item.id, -1)}
                      >-</button>
                      <span style={{ minWidth: 22, textAlign: 'center', fontWeight: 700 }}>{item.qty}</span>
                      <button
                        style={{
                          background: hoverPurple,
                          color: white,
                          border: 'none',
                          borderRadius: 6,
                          width: 26,
                          height: 26,
                          fontWeight: 'bold',
                          fontSize: 18,
                          cursor: 'pointer',
                          marginLeft: 6
                        }}
                        onClick={() => changeQty(item.id, 1)}
                      >+</button>
                    </div>
                  </div>
                  <button
                    style={{
                      background: 'none',
                      color: '#ef233c',
                      border: 'none',
                      fontWeight: 'bold',
                      fontSize: 20,
                      cursor: 'pointer',
                      marginLeft: 10
                    }}
                    title="Remove"
                    onClick={() => removeFromCart(item.id)}
                  >×</button>
                </div>
              ))}
              <div style={{
                color: hoverPurple,
                fontWeight: 700,
                fontSize: '1.08rem',
                textAlign: 'right',
                marginTop: 18
              }}>
                Total: {total} ₴
              </div>
              <button
                style={{
                  marginTop: 18,
                  width: '100%',
                  background: gold,
                  color: white,
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 0',
                  fontWeight: 'bold',
                  fontSize: '1.08rem',
                  cursor: 'pointer',
                  boxShadow: `0 2px 8px ${gold}33`,
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = hoverPurple}
                onMouseOut={e => e.currentTarget.style.background = gold}
                onClick={() => alert('Thank you for your order! (Demo)')}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      {/* WishBox (скринька побажань) */}
      <WishBox />
      {/* Footer */}
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

export default Shop;

