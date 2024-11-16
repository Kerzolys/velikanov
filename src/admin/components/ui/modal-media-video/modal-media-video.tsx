import { ButtonUIProps } from "../button-ui/type";
import { FormUI } from "../form-ui/form-ui";
import { InputUIProps } from "../input-ui/type";
import { ModalMediaVideoProps } from "./type";

export const ModalMediaVideo: React.FC<ModalMediaVideoProps> = ({ values, onChange, onSubmit }) => {
  const inputs: InputUIProps[] = [
    {
      name: "url",
      type: "text",
      placeholder: "URL",
    },
    {
      name: "title",
      type: "text",
      placeholder: "Title",
    }
  ]

  const buttons: ButtonUIProps[] = [
    {
      buttonText: "Save",
      onClick: () => { },
      type: "submit" as 'submit',
    },
    {
      buttonText: 'Cancel',
      onClick: () => { },
      type: 'button' as 'button'
    }
  ]
  return <>
    <FormUI
      inputs={inputs}
      buttons={buttons}
      values={values}
      onChange={onChange}
      onSubmit={onSubmit}
      formHeader="Video"
      formName="video" />
  </>
}