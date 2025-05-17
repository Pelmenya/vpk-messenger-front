import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: String(import.meta.env.VITE_BACKEND_BASE_URL) + '/auth',
    }),

    endpoints: (builder) => ({
        postLogin: builder.mutation<{success: boolean}, string | undefined>({
            query: (authKey) => ({
                url: 'login',
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + String(authKey),
                },
                credentials: 'include'
            }),
        }),
        postRegister: builder.mutation<{success: boolean}, { email: string; phone: string; authKey: string | undefined }>({
            query: ({ email, phone, authKey }) => ({
                url: 'register',
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + String(authKey),
                },
                credentials: 'include',
                body: {
                    email,
                    phone,
                },
            }),
        }),
    }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = authApi;