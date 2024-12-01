import { loginUser, userSelector } from "features/userSlice/userSlice"

import { FormUI } from "../ui/form-ui/form-ui"
import { useDispatch, useSelector } from "services/store/store"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "features/hooks/useForm"
import { InputUIProps } from "../ui/input-ui/type"
import { ButtonUIProps } from "../ui/button-ui/type"

export const SignIn = () => {
  const dispatch = useDispatch()
  const { values, setValues, handleChange } = useForm<{ email: string, password: string }>({ email: '', password: '' })
  const [errors, setErrors] = useState<{ email: string, password: string }>({ email: '', password: '' })
  const { error } = useSelector(userSelector)

  useEffect(() => {
    validate()
  }, [values])

  const validate = () => {
    const newErrors = { email: '', password: '' }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!values.email) {
      console.log(values.email)
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!values.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (validate()) {
      try {
        await dispatch(loginUser({ ...values })).unwrap();
      } catch (err: any) {
        setErrors({
          // email: err?.message ? err.message : "",
          email: '',
          password: err?.message ? err.message : "",
        });
        console.error(errors);
      }
    }
  }

  const inputs = useMemo<InputUIProps[]>(() => [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      error: errors.email
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      error: errors.password
    }
  ], [errors])

  const buttons = useMemo<ButtonUIProps[]>(() => [
    {
      buttonText: "Log In",
      type: "submit" as 'submit',
      onSubmit: handleSubmit,
      disabled: values.email.trim() === "" || values.password.trim() === "",
    }
  ], [handleSubmit, values])

  const memoizedValues = useMemo(() => values, [values]);
  const memoizedHandleChange = useCallback(handleChange, []);
  const memoizedHandleSubmit = useCallback(handleSubmit, [values]);

  return (
    <FormUI
      inputs={inputs}
      buttons={buttons}
      formHeader="Sign in"
      formName="loginForm"
      values={memoizedValues}
      onSubmit={memoizedHandleSubmit}
      onChange={memoizedHandleChange}
    />
  )
}