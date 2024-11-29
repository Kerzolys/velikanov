import { loginUser } from "features/userSlice/userSlice"

import { FormUI } from "../ui/form-ui/form-ui"
import { useDispatch } from "services/store/store"
import { useState } from "react"
import { useForm } from "features/hooks/useForm"

export const SignIn = () => {
  // const [values, setValues] = useState({ email: '', password: '' })
  // const [error, setError] = useState({email: '', password: ''})

  const dispatch = useDispatch()
  const { values, setValues, handleChange } = useForm<{ email: string, password: string }>({ email: '', password: '' })
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    // if(values.email === '' && values.password === '') {
    //   setError(prevErrors => ({
    //     ...prevValues,
    //   }))
    // }


    dispatch(loginUser({
      ...values
    }))
    setValues({ email: '', password: '' })
  }

  // const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = evt.target
  //   setValues(prevValues => ({
  //     ...prevValues, [name]: value
  //   }))
  // }


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