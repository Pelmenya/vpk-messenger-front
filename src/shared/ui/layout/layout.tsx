import { FC, ReactNode } from "react"
import { Header } from "./components/header"
import { Main } from "./components/main"
import { LayoutContainer } from "./components/layout-container"

export const Layout: FC<{ children: ReactNode; isViewHeader?: boolean; }> = ({ children, isViewHeader = true }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
    </LayoutContainer>
  )
}
