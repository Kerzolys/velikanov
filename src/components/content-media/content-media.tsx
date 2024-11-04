import { testVideos } from '../../utils/testVideos'
import { MediaVideoUI } from '../ui/media-video-ui/media-video-ui'
import styles from './content-media.module.scss'

export const ContentMedia = () => {
  return (
    <div className={styles.mediaContainer}>
    {testVideos.length > 0 ? testVideos.map(video => {
      return <MediaVideoUI url={video.url} title={video.title} />
    }) : <h2>There will be soon some videos</h2>}
    </div>
  )
}