import { MediaVideo } from "admin/components/media-video/media-video"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { ModalMediaVideo } from "admin/components/ui/modal-media-video/modal-media-video"
import { Modal } from "components/modal/modal"

import { addVideo, mediaSelector } from "features/mediaSlice/mediaSlice"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "services/store/store"

export const AdminMedia = () => {
  const { videos } = useSelector(mediaSelector)
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState({
    url: '',
    title: '',
  })

  const dispatch = useDispatch()

  const handleAdd = () => setIsOpen(true)
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    dispatch(addVideo(values))
    setIsOpen(false)
  }
  const navigate = useNavigate()

  const handleBack = () => {
    // console.log('changes saved')
    navigate('/admin')
  }

  const handleClose = () => setIsOpen(false)



  console.log(videos)
  return (
    <>
      <h1>media</h1>
      {videos.length > 0 ? videos.map(video => {
        return <MediaVideo key={video.id} video={video} />
      }) : <h2>There are no videos to edit.<br></br>Add some new!</h2>}
      <ButtonUI type='button' buttonText="Add video" onClick={handleAdd} />
      <ButtonUI type='submit' buttonText="Back" onClick={handleBack} />
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