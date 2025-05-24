import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/auth',
    }),
    endpoints: (builder) => ({
        getChats: builder.query<any, string>({
            query: (authKey) => ({
                url: 'chats',
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
    useGetChatsQuery
} = chatApi;