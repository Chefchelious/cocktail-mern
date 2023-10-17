import { createSlice } from '@reduxjs/toolkit';
import { googleLogin, login, register } from './usersThunk';
import { GlobalError, IUser, ValidationError } from '../../types';
import { apiUrl } from '../../constants.ts';
import { RootState } from '../../app/store.ts';

interface UsersState {
  user: IUser | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })

      .addCase(register.fulfilled, (state, { payload: userResponse }) => {
        state.registerLoading = false;
        state.user = {
          ...userResponse.user,
          avatar: userResponse.user.avatar ? apiUrl + '/' + userResponse.user.avatar : null,
        };
      })

      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })

      .addCase(login.fulfilled, (state, { payload: userResponse }) => {
        state.loginLoading = false;
        state.user = {
          ...userResponse.user,
          avatar: userResponse.user.avatar ? apiUrl + '/' + userResponse.user.avatar : null,
        };
      })

      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
    });

    builder
      .addCase(googleLogin.fulfilled, (state, { payload: userResponse }) => {
        state.loginLoading = false;
        state.user = userResponse.user;
      })

      .addCase(googleLogin.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
