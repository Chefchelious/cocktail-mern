import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ICocktail } from '../../types';

interface IFetchQueries {
  admin: 'true' | '';
  user: 'true' | '';
}

export const fetchCocktails = createAsyncThunk<ICocktail[], IFetchQueries>(
  'cocktails/fetchCocktails',
  async (queries: IFetchQueries) => {
    const cocktailsResponse = await axiosApi<ICocktail[]>(
      `/cocktails?user=${queries.user}&admin=${queries.admin}`,
    );

    return cocktailsResponse.data;
  },
);
