// authSlice.ts
import { TNullable } from '@/shared/types/t-nullable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем тип для состояния аутентификации
type TAuthState = {
  token: TNullable<string>;
  isLoggedIn: boolean;
};

// Исходное состояние
const initialState: TAuthState = {
  token: null,
  isLoggedIn: false,
};

// Создаем слайс
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('auth');
    },
    loadAuthFromStorage(state) {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        const authData: TAuthState = JSON.parse(storedAuth);
        state.token = authData.token;
        state.isLoggedIn = authData.isLoggedIn;
      }
    },
  },
});

export const { login, logout, loadAuthFromStorage } = authSlice.actions;
