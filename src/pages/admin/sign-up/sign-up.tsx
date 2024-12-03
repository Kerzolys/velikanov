import { SignUp } from "admin/components/sign-up/sign-up"
import { AdminSignUpProp } from "./type"

export const AdminSignUp: React.FC<AdminSignUpProp> = ({ isOpen, onSuccess }) => {
  return <SignUp onSuccess={onSuccess} />
}