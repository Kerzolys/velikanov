import { testVideos } from '../../utils/testVideos'

import { MediaVideoUI } from '../ui/media-video-ui/media-video-ui'
import { TitleSectionUI } from '../ui/title-section-ui/title-section-ui'
import styles from './home-media.module.scss'

export const HomeMedia = () => {
  const shuffledVideos = testVideos.sort(() => .5 - Math.random()).slice(0,2)

  return (
    <div className={styles.homeMedia}>
      <TitleSectionUI title="Media" />
      <div className={styles.homeMedia__videosBlock}>
      {shuffledVideos.map(video => {
        return <MediaVideoUI url={video.url} title={video.title}/>
      })}
      </div>
    </div>
  )
}