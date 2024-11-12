import { FormUIProps } from './type'
import { InputUI } from '../input-ui/input-ui'
import { ButtonUI } from '../button-ui/button-ui'

import styles from './form-ui.module.scss'

export const FormUI: React.FC<FormUIProps> = ({
  inputs,
  buttons,
  formHeader,
  formName,
  values,
  onChange,
  onClick,
  onSubmit
}) => {
  return (
    <>
      <h2>{formHeader}</h2>
      <form name={formName} onSubmit={onSubmit}>
        {inputs.map((input) => {
          return <InputUI
            key={input.name}
            placeholder={input.placeholder}
            error={input.error}
            type={input.type}
            onChange={onChange}
            name={input.name}
            value={values[input.name as keyof typeof values] as string}
          />
        })}
        {buttons.map((button) => {
          return <ButtonUI buttonText={button.buttonText} onClick={onClick} />
        })}
      </form>
    </>
  )
}