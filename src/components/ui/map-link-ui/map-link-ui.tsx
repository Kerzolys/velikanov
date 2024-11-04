import { NavLink } from "react-router-dom"
import { MapLinkUIProps } from "./type"

import styles from './map-link-ui.module.scss'
import classNames from "classnames"

export const MapLink: React.FC<MapLinkUIProps> = ({ path, title, isHomePage }) => {
  return (
    <NavLink className={classNames(styles.mapLink, { [styles.mapLink_dark]: !isHomePage })} to={path}>{title}</NavLink>
  )
}