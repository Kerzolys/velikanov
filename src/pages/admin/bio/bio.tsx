import { BioParagraph } from "admin/components/bio-paragraph/bio-paragraph"
import { ButtonUI } from "admin/components/ui/button-ui/button-ui"
import { ModalBioParagraph } from "admin/components/ui/modal-bio-paragraph/modal-bio-paragraph"
import { Modal } from "components/modal/modal"
import { addBioText, bioSelector, saveBioOrder } from "features/bioSlice/bioSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "services/store/store"

export const AdminBio = () => {
  const [values, setValues] = useState({
    text: '',
    position: 0
  })
  const [isOpen, setIsOpen] = useState(false)

  const { bio } = useSelector(bioSelector)
  // const sortedBio = [...bio].sort((a, b) => a.position - b.position)
  console.log(bio)

  const dispatch = useDispatch()

  const handleSaveOrder = () => {
    dispatch(saveBioOrder(bio))
    console.log(bio)
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const text = evt.target.value
    setValues(prevValues => ({
      ...prevValues,
      text: text,
    }))
  }

  const handleAddParagraph = () => {
    dispatch(addBioText({
      ...values,
      position: bio.length
    }))
    handleClose()
    setValues({
      text: '',
      position: 0
    })
  }

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)


  return (
    <>
      {[...bio]
        .sort((a, b) => a.position - b.position)
        .map((bio, index) => {
          return <BioParagraph key={bio.id} paragraph={bio} index={index} />
        })}
      <ButtonUI type='button' buttonText="Add paragraph" onClick={handleOpen} />
      <ButtonUI type='button' buttonText="Save paragraphs order" onClick={handleSaveOrder} />
      {isOpen && <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalBioParagraph values={values} onChange={handleChange} onSubmit={handleAddParagraph} />
      </Modal>}
    </>
  )
}