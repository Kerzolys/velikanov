import { TImage } from "services/types"

export type ModalGalleryPhotoProps = {
  values: Partial<TImage>
  onChange: (evt:React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}