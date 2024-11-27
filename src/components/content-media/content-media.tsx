import { useSelector } from 'services/store/store'
import { MediaVideoUI } from '../ui/media-video-ui/media-video-ui'
import { mediaSelector } from 'features/mediaSlice/mediaSlice'

import styles from './content-media.module.scss'

export const ContentMedia = () => {
  const { videos } = useSelector(mediaSelector)
  return (
    <div className={styles.mediaContainer}>
      {videos.length > 0 ? videos.map(video => {
        return <MediaVideoUI video={video} key={video.id} />
      }) : <h2>There will be soon some videos</h2>}
    </div>
  )
}