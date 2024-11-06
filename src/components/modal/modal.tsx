import { ModalUI } from "components/ui/modal-ui/modal-ui";
import ReactDOM from "react-dom";
import { ModalProps } from "./type";
import { useRef } from "react";

export const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleClose = (evt: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if ((modalRef.current && evt.target === modalRef.current) || (closeButtonRef.current && evt.target === closeButtonRef.current)) {
      onClose()
    }
  }

  const modalRoot = document.getElementById('modal-root')
  return ReactDOM.createPortal(
    <ModalUI
      modalRef={modalRef}
      closeButtonRef={closeButtonRef}
      onClose={handleClose}
      isOpen={isOpen}
      children={children}
    />,
    modalRoot!
  )
}