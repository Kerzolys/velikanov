import { MediaVideoUI } from "components/ui/media-video-ui/media-video-ui"
import { MediaVideoProps } from "./type"
import React from "react"
import { ButtonUI } from "../ui/button-ui/button-ui"

import styles from './media-video.module.scss'

export const MediaVideo: React.FC<MediaVideoProps> = React.memo(({ video, onEdit, onRemove }) => {
  return (
    <div className={styles.mediaVideo}>
      <MediaVideoUI video={video} />
      <div className={styles.mediaVideo__buttons}>
        <ButtonUI buttonText="Edit" onClick={onEdit} />
        <ButtonUI buttonText="Delete" onClick={onRemove} />
      </div>
    </div>
  )
})