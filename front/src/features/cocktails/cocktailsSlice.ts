import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import {
  createCocktail,
  deleteCocktail,
  fetchCocktails,
  fetchOneCocktail,
  rateCocktail,
  toggleCocktailPublished,
} from './cocktailsThunk.ts';
import { IApiCocktail, ICocktail } from '../../types';

interface CocktailsState {
  items: ICocktail[];
  fetchLoading: boolean;
  createLoading: boolean;
  oneCocktail: IApiCocktail | null;
  fetchOneLoading: boolean;
  publishedLoading: boolean;
  deleteLoading: boolean;
  ratingLoading: boolean;
}

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  oneCocktail: null,
  fetchOneLoading: false,
  publishedLoading: false,
  deleteLoading: false,
  ratingLoading: false,
};

const cocktailSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {
    setCocktail: (state) => {
      state.oneCocktail = null;
    },
  },
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
        state.oneCocktail = null; // либо использовать setCocktail reducer
        // потому что в стейте остается предыдущий коктейль из-за этого анимация framer motion
        //ведет себя не корректно, остаточность предыдущего котейля в стейте каким-то образом влияет на анимацию
      })
      .addCase(fetchOneCocktail.fulfilled, (state, { payload: cocktail }) => {
        state.fetchOneLoading = false;
        state.oneCocktail = cocktail;
      })
      .addCase(fetchOneCocktail.rejected, (state) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(toggleCocktailPublished.pending, (state) => {
        state.publishedLoading = true;
      })
      .addCase(toggleCocktailPublished.fulfilled, (state) => {
        state.publishedLoading = false;
      })
      .addCase(toggleCocktailPublished.rejected, (state) => {
        state.publishedLoading = false;
      });

    builder
      .addCase(deleteCocktail.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(rateCocktail.pending, (state) => {
        state.ratingLoading = true;
      })
      .addCase(rateCocktail.fulfilled, (state) => {
        state.ratingLoading = false;
      })
      .addCase(rateCocktail.rejected, (state) => {
        state.ratingLoading = false;
      });
  },
});

export const cocktailsReducer = cocktailSlice.reducer;
export const { setCocktail } = cocktailSlice.actions;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.fetchLoading;
export const selectCreateCocktailLoading = (state: RootState) => state.cocktails.createLoading;
export const selectOneCocktail = (state: RootState) => state.cocktails.oneCocktail;
export const selectFetchOneCocktailLoading = (state: RootState) => state.cocktails.fetchOneLoading;
export const selectPublishCocktailLoading = (state: RootState) => state.cocktails.publishedLoading;
export const selectDeleteCocktailLoading = (state: RootState) => state.cocktails.deleteLoading;
