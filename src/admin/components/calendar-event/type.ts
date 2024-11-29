import { TEvent } from "services/types"

export type CalendarEventProps = {
  event: TEvent
  onEdit: () => void
  onRemove: () => void
}