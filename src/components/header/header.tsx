import { NavLink } from "react-router-dom"
import { Navbar } from "../navbar/navbar"
import styles from './header.module.scss'

export const Header = () => {
  return (
    <div className={styles.header}>
      <NavLink to='/'>
        <h2 className={styles.header__title}>Ivan<br /> Velikanov</h2>
      </NavLink>
      <Navbar />
    </div>
  )
}