import * as yup from "yup"
import { TChatCreateDto } from "../types/t-chat-create.dto"

export const schemaChatCreate: yup.ObjectSchema<TChatCreateDto> = yup.object({
  name: yup.string()
    .required("Название обязательно")
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов"),
})
