import styles from './input-ui.module.scss'
import { InputUIProps } from './type'

export const InputUI: React.FC<InputUIProps> = ({ placeholder, value, onChange, error, name, type, className }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
      <span>{error}</span>
    </>
  )
}