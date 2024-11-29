import { TBio } from "services/types"

export type BioParagraphProps = {
  paragraph: TBio
  index: number
  onEdit: () => void
  onRemove: () => void
}