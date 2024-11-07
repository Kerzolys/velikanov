import { loginUser } from "features/userSlice/userSlice"
import { Form } from "../form/form"

export const SignIn = () => {
  return <Form action={loginUser} formHeader="Log In" formName="login" buttonText="Log In"/>
}