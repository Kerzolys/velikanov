import { TVideo } from '../../../services/types'
import styles from './media-video-ui.module.scss'
import { MediaVideoUIProps } from './type'

export const MediaVideoUI: React.FC<MediaVideoUIProps> = ({ video, onClick }, isHomePage: boolean) => {
  const embedUrl = video.url?.replace('youtu.be/', 'www.youtube.com/embed/').split('?')[0]
  return (
    <div className={styles.mediaVideoBlock} onClick={onClick}>
      <iframe width="500" height="310" src={embedUrl}  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}