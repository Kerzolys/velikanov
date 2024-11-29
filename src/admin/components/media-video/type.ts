import { TVideo } from "services/types"

export type MediaVideoProps = {
  video: TVideo
  onEdit: () => void
  onRemove: () => void
}