import { useLocation } from "react-router-dom"
import { ButtonNavbar } from "../button/button-navbar"
import styles from './navbar.module.scss'
import { useEffect, useState } from "react"
import classNames from "classnames"

export const Navbar = ({ onScroll }: { onScroll: (section: "about" | "calendar" | "media" | "gallery") => void }) => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768)

  console.log(isMobile)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleMediaQuery = (evt:any) => setIsMobile(evt.matches)

    mediaQuery.addEventListener('change', handleMediaQuery)
    return () => mediaQuery.removeEventListener('change', handleMediaQuery)
  }, [])

  return (
    <div className={classNames({[styles.navbar]: !isMobile, [styles.navbar_mobile]: isMobile})}>
      <ButtonNavbar buttonText="Biography" type='button' onClick={() => onScroll('about')} />
      <ButtonNavbar buttonText="Calendar" type='button' onClick={() => onScroll('calendar')} />
      <ButtonNavbar buttonText="Media" type='button' onClick={() => onScroll('media')} />
      <ButtonNavbar buttonText="Gallery" type='button' onClick={() => onScroll('gallery')} />
    </div>
  )
}