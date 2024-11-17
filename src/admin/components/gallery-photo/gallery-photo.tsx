import { SliderImageUI } from "components/ui/slider-image-ui/slider-image-ui"
import { GalleryPhotoProps } from "./type"
import { ButtonUI } from "../ui/button-ui/button-ui"
import { useDispatch } from "services/store/store"
import { removePhoto } from "features/gallerySlice/gallerySlice"

export const GalleryPhoto: React.FC<GalleryPhotoProps> = ({ photo }) => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(removePhoto(photo))
  }

  return (
    <>
      <SliderImageUI link={photo.link} title={photo.title} isAdmin={true} />
      <ButtonUI buttonText="Delete" onClick={handleDelete}/>
    </>
  )
}