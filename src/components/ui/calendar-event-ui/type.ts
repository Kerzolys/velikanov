import { TEvent } from "services/types";

export interface ICalendarEvent extends TEvent {
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
}
