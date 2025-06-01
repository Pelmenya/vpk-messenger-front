import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TRegister } from '../model/types/t-register';
import { TUserResponse } from '@/entities/user/model/user.entity';
import { setBaseApiUrl } from '@/shared/lib/helpers/setBaseApiUrl';

type RegisterResponse = {
    message: string;
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: setBaseApiUrl('/auth'),
    }),

    endpoints: (builder) => ({
        postLogin: builder.mutation<TUserResponse & { token: string }, Omit<TRegister, 'displayName'>>({
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
