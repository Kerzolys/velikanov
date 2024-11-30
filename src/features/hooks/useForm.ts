import { useState } from "react";

type FormValues<T extends Record<string, any>> = T;

export const useForm = <T extends Record<string, any>>(
  initialValues: FormValues<T>
) => {
  const [values, setValues] = useState<FormValues<T>>(initialValues);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = evt.target;

    if (
      evt.target instanceof HTMLInputElement &&
      evt.target.type === "file" &&
      evt.target.files
    ) {
      const selectedFile = evt.target.files[0];
      if (selectedFile) {
        setFile(selectedFile); // Сохраняем файл отдельно
      }
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  return {
    values,
    setValues,
    file,
    setFile,
    handleChange,
  };
};
