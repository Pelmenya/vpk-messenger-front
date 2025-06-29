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
    positionName: TNullable<string>;
    userType: { typeId: number; typeName: EUserType };
};


export type TUserResponse = {
    user: TUser;
};