import { TImage } from "services/types"

export type GalleryPhotoProps = {
  photo: TImage
  onEdit: () => void
  onRemove: () => void
}