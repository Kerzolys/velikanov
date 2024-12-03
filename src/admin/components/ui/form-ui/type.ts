import { ButtonUIProps } from "../button-ui/type";
import { InputUIProps } from "../input-ui/type";
import React from "react";

export type FormUIProps = {
  inputs: (InputUIProps | HTMLTextAreaElementProps)[];
  buttons: ButtonUIProps[];
  formHeader: string;
  formName: string;
  values: Record<string, string | string[] | number>;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClick?: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors?: string[]
};

export type HTMLTextAreaElementProps = {
  name: string;
  placeholder: string;
  error?: string;
  rows: number;
  cols: number;
};