import { forwardRef, useRef } from 'react'
import { TitleSectionUI } from '../ui/title-section-ui/title-section-ui'
import styles from './content-section.module.scss'
import { ContentSectionProps } from './type'

export const ContentSection = forwardRef<HTMLDivElement, ContentSectionProps>(({ title, children,  }, ref) => {
  // ref = useRef<HTMLDivElement | null>(null)
  return (
    <div ref={ref} className={styles.contentSection}>
      <TitleSectionUI title={title} />
      {children}
    </div>
  )
})