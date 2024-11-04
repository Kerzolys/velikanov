import { FooterProps } from "./type"
import styles from './footer.module.scss'
import classNames from "classnames"
import { MapLinks } from "../map-links/map-links"
import { SocialIconsBlock } from "../social-icons-block/social-icons-block"

export const Footer: React.FC<FooterProps> = ({isHomePage}) => {
  return (
    <div className={classNames(styles.footer, {[styles.footer_dark]: !isHomePage})}>
      <MapLinks isHomePage={isHomePage} />
      <SocialIconsBlock isHomePage={isHomePage} />
      <div className={styles.footer__copyright}>Copyright © 2024 Kerzolys Frontend. All rights reserved.</div>
    </div>
  )
}