import { Middleware } from "@reduxjs/toolkit";
import * as signalR from "@microsoft/signalr";
import { getToken } from "@/features/auth/model/auth-selectors";
import { receiveMessage } from "@/entities/message/model/message-slice";
import { setConnectionStatus } from "@/entities/chat/model/chat-slice";

let connection: signalR.HubConnection | null = null;

export const signalrMiddleware: Middleware<{}>= store => next => async action => {
    if (typeof action === "object" && action && "type" in action) {
        switch ((action as { type: string; payload?: any }).type) {
            case "chat/connect":
                if (connection) return next(action);
                {
                    const token = getToken(store.getState());
                    connection = new signalR.HubConnectionBuilder()
                        .withUrl(import.meta.env.VITE_BACKEND_SIGNAL_R_BASE_URL, {
                            accessTokenFactory: () => token || "",
                        })
                        .withAutomaticReconnect()
                        .build();

                    // Получение сообщений
                    connection.on("ReceiveMessage", (payload) => {
                        store.dispatch(receiveMessage(payload)); // Диспатчим в Redux
                    });

                    // События статуса соединения
                    connection.onreconnected(() => store.dispatch(setConnectionStatus("connected")));
                    connection.onclose(() => store.dispatch(setConnectionStatus("disconnected")));

                    try {
                        await connection.start();
                        store.dispatch(setConnectionStatus("connected"));
                    } catch (e) {
                        store.dispatch(setConnectionStatus("error"));
                    }
                }
                break;

            case "chat/disconnect":
                if (connection) {
                    await connection.stop();
                    connection = null;
                    store.dispatch(setConnectionStatus("disconnected"));
                }
                break;

            case "chat/sendMessage": {
                const { chatId, message } = (action as { type: string; payload: { chatId: number; message: string } }).payload;
                if (connection && connection.state === signalR.HubConnectionState.Connected) {
                    await connection.invoke("SendMessageToChat", chatId, message);
                }
                break;
            } default:
                break;
        }
        return next(action);
    }
};