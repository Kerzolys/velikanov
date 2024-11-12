import { TEvent } from "services/types";

export interface ICalendarEvent extends TEvent {
  isEditable?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void
  onChange?: () => void
}
