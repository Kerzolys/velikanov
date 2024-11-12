import { ButtonUIProps } from "../button-ui/type";
import { InputUIProps } from "../input-ui/type";
import React from "react";

export type FormUIProps = {
  inputs: InputUIProps[];
  buttons: ButtonUIProps[];
  formHeader: string;
  formName: string;
  values: Record<string, string | string[]>;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
