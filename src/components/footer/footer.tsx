import { MapLinks } from "../map-links/map-links"
import { SocialIconsBlock } from "../social-icons-block/social-icons-block"
import styles from './footer.module.scss'

export const Footer = () => {
  return (
    <div className={styles.footer}>
      {/* <MapLinks /> */}
      <SocialIconsBlock />
      <div className={styles.footer__copyright}>Copyright © 2024 Kerzolys Frontend. All rights reserved.</div>
    </div>
  )
}