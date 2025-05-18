import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TNullable } from '../../../shared/types/t-nullable';
import { TUser } from './user.entity';

export type TUserState = {
  token: TNullable<string>
  user: TNullable<TUser>;
}

const initialState: TUserState = {
  token: null,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUserState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
