import { ButtonUIProps } from "../button-ui/type"
import { FormUI } from "../form-ui/form-ui"
import { InputUIProps } from "../input-ui/type"
import { ModalCalendarEventProps } from "./type"

export const ModalCalendarEvent: React.FC<ModalCalendarEventProps> = ({ values, onSubmit, onChange }) => {
  const inputs: InputUIProps[] = [
    {
      name: "date",
      type: "text",
      placeholder: "Date",
    },
    {
      name: "time",
      type: "text",
      placeholder: "Time",
    },
    {
      name: "location",
      type: "text",
      placeholder: "Location",
    },
    {
      name: "program",
      type: "text",
      placeholder: "Program",
    },
    {
      name: "soloist",
      type: "text",
      placeholder: "Soloist",
    },
    {
      name: "link",
      type: "text",
      placeholder: "Link",
    }
  ]

  const buttons: ButtonUIProps[] = [

    {
      buttonText: "Confirm",
      type: "submit" as 'submit',
    },
    {
      buttonText: 'Cancel',
      type: 'button' as 'button'
    }
  ]
  return (
    <FormUI
      inputs={inputs}
      buttons={buttons}
      formHeader="Edit Event"
      formName="editEventForm"
      values={values}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  )
}