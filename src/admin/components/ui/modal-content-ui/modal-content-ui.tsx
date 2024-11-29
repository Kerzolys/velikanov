import { FormUI } from '../form-ui/form-ui'
import styles from './modal-content-ui.module.scss'
import { ModalContentUIProps } from './type'

export const ModalContentUI: React.FC<ModalContentUIProps> = ({ values, onChange, onSubmit, inputs, buttons, formHeader, formName }) => {
  return <
  FormUI
  inputs={inputs}
  buttons={buttons}
  formHeader={formHeader}
  formName={formName}
  values={values}
  onChange={onChange}
  onSubmit={onSubmit}
/>
}