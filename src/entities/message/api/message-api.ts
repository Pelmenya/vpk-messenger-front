import { TMessage } from '@/entities/chat/model/types/t-message';
import { setBaseApiUrl } from '@/shared/lib/helpers/set-base-api-url';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: setBaseApiUrl('/message'),
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
        sendTextMessage: builder.mutation<any, { chatId: number; content: string; authKey: string }>({
            query: ({ chatId, content, authKey }) => ({
                url: 'send-message',
                method: 'POST',
                credentials: 'include',
                body: {
                    chatId,
                    content,
                },
                headers: {
                    Authorization: 'Bearer ' + authKey,
                },

            }),
        }),
        sendFileMessage: builder.mutation<any, { chatId: number; file: File; authKey: string }>(
            {
                query: ({ chatId, file, authKey }) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    return {
                        url: `file/${chatId}`,
                        method: "POST",
                        credentials: "include",
                        body: formData,
                        headers: {
                            Authorization: "Bearer " + authKey,
                            // 'Content-Type' не ставить вручную для FormData!
                        },
                    };
                },
            }
        ),

    }),
});

export const {
    useGetMessagesByChatIdQuery,
    useSendTextMessageMutation,
    useSendFileMessageMutation,
} = messageApi;