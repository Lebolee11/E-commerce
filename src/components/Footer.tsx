import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      <p>&copy; {new Date().getFullYear()} Your Company Name</p>
    </footer>
  );
};

export default Footer;
