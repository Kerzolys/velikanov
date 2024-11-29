import { BioParagraph } from "admin/components/bio-paragraph/bio-paragraph"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { Modal } from "components/modal/modal"
import { addBioText, bioSelector, editBioText, removeBioText, saveBioOrder } from "features/bioSlice/bioSlice"
import { useForm } from "features/hooks/useForm"
import { useState } from "react"
import { useDispatch, useSelector } from "services/store/store"
import { TBio } from "services/types"
import { InputUIProps } from "../ui/input-ui/type"
import { PreloaderUI } from "components/ui/preloader-ui/preloader"
import { ModalContentUI } from "../ui/modal-content-ui/modal-content-ui"
import { ButtonUIProps } from "../ui/button-ui/type"

import styles from './bio.module.scss'

export const Bio = () => {
  // const [values, setValues] = useState({
  //   text: '',
  //   position: 0
  // })
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [currentParagraphId, setCurrentParagraphId] = useState<string | null>(null);
  const { values, setValues, handleChange } = useForm<TBio>({
    text: '',
    position: 0
  })

  const { bio, loading } = useSelector(bioSelector)

  const dispatch = useDispatch()
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSaveOrder = () => {
    dispatch(saveBioOrder(bio))
  }

  const handleAdd = () => {
    handleOpen()
    setModalType('add')
    setValues({
      text: '',
      position: bio.length
    })
  }

  const handleEdit = (paragraph: TBio) => {
    setIsOpen(true);
    setModalType("edit");
    setCurrentParagraphId(paragraph.id || null);
    setValues({
      ...paragraph,
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const paragraph: TBio = {
      ...values,
    }

    if (modalType === "add") {
      dispatch(addBioText(paragraph));
    } else if (modalType === "edit" && currentParagraphId) {
      dispatch(editBioText({ ...paragraph, id: currentParagraphId }));
    }
    handleClose();
    setValues({
      text: '',
      position: 0
    })
  }

  const handleRemove = (paragraph: TBio) => {
    dispatch(removeBioText(paragraph))
  }
  const inputs: InputUIProps[] = [
    {
      name: "text",
      type: "text",
      placeholder: "Add a part of your bio...",
    }
  ]
  const buttons: ButtonUIProps[] = [
    {
      buttonText: "Save",
      onSubmit: handleSubmit,
      type: "submit" as 'submit',
    },
    {
      buttonText: 'Cancel',
      onClick: handleClose,
      type: 'button' as 'button'
    }
  ]

  return (
    <div className={styles.bioContainer}>
      <div className={styles.bioContainer__buttons}>
        <ButtonUI type='button' buttonText="Add paragraph" onClick={handleOpen} />
        <ButtonUI type='button' buttonText="Save paragraphs order" onClick={handleSaveOrder} />
      </div>
      {loading && <PreloaderUI />}
      {bio.length > 0 ? [...bio]
        .sort((a, b) => a.position - b.position)
        .map((bio, index) => {
          return <BioParagraph
            key={bio.id}
            paragraph={bio}
            index={index}
            onEdit={() => handleEdit(bio)}
            onRemove={() => handleRemove(bio)} />
        })
        : <h2>You don't have any paragraphs <br />It is time to add some!</h2>}
      {isOpen && modalType === 'add' ?
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalContentUI
            inputs={inputs}
            buttons={buttons}
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            formHeader="Add paragraph"
            formName="addParagraph"
            onClose={handleClose}

          />
        </Modal>
        :
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalContentUI
            inputs={inputs}
            buttons={buttons}
            values={values}
            onChange={handleChange}
            onClose={handleClose}
            onSubmit={handleSubmit}
            formHeader="Edit paragraph"
            formName="editParagraph"
          />
        </Modal>
      }
    </div>
  )
}