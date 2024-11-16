import { useSelector } from 'services/store/store'
import { TitleSectionUI } from '../ui/title-section-ui/title-section-ui'
import styles from './bio-content.module.scss'
import { bioSelector } from 'features/bioSlice/bioSlice'
import { BioParagraphUI } from 'components/ui/bio-paragraph-ui/bio-paragraph-ui'

export const BioContent = () => {
  const { bio } = useSelector(bioSelector)
  // const sortedBio = [...bio].sort((a,b) => a.position - b.position)
  return (
    <div className={styles.bio}>
      {bio
        .map(bio => {
          return <BioParagraphUI key={bio.id} text={bio.text}/>
        })}
    </div>
  )
}