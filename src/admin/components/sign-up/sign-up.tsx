import { signUpUser } from "features/userSlice/userSlice"

import { InputUIProps } from "../ui/input-ui/type"
import { ButtonUIProps } from "../ui/button-ui/type"
import { useDispatch } from "services/store/store"
import { useState } from "react"
import { FormUI } from "../ui/form-ui/form-ui"

export const SignUp = () => {

  const [values, setValues] = useState({ email: '', password: '' })
  // const [error, setError] = useState({email: '', password: ''})
  
  const dispatch = useDispatch()
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    // if(values.email === '' && values.password === '') {
    //   setError(prevErrors => ({
    //     ...prevValues,
    //   }))
    // }

    dispatch(signUpUser({ email: values.email, password: values.password }))
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setValues(prevValues => ({
      ...prevValues, [name]: value
    }))
  }
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
    <FormUI
    inputs={inputs}
    buttons={buttons}
    formHeader="Sign in"
    formName="loginForm"
    values={values}
    onSubmit={handleSubmit}
    onChange={handleChange}

  />
  )
}