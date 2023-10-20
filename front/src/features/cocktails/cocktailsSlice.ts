import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createCocktail, fetchCocktails, fetchOneCocktail } from './cocktailsThunk.ts';
import { IApiCocktail, ICocktail } from '../../types';

interface CocktailsState {
  items: ICocktail[];
  fetchLoading: boolean;
  createLoading: boolean;
  oneCocktail: IApiCocktail | null;
  fetchOneLoading: boolean;
}

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  oneCocktail: null,
  fetchOneLoading: false,
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

    builder
      .addCase(fetchOneCocktail.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneCocktail.fulfilled, (state, { payload: cocktail }) => {
        state.fetchOneLoading = false;
        state.oneCocktail = cocktail;
      })
      .addCase(fetchOneCocktail.rejected, (state) => {
        state.fetchOneLoading = false;
      });
  },
});

export const cocktailsReducer = cocktailSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.fetchLoading;
export const selectCreateCocktailLoading = (state: RootState) => state.cocktails.createLoading;
export const selectOneCocktail = (state: RootState) => state.cocktails.oneCocktail;
export const selectFetchOneCocktailLoading = (state: RootState) => state.cocktails.fetchOneLoading;
