import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TRegister } from '../model/types/t-register';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: String(import.meta.env.VITE_BACKEND_BASE_URL) + '/auth',
    }),

    endpoints: (builder) => ({
        postLogin: builder.mutation<{success: boolean}, {}>({
            query: () => ({
                url: 'login',
                method: 'POST',
                credentials: 'include'
            }),
        }),
        postRegister: builder.mutation<{success: boolean}, TRegister>({
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