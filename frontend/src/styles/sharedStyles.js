export const gold = '#ffd42e';
export const darkGold = '#c9a43a';
export const white = '#fff';
export const hoverPurple = '#9d4edd';

export const headerStyle = {
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
};

export const headerGradient = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(157,78,221,0.10) 100%)',
  pointerEvents: 'none',
  zIndex: 0
};

export const headerLogoWrap = {
  display: 'flex',
  alignItems: 'center',
  zIndex: 1
};

export const headerLogoIcon = {
  fontSize: 32,
  marginLeft: 18,
  marginRight: 8,
  userSelect: 'none'
};

export const headerLogoText = {
  margin: 0,
  fontSize: '1.1rem',
  letterSpacing: '2px',
  color: white,
  fontWeight: 700,
  textTransform: 'uppercase',
  cursor: 'pointer'
};

export const headerNav = {
  marginRight: 32,
  display: 'flex',
  gap: 24,
  alignItems: 'center',
  zIndex: 1
};

export const headerNavBtn = {
  color: darkGold,
  background: white,
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.05rem',
  padding: '7px 14px',
  borderRadius: 6,
  border: 'none',
  transition: 'background 0.2s, color 0.2s, border 0.2s, transform 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
};

export const headerNavBtnLogout = {
  marginLeft: 24,
  color: white,
  background: '#ef233c',
  fontWeight: 'bold',
  fontSize: '1.05rem',
  padding: '7px 18px',
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s, border 0.2s, transform 0.2s ease',
  display: 'flex',
  alignItems: 'center'
};

export const headerDivider = {
  position: 'absolute',
  right: 180,
  top: '20%',
  height: '60%',
  width: 2,
  background: 'rgba(255,255,255,0.18)',
  borderRadius: 2,
  zIndex: 0
};

// Admin Panel Styles
export const adminContainerStyle = {
  maxWidth: '1200px',
  margin: '20px auto',
  padding: '0 20px',
  backgroundColor: white,
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

export const adminHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 0',
  borderBottom: `2px solid ${gold}`,
  marginBottom: '20px',
};

export const adminTitleStyle = {
  fontSize: '28px',
  color: darkGold,
  margin: 0,
  fontWeight: 'bold',
};

export const adminNavStyle = {
  display: 'flex',
  gap: '15px',
};

export const adminPrimaryButton = {
  background: darkGold,
  color: white,
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background 0.3s',
  '&:hover': {
    background: hoverPurple,
  },
};

export const adminDangerButton = {
  background: '#ef233c',
  color: white,
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background 0.3s',
  '&:hover': {
    background: '#c00424',
  },
};
