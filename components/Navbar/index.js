import React from 'react';
import styled from '@emotion/styled';

// Styled Navbar component
const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'sticky',
  top: 0,
  left:0,
  zIndex: 1000,
  padding: '10px ', // Added padding for better visual spacing
}));

// Styled ListItem component
const ListItem = styled('li')(() => ({
  display: 'inline-block',
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

// Styled Link component
const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

// TopNavbar component
const TopNavbar = () => {
  return (
    <Navbar>
      <ul style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
        <ListItem>
          <Link href={'/'}>Home</Link>
        </ListItem>
        <ListItem>
          <Link href={'/users'}>Users</Link>
        </ListItem>
      </ul>
    </Navbar>
  );
};

export default TopNavbar;
