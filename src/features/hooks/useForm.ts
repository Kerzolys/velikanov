import { useState } from "react";

type FormValues<T extends Record<string, any>> = T;

export const useForm = <T extends Record<string, any>>(initialValues: FormValues<T>) => {
  const [values, setValues] = useState<FormValues<T>>(initialValues);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
    const { name, value, type } = evt.target;

    if (type === "file" && evt.target instanceof HTMLInputElement && evt.target.files) {
      const file = evt.target.files[0];
      if (file) {
        setFile(file); // Сохраняем файл отдельно
        setValues((prevValues) => ({
          ...prevValues,
          [name]: file.name, // Сохраняем имя файла в значения формы
        }));
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
