import { loginUser } from "features/userSlice/userSlice"
import { Form } from "../form/form"

export const SignIn = () => {
  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
    }
  ]
  const buttons = [
    {
      buttonText: "Log In",
      type: "submit" as 'submit',
    }
  ]

  return <Form<{ email: string, password: string }>
    inputValues={{ email: '', password: '' }}
    inputErrors={{ email: 'Please', password: 'Please' }}
    inputs={inputs}
    buttons={buttons}
    action={loginUser}
    formHeader="Log In"
    formName="login"
  />
}