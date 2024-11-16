import { TBio } from "services/types"

export type ModalBioParagraphProps = {
  values: TBio
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}