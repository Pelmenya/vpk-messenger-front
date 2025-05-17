import type { FC } from "react"
import { RegisterForm } from "../features/auth/ui/register-form/register-form"
import { Layout } from "../shared/ui/layout/layout"

export const RegisterPage: FC = () => {
  return (
    <Layout>
      <div className="w-full h-full flex items-center justify-center">
        <div className="min-w-md h-full pt-36">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  )
}
