import { Footer } from "../footer/footer"
import { Header } from "../header/header"
import { LayoutProps } from "./type"

export const Layout: React.FC<LayoutProps> = ({ children, onScroll }) => {
  return (
    <div className="layout">
      <Header onScroll={onScroll} />
      {children}
      <Footer />
    </div>
  )
}