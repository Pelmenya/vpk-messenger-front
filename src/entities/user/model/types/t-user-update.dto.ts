import { TNullable } from "@/shared/types/t-nullable";

export type TUserUpdateDto = {
    displayName: string;
    email: TNullable<string>;
    phoneNumber: TNullable<string>;
    bio: TNullable<string>;
    birthDate: TNullable<string>;
}