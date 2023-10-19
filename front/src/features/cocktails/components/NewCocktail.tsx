import React from 'react';
import { useAppSelector } from '../../../app/hook.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { Navigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import CocktailForm from './CocktailForm.tsx';

const NewCocktail = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add cocktail
      </Typography>

      <CocktailForm />
    </Container>
  );
};

export default NewCocktail;
