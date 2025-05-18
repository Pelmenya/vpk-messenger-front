import { TAppState } from "../../../app/store";

export const getAuthToken = (state: TAppState) => state.user.token;
export const getUser = (state: TAppState) => state.user.user;