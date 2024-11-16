import { ButtonUIProps } from "../button-ui/type";
import { FormUI } from "../form-ui/form-ui";
import { InputUIProps } from "../input-ui/type";
import { ModalBioParagraphProps } from "./type";

export const ModalBioParagraph: React.FC<ModalBioParagraphProps> = ({ values, onChange, onSubmit }) => {
  const inputs: InputUIProps[] = [
    {
      name: "text",
      type: "text",
      placeholder: "Text",
    },
    // {
    //   name: "position",
    //   type: "number",
    //   placeholder: "Position",
    // }
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
  return <
    FormUI
    inputs={inputs}
    buttons={buttons}
    formHeader="Edit Paragraph"
    formName="editBioForm"
    values={values}
    onChange={onChange}
    onSubmit={onSubmit}
  />
}