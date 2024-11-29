import { GalleryPhoto } from "admin/components/gallery-photo/gallery-photo"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { Modal } from "components/modal/modal"
import { PreloaderUI } from "components/ui/preloader-ui/preloader"
import { gallerySelector, removePhoto, uploadPhoto } from "features/gallerySlice/gallerySlice"
import { useForm } from "features/hooks/useForm"
import { useState } from "react"
import { useDispatch, useSelector } from "services/store/store"
import { TImage } from "services/types"
import { ModalContentUI } from "../ui/modal-content-ui/modal-content-ui"
import { InputUIProps } from "../ui/input-ui/type"

import styles from './gallery.module.scss'

export const Gallery = () => {
  const { gallery, loading } = useSelector(gallerySelector)
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [currentPhotoId, setCurrentPhotoId] = useState<string | null>(null);
  const { values, setValues, file, setFile, handleChange } = useForm<Omit<TImage, 'link'>>({ title: '' })

  const dispatch = useDispatch()
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleAdd = () => {
    handleOpen()
    setModalType('add')
    setValues({
      title: "",
    });
  }

  const handleEdit = (photo: TImage) => {
    setIsOpen(true);
    setModalType("edit");
    setCurrentPhotoId(photo.id || null);
    setValues({
      ...photo,
      id: photo.id
    });
  };

  const handleRemove = (photo: TImage) => {
    dispatch(removePhoto(photo))
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (file) {
      if (modalType === "add") {
        dispatch(uploadPhoto({ ...values, file }))
      } else if (modalType === "edit" && currentPhotoId) {
        dispatch(uploadPhoto({ ...values, file, }))
      }
    }
    setIsOpen(false)
    setValues({ title: '' })
    setFile(null)
  }

  const inputs: InputUIProps[] = [
    {
      name: "file",
      type: "file",
      placeholder: "File",
      accept: "image/*",
    },
    {
      name: "title",
      type: "text",
      placeholder: "Title",
    }
  ]
  const buttons = [
    {
      buttonText: "Save",
      onClick: () => { },
      type: "submit" as 'submit',
    },
    {
      buttonText: 'Cancel',
      type: 'button' as 'button'
    }
  ]



  return (
    <div className={styles.galleryContainer}>
      <ButtonUI type='button' buttonText="Add photo" onClick={handleAdd} />
      {loading && <PreloaderUI />}
      {gallery.length > 0 ?
        gallery.map(photo => {
          return (
            <div key={photo.id}>
              <GalleryPhoto 
              photo={photo}
              onEdit={() => handleEdit(photo)}
              onRemove={() => handleRemove(photo)}
              />
              <p>{photo.title}</p>
            </div>
          )
        }) : <h2>There are no photos <br /> Please add some</h2>
      }

      {isOpen && modalType === "add" ?
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalContentUI
            inputs={inputs}
            buttons={buttons}
            formHeader="Add photo"
            formName="addPhoto"
            onSubmit={handleSubmit}
            values={values}
            onChange={handleChange}
            onClose={handleClose}
          />
        </Modal >
        :
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalContentUI
            inputs={inputs}
            buttons={buttons}
            formHeader="Edit photo"
            formName="editPhoto"
            onSubmit={handleSubmit}
            values={values}
            onChange={handleChange}
            onClose={handleClose}
          />
        </Modal >
      }
    </div>
  )
}