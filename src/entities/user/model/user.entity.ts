import { TNullable } from "@/shared/types/t-nullable";

export enum EUserType {
    Admin = 'Admin',
    DefaultUser = 'DefaultUser',
}

export type TUser = {
    userId: number;
    username: string;
    displayName: string;
    email: string;
    phoneNumber: TNullable<string>;
    profileImageUrl: TNullable<string>;
    bio: TNullable<string>;
    birthDate: TNullable<string>;
    createdAt: string;
    lastLoginAt: TNullable<string>;
    position: TNullable<string>;
    userType: EUserType;
};


export type TUserResponse = {
    user: TUser;
};