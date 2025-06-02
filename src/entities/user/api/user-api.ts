import { setBaseApiUrl } from '@/shared/lib/helpers/set-base-api-url';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TUserUpdateDto } from '../model/types/t-user-update.dto';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: setBaseApiUrl('/user'),
    }),
    endpoints: (builder) => ({
        getUserById: builder.query<any, { userId: number; authKey: string }>({
            query: ({ userId, authKey }) => ({
                url: `${userId}`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: 'Bearer ' + authKey,
                },
            }),
        }),
        getUserMe: builder.query<any, { authKey: string }>({
            query: ({ authKey }) => ({
                url: 'me',
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: 'Bearer ' + authKey,
                },
            }),
        }),
        putUserAvatar: builder.mutation<{ url: string }, { body: FormData; authKey: string }>({
            query: ({ body, authKey }) => ({
                url: 'avatar',
                method: 'PUT',
                credentials: 'include',
                body,
                headers: {
                    Authorization: 'Bearer ' + authKey,
                },
            }),
        }),
        putUser: builder.mutation<any, { body: TUserUpdateDto; authKey: string }>({
            query: ({ body, authKey }) => ({
                url: 'me',
                method: 'PUT',
                credentials: 'include',
                body,
                headers: {
                    Authorization: 'Bearer ' + authKey,
                },
            }),
        }),
    }),
});

export const {
    useGetUserByIdQuery,
    useGetUserMeQuery,
    usePutUserAvatarMutation,
    usePutUserMutation,
    useLazyGetUserMeQuery,
} = userApi;
