import { ButtonUIProps } from "../button-ui/type"
import { InputUIProps } from "../input-ui/type"

export type ModalContentUIProps = {
  values: Record<string, string | string[] | number>
  onClose: () => void
  onChange: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  inputs: InputUIProps[]
  buttons: ButtonUIProps[]
  formHeader: string
  formName: string
}