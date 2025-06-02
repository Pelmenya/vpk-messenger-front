import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TChatsResponse } from '../model/types/t-chats-response';
import { TChat } from '../model/types/t-chat';
import { setBaseApiUrl } from '@/shared/lib/helpers/set-base-api-url';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({
        baseUrl: setBaseApiUrl('/chat'),
    }),
    endpoints: (builder) => ({
        getChats: builder.query<TChatsResponse, string>({
            query: (authKey) => ({
                url: '',
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: 'Bearer ' + authKey,
                },
            }),
        }),
        getChatById: builder.query<TChat, { chatId: number; authKey: string }>({
            query: ({ chatId, authKey }) => ({
                url: `${chatId}`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    Authorization: 'Bearer ' + authKey,
                },
            }),
        }),
        putChatById: builder.mutation<any, { chatId: number; name: string; participants: number[]; authKey: string }>({
            query: ({ chatId, name, participants, authKey }) => ({
                url: `${chatId}`,
                method: 'PUT',
                credentials: 'include',
                body: {
                    name,
                    participants
                },
                headers: {
                    Authorization: 'Bearer ' + authKey,
                },
            }),
        }),


    }),
});

export const {
    useGetChatsQuery,
    useGetChatByIdQuery,
    usePutChatByIdMutation,
} = chatApi;