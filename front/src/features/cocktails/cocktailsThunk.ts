import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IApiCocktail, ICocktail, ICocktailMutation } from '../../types';

interface IFetchQueries {
  admin: 'true' | '';
  author: 'true' | '';
}

export const fetchCocktails = createAsyncThunk<ICocktail[], IFetchQueries>(
  'cocktails/fetchCocktails',
  async (queries: IFetchQueries) => {
    const cocktailsResponse = await axiosApi<ICocktail[]>(
      `/cocktails?author=${queries.author}&admin=${queries.admin}`,
    );

    return cocktailsResponse.data;
  },
);

export const createCocktail = createAsyncThunk<void, ICocktailMutation>(
  'cocktails/create',
  async (cocktail) => {
    const formData = new FormData();

    const keys = Object.keys(cocktail) as (keyof ICocktailMutation)[];

    keys.forEach((key) => {
      const value = cocktail[key];

      if (value !== null) {
        if (key === 'ingredients') {
          cocktail.ingredients.forEach((ing, idx) => {
            formData.append(`ingredients[${idx}][name]`, ing.name);
            formData.append(`ingredients[${idx}][amount]`, ing.amount);
          });
        } else {
          formData.append(key, value as string | File);
        }
      }
    });

    await axiosApi.post('/cocktails', formData);
  },
);

export const fetchOneCocktail = createAsyncThunk<IApiCocktail, string>(
  'cocktails/fetchOne',
  async (id) => {
    const { data } = await axiosApi<IApiCocktail>(`/cocktails/${id}`);

    return data;
  },
);

export const toggleCocktailPublished = createAsyncThunk<void, string>(
  'cocktail/published',
  async (id) => {
    await axiosApi.patch(`/cocktails/${id}/togglePublished`);
  },
);

export const deleteCocktail = createAsyncThunk<void, string>('cocktails/deleteOne', async (id) => {
  await axiosApi.delete(`/cocktails/${id}`);
});
