import { useSelector } from 'services/store/store'
import { testVideos } from '../../utils/testVideos'
import { MediaVideoUI } from '../ui/media-video-ui/media-video-ui'
import styles from './content-media.module.scss'
import { mediaSelector } from 'features/mediaSlice/mediaSlice'

export const ContentMedia = () => {
  const {videos} = useSelector(mediaSelector)
  return (
    <div className={styles.mediaContainer}>
    {videos.length > 0 ? videos.map(video => {
      return <MediaVideoUI video={video} />
    }) : <h2>There will be soon some videos</h2>}
    </div>
  )
}