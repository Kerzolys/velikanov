import classNames from "classnames";
import { ButtonUIProps } from "./type";
import styles from './button-ui.module.scss'

export const ButtonUI: React.FC<ButtonUIProps> = ({ buttonText, onClick, className, disabled, type }) => {
  return <button
    type={type}
    onClick={onClick}
    className={classNames(styles.button, className)}
    disabled={disabled}>
    {buttonText}
  </button>
}