import { ButtonNavbar } from "../button/button-navbar"
import classNames from "classnames"
import { NavbarProps } from "./type"

import styles from './navbar.module.scss'


export const Navbar: React.FC<NavbarProps> = ({ onScroll, onToggleMenu, isOpen, isMobile }) => {
  const mobileMenuClass = classNames(styles.navbar__content_mobile, {
    [styles.navbar__content_mobile_opened]: isMobile && isOpen,
    // [styles.navbar__content_mobile_closed]: isMobile && !isOpen,
  });
  console.log(isOpen, isMobile)

  return (
    <div className={classNames({ [styles.navbar]: !isMobile, [styles.navbar_mobile]: isMobile })} onClick={onToggleMenu}>
      {(!isMobile || isOpen) && (
        <div  className={classNames(styles.navbar__content, {
          [mobileMenuClass]: isMobile,
        })}>
          <ButtonNavbar buttonText="Biography" type='button' onClick={() => onScroll('about')} />
          <ButtonNavbar buttonText="Calendar" type='button' onClick={() => onScroll('calendar')} />
          <ButtonNavbar buttonText="Media" type='button' onClick={() => onScroll('media')} />
          <ButtonNavbar buttonText="Gallery" type='button' onClick={() => onScroll('gallery')} />
        </div>
      )}
    </div>
  )
}