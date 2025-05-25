import { TAppState } from "@/app/store/store";

export const getUser = (state: TAppState) => state.user.user;