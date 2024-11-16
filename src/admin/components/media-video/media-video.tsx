import { MediaVideoUI } from "components/ui/media-video-ui/media-video-ui"
import { MediaVideoProps } from "./type"
import { useState } from "react"
import { Modal } from "components/modal/modal"
import { ModalMediaVideo } from "../ui/modal-media-video/modal-media-video"
import { useDispatch } from "services/store/store"
import { editVideo, removeVideo } from "features/mediaSlice/mediaSlice"
import { ButtonUI } from "../ui/button-ui/button-ui"

export const MediaVideo: React.FC<MediaVideoProps> = ({ video }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState(video)

  const dispatch = useDispatch()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    dispatch(editVideo(values))
    handleClose()
  }

  const handleRemove = () => {
    dispatch(removeVideo(video))
  }

  const handleOpen = () => setIsOpen(true)

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <MediaVideoUI video={video} onClick={handleOpen} />
      <ButtonUI buttonText="Delete" onClick={handleRemove} />
      {isOpen &&
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalMediaVideo
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Modal>
      }
    </>
  )
}