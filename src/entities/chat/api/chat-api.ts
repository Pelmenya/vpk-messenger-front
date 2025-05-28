import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TChatsResponse } from '../model/types/t-chats-response';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '',
    }),
    endpoints: (builder) => ({
        getChats: builder.query<TChatsResponse, string>({
            query: (authKey) => ({
                url: 'chat',
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: 'Bearer ' + authKey,
                },
            }),
        }),
        getMessagesByChatId: builder.query<any, { chatId: number; authKey: string }>({
            query: ({chatId, authKey}) => ({
                url: `message/${chatId}`,
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
    useGetChatsQuery,
    useGetMessagesByChatIdQuery,
} = chatApi;