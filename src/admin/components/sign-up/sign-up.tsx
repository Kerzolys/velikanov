import { singUpUser } from "features/userSlice/userSlice"
import { Form } from "../form/form"

export const SignUp = () => {
  return <Form action={singUpUser} formName='signUp' buttonText='signUp' formHeader='Sign Up'/>
}