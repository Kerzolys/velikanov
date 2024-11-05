import { useLocation } from "react-router-dom"
import { ButtonNavbar } from "../button/button-navbar"
import styles from './navbar.module.scss'

export const Navbar = ({ onScroll }: { onScroll: (section: "about" | "calendar" | "media" | "gallery") => void }) => {
  const location = useLocation()

  return (
    <div className={styles.navbar}>
      <ButtonNavbar buttonText="Biography" type='button' isActive={location.pathname === '/about'} onClick={() => onScroll('about')} />
      <ButtonNavbar buttonText="Calendar" type='button' isActive={location.pathname === '/calendar'} onClick={() => onScroll('calendar')} />
      <ButtonNavbar buttonText="Media" type='button' isActive={location.pathname === '/media'} onClick={() => onScroll('media')} />
      <ButtonNavbar buttonText="Gallery" type='button' isActive={location.pathname === '/contact'} onClick={() => onScroll('gallery')} />
    </div>
  )
}