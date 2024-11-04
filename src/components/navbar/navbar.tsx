import { NavLink, useLocation } from "react-router-dom"
import { ButtonNavbar } from "../button/button-navbar"
import styles from './navbar.module.scss'

export const Navbar = () => {
  const location = useLocation()

  return (
    <div className={styles.navbar}>
      <NavLink to='/about'>
        <ButtonNavbar buttonText="Biography" type='button' isActive={location.pathname === '/about'} />
      </NavLink>
      <NavLink to='/calendar'>
        <ButtonNavbar buttonText="Calendar" type='button' isActive={location.pathname === '/calendar'} />
      </NavLink>
      <NavLink to='/media'>
        <ButtonNavbar buttonText="Media" type='button' isActive={location.pathname === '/media'} />
      </NavLink>
      <NavLink to='/contact'>
        <ButtonNavbar buttonText="Contact" type='button' isActive={location.pathname === '/contact'} />
      </NavLink>
    </div>
  )
}