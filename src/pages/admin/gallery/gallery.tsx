import { GalleryPhoto } from "admin/components/gallery-photo/gallery-photo"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { ModalGalleryPhoto } from "admin/components/ui/modal-gallery-photo/modal-gallery-photo"
import { Modal } from "components/modal/modal"
import { gallerySelector, uploadPhoto } from "features/gallerySlice/gallerySlice"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "services/store/store"

export const AdminGallery = () => {
  const { gallery } = useSelector(gallerySelector)
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState({
    title: '',
  })
  const [file, setFile] = useState<File | null>(null);
  console.log(gallery)

  const dispatch = useDispatch()

  const handleAdd = () => setIsOpen(true)
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = evt.target
    console.log(name, value, files)
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
    if (files) setFile(files ? files[0] : null)
    console.log(file)
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (file) {
      dispatch(uploadPhoto({ ...values, file }))
    }
    setIsOpen(false)
    setValues({title: ''})
    setFile(null)
  }
  const navigate = useNavigate()

  const handleBack = () => {
    // console.log('changes saved')
    navigate('/admin')
  }

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <h1>gallery</h1>
      {gallery.length > 0 ?
        gallery.map(photo => {
          return (
            <div key={photo.id}>
              <GalleryPhoto photo={photo} />
              <p>{photo.title}</p>
            </div>
          )
        }) : <h2>There are no photos <br /> Please add some</h2>
      }
      <ButtonUI type='button' buttonText="Add photo" onClick={handleAdd} />
      <ButtonUI type='submit' buttonText="Back" onClick={handleBack} />
      {isOpen &&
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalGalleryPhoto
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Modal>
      }
    </>
  )
}