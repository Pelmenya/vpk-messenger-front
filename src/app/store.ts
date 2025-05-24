import { configureStore, Middleware, type Action, type ThunkAction } from "@reduxjs/toolkit"
import { authApi } from "../features/auth/api/auth-api"
import logger from 'redux-logger'
import { userSlice } from "../entities/user/model/user-slice";
import { authSlice } from "../features/auth/model/auth-slice";
import { chatApi } from "@/entities/chat/api/chat-api";

const isDev = process.env.NODE_ENV === 'development';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [authSlice.reducerPath]: authSlice.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware().concat(
            authApi.middleware,
            chatApi.middleware,
        );

        if (isDev) {
            middlewares.push(logger as Middleware);
        }

        return middlewares;
    },
});

export type TRootState = ReturnType<typeof store.getState>;
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