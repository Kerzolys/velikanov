import { TVideo } from '../../../services/types'
import styles from './media-video-ui.module.scss'

export const MediaVideoUI: React.FC<Partial<TVideo>> = ({ url, title }, isHomePage: boolean) => {
  const embedUrl = url?.replace('youtu.be/', 'www.youtube.com/embed/').split('?')[0]
  return (
    <div className={styles.mediaVideoBlock}>
      <iframe width="500" height="310" src={embedUrl} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      {isHomePage ? <h2>{title}</h2> : null}
    </div>
  )
}