import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  ValidationError,
} from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

    keys.forEach((key) => {
      const value = registerMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post('/users', formData);
    return response.data as RegisterResponse;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const googleLogin = createAsyncThunk<RegisterResponse, string, { rejectValue: GlobalError }>(
  'users/google',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/google', { credential });
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete('/users/sessions');

    dispatch(unsetUser());
  },
);
