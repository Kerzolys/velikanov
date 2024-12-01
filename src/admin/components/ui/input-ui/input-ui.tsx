import React from 'react'
import { InputUIProps } from './type'
import styles from './input-ui.module.scss'
import classNames from 'classnames';

 const InputUI: React.FC<InputUIProps> = ({ placeholder, value, onChange, error, name, type, className }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classNames(styles.inputContainer__input, className, {[styles.inputContainer__input_error]: error})}
      />
      <span className={styles.inputContainer__error}>{error}</span>
    </div>
  )
}

export default React.memo(InputUI)
