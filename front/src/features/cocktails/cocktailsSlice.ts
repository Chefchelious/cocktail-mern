import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchCocktails } from './cocktailsThunk.ts';
import { ICocktail } from '../../types';

interface CocktailsState {
  items: ICocktail[];
  fetchLoading: boolean;
}

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
};

const cocktailSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.fetchLoading = false;
        state.items = cocktails;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const cocktailsReducer = cocktailSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.fetchLoading;
