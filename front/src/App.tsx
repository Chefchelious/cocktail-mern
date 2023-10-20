import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import CocktailList from './features/cocktails/CocktailList.tsx';
import NewCocktail from './features/cocktails/components/NewCocktail.tsx';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute.tsx';
import { useAppSelector } from './app/hook.ts';
import { selectUser } from './features/users/usersSlice.ts';
import FullCocktailInfo from './features/cocktails/FullCocktailInfo/FullCocktailInfo.tsx';
import MyCocktails from './features/cocktails/MyCocktails/MyCocktails.tsx';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <CssBaseline />

      <header>
        <AppToolbar />
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<CocktailList />} />

            <Route
              path="/add_cocktail"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <NewCocktail />
                </ProtectedRoute>
              }
            />

            <Route path="/cocktails/:id" element={<FullCocktailInfo />} />

            <Route path="/cocktails/my_cocktails" element={<MyCocktails />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
