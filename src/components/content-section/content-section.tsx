import { TitleSectionUI } from '../ui/title-section-ui/title-section-ui'
import styles from './content-section.module.scss'
import { ContentSectionProps } from './type'

export const ContentSection: React.FC<ContentSectionProps> = ({title, children}) => {
  return (
    <div className={styles.contentSection}>
      <TitleSectionUI title={title} />
      {children}
    </div>
  )
}