import { SignIn } from "admin/components/sign-in/sign-in"
import { AdminSignInProp } from "./type"

export const AdminSignIn: React.FC<AdminSignInProp> = ({ isOpen }) => {
  return <SignIn />
}