import { ActionCreatorWithPayload, AsyncThunk } from "@reduxjs/toolkit";
import { TEvent } from "services/types";

export type ModalCalendarEventUIProps = {
  onClick: () => void;
  error?: string;
  value: TEvent;
  // action: AsyncThunk<any, T, {}> | ActionCreatorWithPayload<T>;
};
