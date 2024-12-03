import { ButtonUIProps } from "../button-ui/type"

export type ModalConfirmationUIProps = {
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void
  formHeader: string
  formName: string
  buttons: ButtonUIProps[]
}