export enum EUserType {
    Admin = 'Admin',
    DefaultUser = 'DefaultUser',
}

export type TUser = {
    userId: number;
    username: string;
    displayName: string;
    email: string;
    phoneNumber: string | null;
    profileImageUrl: string | null;
    bio: string | null;
    birthDate: string | null;
    createdAt: string;
    lastLoginAt: string | null;
    position: string | null;
    userType: EUserType;
};


export type TUserResponse = {
    user: TUser;
};