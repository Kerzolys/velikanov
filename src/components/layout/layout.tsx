import { useLocation } from "react-router-dom"
import { Footer } from "../footer/footer"
import { Header } from "../header/header"
import { LayoutProps } from "./type"

export const Layout: React.FC<LayoutProps> = ({children}) => {
  const location = useLocation()
  return (
    <div className="layout">
      <Header />
      {children}
      <Footer isHomePage={location.pathname === '/'} />
    </div>
  )
}