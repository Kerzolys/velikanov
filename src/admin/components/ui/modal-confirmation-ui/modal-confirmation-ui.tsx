import { FormUI } from '../form-ui/form-ui'
import { ModalConfirmationUIProps } from './type'

import styles from './modal-confirmation-ui.module.scss'
export const ModalConfirmationUI: React.FC<ModalConfirmationUIProps> = ({ buttons, formHeader, formName, onSubmit }) => {
  return <FormUI
    inputs={[]}
    values={{}}
    buttons={buttons}
    formHeader={formHeader}
    formName={formName}
    onSubmit={onSubmit}
  />
}