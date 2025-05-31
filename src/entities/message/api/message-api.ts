import { TMessage } from '@/entities/chat/model/types/t-message';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL + '/message',
    }),
    endpoints: (builder) => ({
        getMessagesByChatId: builder.query<TMessage[], { chatId: number; authKey: string }>({
            query: ({ chatId, authKey }) => ({
                url: `${chatId}`,
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
    useGetMessagesByChatIdQuery,
} = messageApi;