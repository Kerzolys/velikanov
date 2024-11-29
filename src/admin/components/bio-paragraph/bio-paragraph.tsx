import { BioParagraphUI } from "components/ui/bio-paragraph-ui/bio-paragraph-ui";
import { BioParagraphProps } from "./type";
import { useState } from "react";
import { Modal } from "components/modal/modal";
import { useDispatch, useSelector } from "services/store/store";
import { bioSelector, changePosition, editBioText, removeBioText } from "features/bioSlice/bioSlice";
import { ButtonUI } from "../ui/button-ui/button-ui";

import styles from './bio-paragraph.module.scss'

export const BioParagraph: React.FC<BioParagraphProps> = ({ paragraph, index, onEdit, onRemove }) => {
  // const [isOpen, setIsOpen] = useState(false)
  // const [values, setValues] = useState(paragraph)

  const dispatch = useDispatch()
  // // console.log(paragraph, index)

  // const handleOpenParagraph = () => {
  //   setIsOpen(true)
  // }

  // const handleClose = () => setIsOpen(false)

  // const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = evt.target
  //   setValues(prevValues => ({
  //     ...prevValues,
  //     [name]: value,
  //   }))
  // }

  // const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  //   evt.preventDefault()
  //   dispatch(editBioText(values))
  //   setIsOpen(false)
  // }

  // const handleRemove = () => {
  //   dispatch(removeBioText(paragraph))
  // }

  const handleMoveUp = () => {
    dispatch(changePosition({ from: index, to: index - 1 }))
  }

  const handleMoveDown = () => {
    dispatch(changePosition({ from: index, to: index + 1 }))
  }

  return (
    <div className={styles.bioParagraph}>
      <ButtonUI buttonText="Up" onClick={handleMoveUp} />
      <BioParagraphUI text={paragraph.text} />
      <ButtonUI buttonText="Down" onClick={handleMoveDown} />

      <div className={styles.bioParagraph__buttons}>
        <ButtonUI buttonText='Edit event' onClick={onEdit} className={styles.calendarEvent__button} />
        <ButtonUI buttonText='Remove event' onClick={onRemove} className={styles.calendarEvent__button} />
      </div>
    </div>
  )
}