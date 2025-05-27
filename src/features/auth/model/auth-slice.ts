import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TNullable } from '@/shared/types/t-nullable';

export type TAuthState = {
  token: TNullable<string>;
  isLoggedIn: boolean;
};

const initialState: TAuthState = {
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<TNullable<string>>) {
      state.token = action.payload;
      state.isLoggedIn = Boolean(action.payload);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, logout } = authSlice.actions;