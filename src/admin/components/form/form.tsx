import { useState } from 'react'
import { InputUI } from '../ui/input-ui/input-ui'
import styles from './form.module.scss'
import { FormProps } from './type'
import { ButtonUI } from '../ui/button-ui/button-ui'
import { useDispatch } from 'services/store/store'
import { loginUser } from 'features/userSlice/userSlice'

export const Form: React.FC<FormProps> = ({ action, buttonText, formName, formHeader }) => {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })

  const dispatch = useDispatch()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setValues(prevValues => ({
      ...prevValues, [name]: value
    }))
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (values.email === '' && values.password === '') {
      setErrors({ email: 'Please enter your email', password: 'Please enter your password' })
    }

    setErrors({ email: '', password: '' })
    console.log(values)
    dispatch(action(values))
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{formHeader}</h2>
      <InputUI type='text' placeholder='email' onChange={handleChange} error={errors.email} value={values.email} name='email' />
      <InputUI type='password' placeholder='password' onChange={handleChange} error={errors.password} value={values.password} name='password' />
      <ButtonUI buttonText={buttonText} type='submit' disabled={!(values.email && values.password)} />
    </form>
  )
}