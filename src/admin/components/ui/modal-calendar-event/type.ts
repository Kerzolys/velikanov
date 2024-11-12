import { EditableEvent } from "services/types";

export type ModalCalendarEventProps = {
  values: EditableEvent;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
