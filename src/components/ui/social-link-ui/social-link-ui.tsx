import { NavLink } from 'react-router-dom'
import styles from './social-link-ui.module.scss'
import { SocialLinkUIProps } from './type'
import classNames from 'classnames'

export const SocialLinkUI: React.FC<SocialLinkUIProps> = ({ icon, label, path, isHomePage }) => {
  return (
    <NavLink className={classNames(styles.icon__container, { [styles.icon__container_dark]: !isHomePage })} to={path} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={label} />
    </NavLink>
  )
}