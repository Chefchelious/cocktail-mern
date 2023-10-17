import React from 'react';
import { Button } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Button component={NavLink} to="/register" sx={{ color: 'white' }}>
        Sign up
      </Button>
      <Button component={NavLink} to="/login" sx={{ color: 'white' }}>
        Sign in
      </Button>
    </>
  );
};

export default AnonymousMenu;
