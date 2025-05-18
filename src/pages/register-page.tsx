import type { FC } from "react"
import { RegisterForm } from "../features/auth/ui/register-form"
import { Layout } from "../shared/ui/layout/layout"
import { FormWrapper } from "../shared/ui/form-wrapper/from-wrapper"

export const RegisterPage: FC = () => {
  return (
    <Layout>
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    </Layout>
  )
}
