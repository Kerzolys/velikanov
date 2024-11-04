import classNames from 'classnames'
import styles from './button-ui.module.scss'
import { ButtonUIProps } from './type'

export const ButtonUI: React.FC<ButtonUIProps> = ({ onClick, buttonText, disabled, className, type }) => {
  return <button onClick={onClick} disabled={disabled} type={type} className={classNames(styles.button, className)}>{buttonText}</button>
}