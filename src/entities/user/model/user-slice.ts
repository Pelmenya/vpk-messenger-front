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
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
