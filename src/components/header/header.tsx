import { NavLink } from "react-router-dom"
import { Navbar } from "../navbar/navbar"
import styles from './header.module.scss'
import { useEffect, useState } from "react"
import classNames from "classnames"


export const Header = ({ onScroll }: { onScroll: (section: "about" | "calendar" | "media" | "gallery") => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768)

  // console.log(isMobile)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleMediaQuery = (evt: any) => setIsMobile(evt.matches)

    mediaQuery.addEventListener('change', handleMediaQuery)
    return () => mediaQuery.removeEventListener('change', handleMediaQuery)
  }, [])

  const handleMenuOpen = () => setIsMenuOpen(prev => !prev)

  return (
    <div className={classNames(styles.header, { [styles.header_mobile]: isMobile })}>
      <NavLink to='/'>
        <h2 className={styles.header__title}>Ivan<br /> Velikanov</h2>
      </NavLink>
      <Navbar onScroll={onScroll} onToggleMenu={handleMenuOpen} isOpen={isMenuOpen} isMobile={isMobile} />
    </div>
  )
}