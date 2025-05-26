export type TUser = {
    userId: number;
    username: string;
    displayName: string;
}

export type TUserResponse = {
    user: TUser;
};