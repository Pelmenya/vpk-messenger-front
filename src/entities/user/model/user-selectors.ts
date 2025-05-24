import { TAppState } from "@/app/store";

export const getUser = (state: TAppState) => state.user.user;