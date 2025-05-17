import type { FC } from "react"
import { RegisterForm } from "../../features/auth/ui/register-form/register-form"

export const RegisterPage: FC = () => {

  return (
    <div className="w-full h-full flex items-center justify-center">
        <div className="min-w-md max-h-[50%]">
        <RegisterForm />
        </div>
    </div>
  )
}
