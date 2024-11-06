import styles from './title-section-ui.module.scss'
import { TitleSectionUIProps } from './type'

export const TitleSectionUI: React.FC<TitleSectionUIProps> = ({ title }) => {
  return (
    <div className={styles.titleSection}>
      <h2>{title}</h2>
    </div>
  )
}