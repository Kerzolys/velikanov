import styles from './cover-section.module.scss'
import { CoverSectionProps } from './type'

export const CoverSection: React.FC<CoverSectionProps> = ({gradient, image}) => {
  return (
    <div className={styles.coverSection} style={{ backgroundImage: `linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2}, ${gradient.color3}, ${gradient.color4} )` }}>
      <img src={image} alt="cover photo" />
    </div>
  )
}