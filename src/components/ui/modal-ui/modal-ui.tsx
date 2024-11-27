import classNames from 'classnames'
import { ModalUIProps } from './type'

import styles from './modal-ui.module.scss'

export const ModalUI: React.FC<ModalUIProps> = ({ isOpen, onClose, children, modalRef, closeButtonRef }) => {
  return (
    <div className={classNames(styles.modal, { [styles.modal_opened]: isOpen, [styles.modal_closed]: !isOpen })} ref={modalRef} onClick={onClose} >
      <div className={styles.modal__content}>
        <button ref={closeButtonRef} className={styles.modal__closeButton} onClick={onClose} type='button' />
        {children}
      </div>
    </div>
  )
}