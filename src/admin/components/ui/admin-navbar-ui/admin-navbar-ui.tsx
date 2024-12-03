import { NavLink, useNavigate } from 'react-router-dom'
import styles from './admin-navbar-ui.module.scss'
import { ButtonUI } from '../button-ui/button-ui'
import classNames from 'classnames'
import { useState } from 'react'
import { Modal } from 'components/modal/modal'
import { AdminSignUp } from 'pages/admin/sign-up/sign-up'
import { ModalConfirmationUI } from '../modal-confirmation-ui/modal-confirmation-ui'
import { ButtonUIProps } from '../button-ui/type'

export const AdminNavbarUI = ({ onLogout, isHomePage }: { onLogout?: () => void, isHomePage: boolean }) => {
  const navigate = useNavigate()
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  const handleSuccessfulSignUp = () => {
    setIsSignUpOpen(false)
    setIsConfirmationModalOpen(true)
  }
  const handleBack = () => {
    navigate('/admin')
  }
  const buttons: ButtonUIProps[] = [
    {
      buttonText: 'Close',
      type: 'submit' as 'submit',
      onClick: handleBack,
    }
    
  ]
  return (
    <div className={classNames(styles.content, { [styles.navbar]: !isHomePage })}>
      <h2 className={classNames(styles.content__header, { [styles.navbar__header]: !isHomePage })}>Hello</h2>
      <NavLink to='/admin/calendar' className={styles.content__button}>
        <ButtonUI type='button' buttonText="Calendar" className={styles.content__button_button} />
      </NavLink>
      <NavLink to='/admin/about' className={styles.content__button}>
        <ButtonUI type='button' buttonText="Bio" className={styles.content__button_button} />
      </NavLink>
      <NavLink to='/admin/media' className={styles.content__button}>
        <ButtonUI type='button' buttonText="Media" className={styles.content__button_button} />
      </NavLink>
      <NavLink to='/admin/gallery' className={styles.content__button}>
        <ButtonUI type='button' buttonText="Gallery" className={styles.content__button_button} />
      </NavLink>
      <ButtonUI type='button' buttonText="add new user" className={styles.content__button} onClick={() => setIsSignUpOpen(true)} />
      {isHomePage ?
        <ButtonUI type='button' buttonText="Log out" onClick={onLogout} className={styles.content__button} />
        :
        <ButtonUI type='submit' buttonText="back" onClick={handleBack} className={styles.content__button} />
      }
      {isSignUpOpen &&
        <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
          <AdminSignUp isOpen={isSignUpOpen} onSuccess={handleSuccessfulSignUp} />
        </Modal>}
      {isConfirmationModalOpen &&
        <Modal isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)}>
          <ModalConfirmationUI 
            buttons={buttons}
            formHeader="Congrats! You are now a member of the team!"
            formName="Welcome"
            onSubmit={() => setIsConfirmationModalOpen(false)}
          />
        </Modal>}

    </div>
  )
}