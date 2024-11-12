import { ButtonUIProps } from "./type";

export const ButtonUI: React.FC<ButtonUIProps> = ({ buttonText, onClick, className, disabled, type }) => {
  return <button type={type} onClick={onClick} className={className} disabled={disabled}>{buttonText}</button>
}