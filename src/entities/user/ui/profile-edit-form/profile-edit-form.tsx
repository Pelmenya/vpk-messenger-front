import { useAppDispatch } from "@/app/hooks"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom"
import {
  useLazyGetUserMeQuery,
  usePutUserMutation,
} from "@/entities/user/api/user-api"
import { setUser } from "@/entities/user/model/user-slice"
import { AUTH_KEY_STORAGE } from "@/app/auth-provider"
import { TUserUpdateDto } from "../../model/types/t-user-update.dto"
import { schemaProfileEdit } from "../../model/schemas/schema-profile-edit"
import { FormWithTitle } from "@/shared/ui/form-with-title/form-with-title"
import { InputField } from "@/shared/ui/input-field/input-field"
import { TNullable } from "@/shared/types/t-nullable"

export const ProfileEditForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [resError, setResError] = useState<TNullable<string>>(null)
  const [putUser, { isLoading: isSaving }] = usePutUserMutation()
  const [fetchUserMe, { isLoading: isProfileLoading }] = useLazyGetUserMeQuery()

  // Получаем токен из localStorage
  const token = (() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY_STORAGE)
      return stored ? JSON.parse(stored).token : null
    } catch {
      return null
    }
  })()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TUserUpdateDto>({
    resolver: yupResolver(schemaProfileEdit),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      displayName: "",
      email: null,
      phoneNumber: null,
      bio: null,
      birthDate: null,
    },
  })

  // Подгружаем профиль пользователя для автозаполнения
  useEffect(() => {
    if (!token) return
    fetchUserMe({ authKey: token })
      .unwrap()
      .then(data => {
        setValue("displayName", data.displayName || "")
        setValue("email", data.email || null)
        setValue("phoneNumber", data.phoneNumber || null)
        setValue("bio", data.bio || null)
        setValue(
          "birthDate",
          data.birthDate ? data.birthDate.slice(0, 10) : null,
        )
      })
      .catch(() => setResError("Не удалось загрузить профиль"))
  }, [token, fetchUserMe, setValue])

  const onSubmit = async (data: TUserUpdateDto) => {
    setResError(null)
    if (!token) {
      setResError("Нет авторизации")
      return
    }
    try {
      // Преобразуем пустые строки в null для nullable-полей
      const prepared: TUserUpdateDto = {
        ...data,
        email: data.email?.trim() === "" ? null : data.email,
        phoneNumber: data.phoneNumber?.trim() === "" ? null : data.phoneNumber,
        bio: data.bio?.trim() === "" ? null : data.bio,
        birthDate: data.birthDate?.trim() === "" ? null : data.birthDate,
      }
      const res = await putUser({ body: prepared, authKey: token }).unwrap()
      if (res) dispatch(setUser(res))
      navigate("/profile")
    } catch (error: any) {
      setResError(error?.data?.message || "Ошибка при сохранении")
    }
  }

  return (
    <FormWithTitle
      isLoading={isSaving || isProfileLoading}
      error={resError || ""}
      title="Редактирование профиля"
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText="Сохранить"
      formLink={{
        label: "Вернуться",
        href: "/profile",
        text: "Назад",
      }}
    >
      <InputField
        type="text"
        label="Имя в чате"
        placeholder="Ваше имя"
        register={register}
        name="displayName"
        error={errors.displayName?.message}
      />
      <InputField
        type="email"
        label="Почта"
        placeholder="Ваш email"
        register={register}
        name="email"
        error={errors.email?.message}
      />
      <InputField
        type="text"
        label="Телефон"
        placeholder="+79991234567"
        register={register}
        name="phoneNumber"
        error={errors.phoneNumber?.message}
      />
      <InputField
        type="text"
        label="Биография"
        placeholder="О себе"
        register={register}
        name="bio"
        error={errors.bio?.message}
        multiline
        maxLength={160}
      />
      <InputField
        type="date"
        label="Дата рождения"
        placeholder="Дата рождения"
        register={register}
        name="birthDate"
        error={errors.birthDate?.message}
      />
    </FormWithTitle>
  )
}
