import type { FC } from "react"
import { RegisterForm } from "../features/auth/ui/register-form/register-form"
import { Layout } from "../shared/ui/layout/layout"

export const RegisterPage: FC = () => {
  return (
    <Layout>
      <div className="w-full h-full flex items-center justify-center">
        <div className="min-w-md bg-base-100 rounded-2xl p-8">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  )
}
