export type AdminWelcomePageUIProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  modalType: 'signin' | 'signup' | null
  setModalType: (modalType: 'signin' | 'signup' | null) => void
  onSignIn: () => void
  onSignUp: () => void
}