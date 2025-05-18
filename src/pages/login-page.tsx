import type { FC } from "react"
import { Layout } from "../shared/ui/layout/layout"
import { FormWrapper } from "../shared/ui/form-wrapper/from-wrapper"
import { LoginForm } from "../features/auth/ui/login-form"

export const LoginPage: FC = () => {
  return (
    <Layout>
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </Layout>
  )
}
