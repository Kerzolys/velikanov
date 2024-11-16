import { BioParagraphUI } from "components/ui/bio-paragraph-ui/bio-paragraph-ui";
import { BioParagraphProps } from "./type";
import { useState } from "react";
import { ModalBioParagraph } from "../ui/modal-bio-paragraph/modal-bio-paragraph";
import { Modal } from "components/modal/modal";
import { useDispatch, useSelector } from "services/store/store";
import { bioSelector, changePosition, editBioText, removeBioText } from "features/bioSlice/bioSlice";
import { ButtonUI } from "../ui/button-ui/button-ui";

export const BioParagraph: React.FC<BioParagraphProps> = ({ paragraph, index }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState(paragraph)

  const dispatch = useDispatch()
  // console.log(paragraph, index)

  const handleOpenParagraph = () => {
    setIsOpen(true)
  }

  const handleClose = () => setIsOpen(false)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    dispatch(editBioText(values))
    setIsOpen(false)
  }

  const handleRemove = () => {
    dispatch(removeBioText(paragraph))
  }

  const handleMoveUp = () => {
    dispatch(changePosition({ from: index, to: index - 1 }))
  }

  const handleMoveDown = () => {
    dispatch(changePosition({ from: index, to: index + 1 }))
  }

  return (
    <>
      <ButtonUI buttonText="Up" onClick={handleMoveUp} />
      <BioParagraphUI text={paragraph.text} onClick={handleOpenParagraph} />
      <ButtonUI buttonText="Down" onClick={handleMoveDown} />
      <ButtonUI buttonText="Delete" onClick={handleRemove} />

      {
        isOpen && <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalBioParagraph values={values} onChange={handleChange} onSubmit={handleSubmit} />
        </Modal>
      }
    </>
  )
}