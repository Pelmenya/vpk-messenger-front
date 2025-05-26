import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/user',
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

    }),
});

export const {
    useGetUserByIdQuery,
} = userApi;