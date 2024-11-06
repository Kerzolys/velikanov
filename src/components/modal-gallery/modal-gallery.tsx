import { ModalGalleryUI } from "components/ui/modal-gallery-ui/modal-gallery-ui"
import React from "react"
import { ModalGalleryProps } from "./type"

export const ModalGallery: React.FC<ModalGalleryProps> = ({ isModal }) => {
  return <ModalGalleryUI isModal={isModal} />
}