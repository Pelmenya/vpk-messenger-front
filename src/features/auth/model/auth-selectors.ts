import { TAppState } from "@/app/store";

export const getIsLoggedIn = (state: TAppState) => state.auth.isLoggedIn;