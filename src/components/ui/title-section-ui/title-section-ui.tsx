import styles from './title-section-ui.module.scss'
import { TitleSectionUIProps } from './type'

export const TitleSectionUI: React.FC<TitleSectionUIProps> = ({ title }) => {
  return (
    <div className={styles.titleSection}>
      <h1>{title}</h1>
    </div>
  )
}