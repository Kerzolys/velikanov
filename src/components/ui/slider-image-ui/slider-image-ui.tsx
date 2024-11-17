import classNames from 'classnames'
import { TImage } from '../../../services/types'
import styles from './slider-image-ui.module.scss'
import { ISliderImageProps } from './type'


export const SliderImageUI: React.FC<ISliderImageProps> = ({ link, title, index, currentIndex, onClick, isAdmin }) => {
  const isActive = index === currentIndex

  return (
    <div className={styles.sliderImage} key={index} >
      <img
        onClick={onClick}
        src={link}
        alt={title}
        className={classNames({ [styles.sliderImage_active]: isActive, [styles.sliderImage_closed]: !isActive, [styles.sliderImage_admin]: isAdmin})}
      />
    </div>
  )
}