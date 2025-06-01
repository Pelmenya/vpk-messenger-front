import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from './user.entity';
import { TNullable } from '@/shared/types/t-nullable';

type TUserState = {
  user: TNullable<TUser>;
};

const initialState: TUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TNullable<TUser>>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setUserAvatar(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.profileImageUrl = action.payload;
      }
    }
  },
});

export const { setUser, clearUser, setUserAvatar } = userSlice.actions;
