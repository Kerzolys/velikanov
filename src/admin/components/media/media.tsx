import { MediaVideo } from "admin/components/media-video/media-video"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { ButtonUIProps } from "admin/components/ui/button-ui/type"
import { InputUIProps } from "admin/components/ui/input-ui/type"
import { Modal } from "components/modal/modal"
import { useForm } from 'features/hooks/useForm'
import { addVideo, editVideo, mediaSelector, removeVideo } from "features/mediaSlice/mediaSlice"
import { useCallback, useEffect, useMemo, useState } from "react"
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
  const [error, setError] = useState<{ url: string }>({ url: '' })

  const dispatch = useDispatch()

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const validate = () => {
    const newErrors = { url: '' }
    if (!values.url) newErrors.url = 'URL is required'

    setError(newErrors)
    return !newErrors.url
  }

  useEffect(() => {
    validate()
  }, [values])

  const handleAdd = useCallback(() => {
    handleOpen()
    setModalType('add')
    setValues({
      url: "",
      title: "",
    });
  }, [handleOpen, setModalType, setValues])

  const handleEdit = useCallback((video: TVideo) => {
    handleOpen();
    setModalType("edit");
    setCurrentVideoId(video.id || null);
    setValues({
      ...video,
    });
  }, [handleOpen, setModalType, setCurrentVideoId, setValues]);

  const handleSubmit = useCallback((evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (validate()) {
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

  }, [values, modalType, currentVideoId, dispatch, loading, setIsOpen, setValues])

  const handleRemove = useCallback((video: TVideo) => {
    dispatch(removeVideo(video))
  }, [dispatch])



  const inputs = useMemo<InputUIProps[]>(() => [
    {
      name: "url",
      type: "text",
      placeholder: "URL",
      error: error.url,
    },
    {
      name: "title",
      type: "text",
      placeholder: "Title",
    }
  ], [error])

  const buttons = useMemo<ButtonUIProps[]>(() => [
    {
      buttonText: "Save",
      onSubmit: handleSubmit,
      type: "submit" as 'submit',
      disabled: values.url.trim() === "",
    },
    {
      buttonText: 'Cancel',
      onClick: handleClose,
      type: 'button' as 'button'
    }
  ], [values, handleSubmit, handleClose])

  const memoizedValues = useMemo(() => values, [values]);
  const memoizedHandleChange = useCallback(handleChange, []);
  const memoizedHandleSubmit = useCallback(handleSubmit, [values, modalType, currentVideoId]);

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
        <Modal key={modalType} isOpen={isOpen} onClose={handleClose}>
          <ModalContentUI
            inputs={inputs}
            buttons={buttons}
            values={memoizedValues}
            onChange={memoizedHandleChange}
            onSubmit={memoizedHandleSubmit}
            onClose={handleClose}
            formHeader='Add video'
            formName='add-video'
          />
        </Modal>
        :
        <Modal key={modalType} isOpen={isOpen} onClose={handleClose}>
          <ModalContentUI
            inputs={inputs}
            buttons={buttons}
            values={memoizedValues}
            onChange={memoizedHandleChange}
            onSubmit={memoizedHandleSubmit}
            onClose={handleClose}
            formHeader='Edit video'
            formName='edit-video'
          />
        </Modal>
      }
    </div>
  )
}