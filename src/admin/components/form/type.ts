import { AsyncThunk } from "@reduxjs/toolkit";

export type FormProps = {
  formName: string;
  formHeader: string;
  action: AsyncThunk<any, { email: string; password: string }, {}>;
  buttonText: string;
};
