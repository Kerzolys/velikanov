import { FormUI } from "../form-ui/form-ui";
import { InputUIProps } from "../input-ui/type";
import { ModalGalleryPhotoProps } from "./type";

export const ModalGalleryPhoto: React.FC<ModalGalleryPhotoProps> = ({ values, onChange, onSubmit }) => {
  const inputs: InputUIProps[] = [
    {
      name: "file",
      type: "file",
      placeholder: "File",
      accept: "image/*",
    },
    {
      name: "title",
      type: "text",
      placeholder: "Title",
    }
  ]
  const buttons = [
    {
      buttonText: "Save",
      onClick: () => { },
      type: "submit" as'submit',
    },
    {
      buttonText: 'Cancel',
      type: 'button' as 'button'
    }
  ]
  return <
    FormUI
    inputs={inputs}
    buttons={buttons}
    formHeader="Gallery photo"
    formName="modalGalleryPhoto"
    values={values}
    onChange={onChange}
    // onClick={() => { }}
    onSubmit={onSubmit}
  />
}