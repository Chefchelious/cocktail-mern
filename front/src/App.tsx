import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register.tsx';

const App = () => {
  return (
    <>
      <CssBaseline />

      <header>
        <AppToolbar />
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
