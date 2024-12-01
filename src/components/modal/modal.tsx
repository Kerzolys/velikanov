import { ModalUI } from "components/ui/modal-ui/modal-ui";
import { createPortal } from "react-dom";
import { ModalProps } from "./type";
import { useEffect, useRef } from "react";

const modalRoot = document.getElementById('modal')


export const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleClose = (evt: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if ((modalRef.current && evt.target === modalRef.current) || (closeButtonRef.current && evt.target === closeButtonRef.current)) {
      onClose()
    }
  }

  useEffect(() => {
    const handleEscape = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])
  return createPortal(
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