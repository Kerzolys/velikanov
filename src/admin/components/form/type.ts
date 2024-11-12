import { ActionCreatorWithPayload, AsyncThunk } from "@reduxjs/toolkit";
import { InputUIProps } from "../ui/input-ui/type";
import { ButtonUIProps } from "../ui/button-ui/type";
import React from "react";

export type FormProps<T> = {
  formName: string;
  formHeader: string;
  action: AsyncThunk<any, T, {}> | ActionCreatorWithPayload<T> ;
  inputValues: T
  inputErrors: Record<string, string>;
  inputs: InputUIProps[];
  buttons: ButtonUIProps[];
  onClick?: () => void;
};
