import { MediaVideo } from "admin/components/media-video/media-video"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { ButtonUIProps } from "admin/components/ui/button-ui/type"
import { InputUIProps } from "admin/components/ui/input-ui/type"
import { Modal } from "components/modal/modal"
import { useForm } from 'features/hooks/useForm'
import { addVideo, editVideo, mediaSelector, removeVideo } from "features/mediaSlice/mediaSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "services/store/store"
import { TVideo } from 'services/types'
import { ModalContentUI } from '../ui/modal-content-ui/modal-content-ui'

import styles from './media.module.scss'
import { PreloaderUI } from "components/ui/preloader-ui/preloader"

export const Media = () => {
  const { videos, loading } = useSelector(mediaSelector)
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const { values, setValues, handleChange } = useForm<TVideo>({ url: '', title: '' })

  const dispatch = useDispatch()

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleAdd = () => {
    handleOpen()
    setModalType('add')
    setValues({
      url: "",
      title: "",
    });
  }

  const handleEdit = (video: TVideo) => {
    setIsOpen(true);
    setModalType("edit");
    setCurrentVideoId(video.id || null);
    setValues({
      ...video,
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (modalType === "add") {
      dispatch(addVideo(values))
    } else if (modalType === "edit" && currentVideoId) {
      dispatch(editVideo(values))
    }
    handleClose()
    setValues({
      url: "",
      title: "",
    })
  }

  const handleRemove = (video: TVideo) => {
    dispatch(removeVideo(video))
  }



  const inputs: InputUIProps[] = [
    {
      name: "url",
      type: "text",
      placeholder: "URL",
    },
    {
      name: "title",
      type: "text",
      placeholder: "Title",
    }
  ]

  const buttons: ButtonUIProps[] = [
    {
      buttonText: "Save",
      onClick: () => { },
      type: "submit" as 'submit',
    },
    {
      buttonText: 'Cancel',
      onClick: () => { },
      type: 'button' as 'button'
    }
  ]

  return (
    <div className={styles.mediaContainer}>
      <ButtonUI type='button' buttonText="Add video" onClick={handleAdd} />
      {loading && <PreloaderUI />}
      {videos.length > 0 ? videos.map(video => {
        return <MediaVideo key={video.id} video={video} 
        onEdit={() => handleEdit(video)} 
        onRemove={() => handleRemove(video)} />
      }) : <h2>There are no videos to edit.<br />Add some new!</h2>}

      {isOpen && modalType === 'add' ?
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalContentUI
            inputs={inputs}
            buttons={buttons}
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={handleClose}
            formHeader='Add video'
            formName='add-video'
          />
        </Modal>
        :
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalContentUI
            inputs={inputs}
            buttons={buttons}
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={handleClose}
            formHeader='Edit video'
            formName='edit-video'
          />
        </Modal>
      }
    </div>
  )
}