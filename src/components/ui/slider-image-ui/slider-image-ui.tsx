import classNames from 'classnames'
import { TImage } from '../../../services/types'
import styles from './slider-image-ui.module.scss'
import { ISliderImageProps } from './type'


export const SliderImageUI: React.FC<ISliderImageProps> = ({ link, title, index, currentIndex }) => {
  const isActive = index === currentIndex

  return (
    <div className={styles.sliderImage}>
      <img src={link} alt={title} className={classNames(styles.sliderImage_active, { [styles.sliderImage_closed]: !isActive })} />
    </div>
  )
}