import { TAppState } from "@/app/store";

export const getToken = (state: TAppState) => state.auth.token;
export const getIsLoggedIn = (state: TAppState) => state.auth.isLoggedIn;