import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createCocktail, fetchCocktails } from './cocktailsThunk.ts';
import { ICocktail } from '../../types';

interface CocktailsState {
  items: ICocktail[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
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

    builder
      .addCase(createCocktail.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCocktail.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCocktail.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const cocktailsReducer = cocktailSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.fetchLoading;
export const selectCreateCocktailLoading = (state: RootState) => state.cocktails.createLoading;
