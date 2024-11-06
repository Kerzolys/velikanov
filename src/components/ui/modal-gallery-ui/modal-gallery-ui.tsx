import { ContentGallery } from 'components/content-gallery/content-gallery'
import styles from './modal-gallery-ui.module.scss'
import { Slider } from 'components/slider/slider'
import { ModalGalleryUIProps } from './type'

export const ModalGalleryUI: React.FC<ModalGalleryUIProps> = ({ isModal }) => {
  // return <ContentGallery />
  return <Slider isModal={isModal} />
}