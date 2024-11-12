import { useState } from 'react'
import { FormProps } from './type'
import { AppDispatch, } from 'services/store/store'
import { FormUI } from '../ui/form-ui/form-ui'
import { useDispatch } from 'react-redux'

import styles from './form.module.scss'

export const Form = <T extends Record<string, string | string[]>>(
  {
    action,
    formName,
    formHeader,
    inputValues,
    inputErrors,
    inputs,
    buttons,
    onClick
  }: FormProps<T>
) => {
  const [values, setValues] = useState<T>(inputValues)
  const [errors, setErrors] = useState(inputErrors)

  const dispatch: AppDispatch = useDispatch()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value === 'program' ? value.split(', ').map(item => item.trim()) : value
    })
    )
    // console.log(values.program)
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (values.name === '') {
      setErrors(inputErrors)
    }

    setErrors(inputErrors)
    dispatch(action(values))
  }

  return (
    <FormUI
      values={{
        ...values,
        program: Array.isArray(values.program) ? values.program.join(', ') : values.program
      }}
      inputs={inputs}
      buttons={buttons}
      formHeader={formHeader}
      formName={formName}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClick={onClick} />
  )
}
