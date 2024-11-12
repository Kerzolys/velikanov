import { signUpUser } from "features/userSlice/userSlice"
import { Form } from "../form/form"
import { InputUIProps } from "../ui/input-ui/type"
import { ButtonUIProps } from "../ui/button-ui/type"

export const SignUp = () => {
  const inputs: InputUIProps[] = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
    },
  ]

  const buttons: ButtonUIProps[] = [
    {
      buttonText: "Sign Up",
    }
  ]
  return (
    <Form<{ email: string, password: string }>
      inputValues={{ email: '', password: '' }}
      inputErrors={{ email: 'Please', password: 'Please' }}
      inputs={inputs}
      buttons={buttons}
      action={signUpUser}
      formName='signUp'
      formHeader='Sign Up'
    />
  )
}