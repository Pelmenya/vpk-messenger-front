import { Middleware } from "@reduxjs/toolkit";
import * as signalR from "@microsoft/signalr";
import { getToken } from "@/features/auth/model/auth-selectors";
import { setConnectionStatus } from "@/entities/chat/model/chat-slice";
import { receiveMessage } from "@/entities/message/model/message-slice";
import { TMessage } from "@/entities/chat/model/types/t-message";

type ChatConnectAction = {
    type: "chat/connect";
    payload?: { chatId?: string };
};
type ChatDisconnectAction = {
    type: "chat/disconnect";
};
type ChatSendMessageAction = {
    type: "chat/sendMessage";
    payload: { chatId: string; message: TMessage };
};

function isChatConnectAction(action: unknown): action is ChatConnectAction {
    return typeof action === "object" && action !== null && (action as any).type === "chat/connect";
}
function isChatDisconnectAction(action: unknown): action is ChatDisconnectAction {
    return typeof action === "object" && action !== null && (action as any).type === "chat/disconnect";
}
function isChatSendMessageAction(action: unknown): action is ChatSendMessageAction {
    return typeof action === "object" && action !== null && (action as any).type === "chat/sendMessage";
}

let connection: signalR.HubConnection | null = null;

export const signalrMiddleware: Middleware = store => next => async (action) => {
    if (isChatConnectAction(action)) {
        if (connection) {
            await connection.stop();
            connection = null;
        }
        const chatId = action.payload?.chatId ?? store.getState().chat.selectedChatId;
        const token = getToken(store.getState());
        if (!chatId || !token) return next(action);

        const url = `${import.meta.env.VITE_BACKEND_SIGNAL_R_BASE_URL}?chatId=${chatId}`;

        connection = new signalR.HubConnectionBuilder()
            .withUrl(url, { accessTokenFactory: () => token || "" })
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveMessage", (message: TMessage) => {
            store.dispatch(receiveMessage({ chatId, message }));
        });

        connection.onreconnected(() => store.dispatch(setConnectionStatus("connected")));
        connection.onclose((error) => {
            store.dispatch(setConnectionStatus("disconnected"));
            if (error) console.error("SignalR closed:", error);
        });

        try {
            await connection.start();
            store.dispatch(setConnectionStatus("connected"));
        } catch (e) {
            console.error("SignalR connection error:", e);
            store.dispatch(setConnectionStatus("error"));
        }
    } else if (isChatDisconnectAction(action)) {
        if (connection) {
            await connection.stop();
            connection = null;
            store.dispatch(setConnectionStatus("disconnected"));
        }
    } else if (isChatSendMessageAction(action)) {
        const { chatId, message } = action.payload;
        if (connection && connection.state === signalR.HubConnectionState.Connected) {
            await connection.invoke("SendMessageToChat", chatId, message);
        }
    }
    return next(action);
};
