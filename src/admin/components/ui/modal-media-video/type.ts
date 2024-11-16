import { TVideo } from "services/types"

export type ModalMediaVideoProps = {
  values: TVideo
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}