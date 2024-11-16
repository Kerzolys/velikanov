import styles from './bio-paragraph-ui.module.scss'
import { BioParagraphUIProps } from './type'

export const BioParagraphUI: React.FC<BioParagraphUIProps> = ({ text, onClick }) => {
  return (
    <p className={styles.bioParagraph} onClick={onClick}>{text}</p>
  )
}