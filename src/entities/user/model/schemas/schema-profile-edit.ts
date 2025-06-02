import * as yup from "yup";
import { TUserUpdateDto } from "../types/t-user-update.dto";

export const schemaProfileEdit: yup.ObjectSchema<TUserUpdateDto> = yup.object({
  displayName: yup
    .string()
    .required("Имя обязательно")
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя не должно быть длиннее 50 символов"),
  email: yup
    .string()
    .transform(value => value === undefined ? null : value)
    .nullable()
    .defined()
    .max(64, "Email не может быть длиннее 64 символов")
    .email("Введите корректный email"),
  phoneNumber: yup
    .string()
    .transform(value => value === undefined ? null : value)
    .nullable()
    .defined()
    .matches(/^(\+7|8)?\d{10,11}$/, {
      excludeEmptyString: true,
      message: "Введите телефон в формате +79991234567 или 89991234567",
    }),
  bio: yup
    .string()
    .transform(value => value === undefined ? null : value)
    .nullable()
    .defined()
    .max(300, "Биография не может быть длиннее 300 символов"),
  birthDate: yup
    .string()
    .transform(value => value === undefined ? null : value)
    .nullable()
    .defined()
    .matches(/^\d{4}-\d{2}-\d{2}$/, {
      excludeEmptyString: true,
      message: "Введите корректную дату (ГГГГ-ММ-ДД)",
    }),
});
