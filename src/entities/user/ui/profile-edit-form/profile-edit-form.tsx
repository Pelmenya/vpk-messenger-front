import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  useLazyGetUserMeQuery,
  usePutUserMutation,
} from "@/entities/user/api/user-api"
import { setUser } from "@/entities/user/model/user-slice"
import { TUserUpdateDto } from "../../model/types/t-user-update.dto"
import { schemaProfileEdit } from "../../model/schemas/schema-profile-edit"
import { FormWithTitle } from "@/shared/ui/form-with-title/form-with-title"
import { InputField } from "@/shared/ui/input-field/input-field"
import { TNullable } from "@/shared/types/t-nullable"
import { getToken } from "@/features/auth/model/auth-selectors"

export const ProfileEditForm = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(getToken);

  const [resError, setResError] = useState<TNullable<string>>(null)
  const [putUser, { isLoading: isSaving }] = usePutUserMutation()
  const [fetchUserMe, { isLoading: isProfileLoading }] = useLazyGetUserMeQuery()

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
    const fetchProfile = async () => {
      if (!token) return
      try {
        const data = await fetchUserMe({ authKey: token }).unwrap()
        setValue("displayName", data.displayName || "")
        setValue("email", data.email || null)
        setValue("phoneNumber", data.phoneNumber || null)
        setValue("bio", data.bio || null)
        setValue("birthDate", data.birthDate ? data.birthDate.slice(0, 10) : null)
      } catch {
        setResError("Не удалось загрузить профиль")
      }
    }
    fetchProfile()
  }, [token, fetchUserMe, setValue])

  const onSubmit = async (data: TUserUpdateDto) => {
    setResError(null)
    if (!token) {
      setResError("Нет авторизации")
      return
    }
    try {
      await putUser({ body: data, authKey: token }).unwrap()
      // После успешного обновления профиля — получаем свежую версию профиля
      const actualUser = await fetchUserMe({ authKey: token }).unwrap()
      dispatch(setUser(actualUser))
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
