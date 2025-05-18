import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TRegister } from '../model/types/t-register';
import { TUserState } from '../../../entities/user/model/user-slice';

type RegisterResponse = {
  message: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: String(import.meta.env.VITE_BACKEND_BASE_URL) + '/auth',
  }),

  endpoints: (builder) => ({
    postLogin: builder.mutation<TUserState, Omit<TRegister, 'displayName'>>({
      query: ({ username, password }) => ({
        url: 'login',
        method: 'POST',
        credentials: 'include',
        body: {
          username,
          password,
        },
      }),
    }),
    postRegister: builder.mutation<RegisterResponse, TRegister>({
      query: ({ username, password, displayName }) => ({
        url: 'register',
        method: 'POST',
        credentials: 'include',
        body: {
          username,
          password,
          displayName,
        },
      }),
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = authApi;
