import { FormUIProps } from './type'
import InputUI from '../input-ui/input-ui'
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
    <div className={styles.formContainer}>
      <h2 className={styles.formContainer__header}>{formHeader}</h2>
      <form key={formName} name={formName} onSubmit={onSubmit} className={styles.formContainer__form}>
        {inputs.map((input) => {
          if ('rows' in input) {
            return <textarea
              key={input.name}
              placeholder={input.placeholder}
              onChange={onChange}
              name={input.name}
              value={values[input.name as keyof typeof values] as string || ''}
              className={styles.formContainer__form__textarea}
            />
          }
          return <InputUI
            key={input.name}
            placeholder={input.placeholder}
            error={input.error || ''}
            type={input.type}
            onChange={onChange}
            name={input.name}
            value={values[input.name as keyof typeof values] as string || ''}
            className={styles.formContainer__form__input}
          />
        })}
        {buttons.map((button, index) => {
          return <ButtonUI key={index} type={button.type} buttonText={button.buttonText} onClick={button.onClick} onSubmit={onSubmit} disabled={button.disabled} />
        })}
      </form>
    </div>
  )
}