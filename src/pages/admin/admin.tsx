import { logout, userSelector } from "features/userSlice/userSlice";
import { useDispatch, useSelector } from "services/store/store";
import { useState } from "react";
import { AdminNavbarUI } from "admin/components/ui/admin-navbar-ui/admin-navbar-ui";
import { AdminWelcomePageUI } from "admin/components/ui/admin-welcom-page-ui/admin-welcom-page-ui";

import styles from './admin.module.scss'
import { PreloaderUI } from "components/ui/preloader-ui/preloader";

export const Admin = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector(userSelector)

  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<'signin' | 'signup' | null>(null)

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleSignIn = () => {
    setIsOpen(true)
    setModalType('signin')
  }

  const handleSignUp = () => {
    setIsOpen(true)
    setModalType('signup')
  }


  return (
    <div className={styles.container}>
      {loading ? <PreloaderUI />
        : !isAuthenticated ?
          <AdminWelcomePageUI
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
            modalType={modalType}
            setModalType={setModalType}
          />
          : <AdminNavbarUI onLogout={handleLogout} isHomePage={true} />
      }
    </div>
  )
}
