import classNames from "classnames";
import { ButtonNavbarUIProps } from "./type";
import styles from './button-navbar-ui.module.scss'

export const ButtonNavbarUI: React.FC<ButtonNavbarUIProps> = ({ onClick, isActive, buttonText, className, disabled, type }) =>
  <button
    className={classNames(styles.button, { [styles.button_active]: isActive })}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {buttonText}
  </button >

