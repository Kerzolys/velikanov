import { MapLink } from '../ui/map-link-ui/map-link-ui'
import styles from './map-links.module.scss'
import { MapLinksProps } from './type'

export const MapLinks: React.FC<MapLinksProps> = ({ isHomePage }) => {
  return (
    <div className={styles.mapLinks}>
      <MapLink isHomePage={isHomePage} path='/' title='Home' />
      <MapLink isHomePage={isHomePage} path='/about' title='Biography' />
      <MapLink isHomePage={isHomePage} path='/calendar' title='Calendar' />
      <MapLink isHomePage={isHomePage} path='/media' title='Media' />
      <MapLink isHomePage={isHomePage} path='/contact' title='Contact' />
    </div>
  )
}