import { Modal } from 'components/modal/modal'
import { ButtonUI } from '../button-ui/button-ui'
import styles from './admin-welcom-page-ui.module.scss'
import { AdminSignIn } from 'pages/admin/sign-in/sign-in'

import { AdminWelcomePageUIProps } from './type'

export const AdminWelcomePageUI: React.FC<AdminWelcomePageUIProps> = ({ isOpen, setIsOpen, onSignIn, onSignUp, modalType }) => {
  return (
    <div className={styles.authContent}>
    <h1>Welcome</h1>
    <div className={styles.authContent__buttons}>
      <ButtonUI type='button' buttonText="Sign in" onClick={onSignIn}  />
    </div>
    {isOpen && modalType === 'signin' &&
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AdminSignIn isOpen={isOpen} />
      </Modal>} 
  </div>
  )
}