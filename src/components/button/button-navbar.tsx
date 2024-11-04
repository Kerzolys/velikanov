import { ButtonNavbarUI } from "../ui/button-navbar-ui/button-navbar-ui"
import { ButtonNavbarProps } from "./type"

export const ButtonNavbar: React.FC<ButtonNavbarProps> = ({ onClick, buttonText, className, disabled, type, isActive }) => {
  return <ButtonNavbarUI onClick={onClick} buttonText={buttonText} className={className} disabled={disabled} type={type} isActive={isActive} />
}