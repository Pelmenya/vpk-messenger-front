import { configureStore, Middleware, type Action, type ThunkAction } from "@reduxjs/toolkit"
import logger from 'redux-logger'
import { chatApi } from "@/entities/chat/api/chat-api";
import { authApi } from "@/features/auth/api/auth-api";
import { authSlice } from "@/features/auth/model/auth-slice";
import { userSlice } from "@/entities/user/model/user-slice";
import { signalrMiddleware } from "./middlewares/signal-middleware";
import { chatSlice } from "@/entities/chat/model/chat-slice";
import { userApi } from "@/entities/user/api/user-api";
import { messageSlice } from "@/entities/message/model/message-slice";
import { messageApi } from "@/entities/message/api/message-api";

const isDev = process.env.NODE_ENV === 'development';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authSlice.reducerPath]: authSlice.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
        [chatSlice.reducerPath]: chatSlice.reducer,
        [messageSlice.reducerPath]: messageSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware().concat(
            authApi.middleware,
            chatApi.middleware,
            userApi.middleware,
            messageApi.middleware,
            signalrMiddleware,
        );

        if (isDev) {
            middlewares.push(logger as Middleware);
        }

        return middlewares;
    },
});

export type TAppDispatch = typeof store.dispatch;

export const makeStore = () => store;
export type TAppStore = ReturnType<typeof makeStore>;
export type TAppState = ReturnType<TAppStore['getState']>;
export type TAppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    TAppState,
    unknown,
    Action
>;