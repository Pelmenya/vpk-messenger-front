import { FC, ReactNode } from "react"
import { Header } from "../../../widgets/header/header"
import { Main } from "./components/main"
import { LayoutContainer } from "./components/layout-container"

export const Layout: FC<{ children: ReactNode; isViewHeader?: boolean }> = ({
  children,
  isViewHeader = true,
}) => {
  return (
    <LayoutContainer>
      {isViewHeader && <Header />}
      <Main>{children}</Main>
    </LayoutContainer>
  )
}
