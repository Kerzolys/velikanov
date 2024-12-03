import { signUpUser, userSelector } from "features/userSlice/userSlice"

import { InputUIProps } from "../ui/input-ui/type"
import { ButtonUIProps } from "../ui/button-ui/type"
import { useDispatch, useSelector } from "services/store/store"
import { useCallback, useEffect, useMemo, useState } from "react"
import { FormUI } from "../ui/form-ui/form-ui"
import { useForm } from "features/hooks/useForm"

export const SignUp = ({ onSuccess }: { onSuccess: () => void }) => {


  const [errors, setErrors] = useState<{ email: string, password: string }>({ email: '', password: '' })
  const { values, setValues, handleChange } = useForm<{ email: string, password: string }>({ email: '', password: '' })
  const dispatch = useDispatch()
  const { error } = useSelector(userSelector)


  const validate = () => {
    const newErrors = { email: '', password: '' }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!values.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!values.password) {
      newErrors.password = 'Password is required'
    } else if (!passwordRegex.test(values.password)) {
      newErrors.password = 'Password must be at least 8 characters long and contain at least one letter and one number'
    }
    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  useEffect(() => {
    validate()
  }, [values])

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (validate()) {
      try {
        await dispatch(signUpUser({ ...values })).unwrap()
      } catch (err: any) {
        setErrors({
          email: err?.message ? err.message : "",
          password: '',
        })
      } finally {
        onSuccess()
      }
    }
  }


  const inputs = useMemo<InputUIProps[]>(() => [
    // {
    //   name: 'name',
    //   type: 'text',
    //   placeholder: 'Your name',
    //   error: errors.name
    // },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      error: errors.email
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      error: errors.password
    },
  ], [errors])

  const buttons = useMemo<ButtonUIProps[]>(() => [
    {
      buttonText: "Sign Up",
      type: 'submit' as 'submit',
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
      formHeader="Sign up"
      formName="loginForm"
      values={memoizedValues}
      onSubmit={memoizedHandleSubmit}
      onChange={memoizedHandleChange}
    />
  )
}