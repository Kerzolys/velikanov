import { SliderImageUI } from "components/ui/slider-image-ui/slider-image-ui"
import { GalleryPhotoProps } from "./type"
import { ButtonUI } from "../ui/button-ui/button-ui"

import styles from './gallery-photo.module.scss'

export const GalleryPhoto: React.FC<GalleryPhotoProps> = ({ photo, onEdit, onRemove }) => {


  return (
    <div className={styles.galleryPhoto}>
      <div className={styles.galleryPhoto__image}>
      <SliderImageUI link={photo.link} title={photo.title} isAdmin={true} />
      </div>
      <div className={styles.galleryPhoto__buttons}>
        <ButtonUI buttonText="Delete" onClick={onRemove} />
        <ButtonUI buttonText="Edit" onClick={onEdit} />
      </div>
    </div>
  )
}