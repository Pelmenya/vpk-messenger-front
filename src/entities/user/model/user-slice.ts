// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TNullable } from '../../../shared/types/t-nullable';
import { TUser } from './user.entity';

// Определяем тип для состояния пользователя
export type TUserState = {
  user: TNullable<TUser>;
};

// Исходное состояние
const initialState: TUserState = {
  user: null,
};

// Создаем слайс
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    loadUserFromStorage(state) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData: TUserState = JSON.parse(storedUser);
        state.user = userData.user;
      }
    },
  },
});

export const { setUser, clearUser, loadUserFromStorage } = userSlice.actions;
