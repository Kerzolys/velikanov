import { MediaVideoUI } from "components/ui/media-video-ui/media-video-ui"
import { MediaVideoProps } from "./type"
import { useState } from "react"
import { Modal } from "components/modal/modal"
import { useDispatch } from "services/store/store"
import { editVideo, removeVideo } from "features/mediaSlice/mediaSlice"
import { ButtonUI } from "../ui/button-ui/button-ui"

import styles from './media-video.module.scss'

export const MediaVideo: React.FC<MediaVideoProps> = ({ video, onEdit, onRemove }) => {
  return (
    <div className={styles.mediaVideo}>
      <MediaVideoUI video={video} />
      <div className={styles.mediaVideo__buttons}>
        <ButtonUI buttonText="Edit" onClick={onEdit} />
        <ButtonUI buttonText="Delete" onClick={onRemove} />
      </div>
    </div>
  )
}