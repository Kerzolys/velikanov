import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "services/store/store";
import { TEvent } from "services/types";
import { testEvents } from "utils/testEvents";

export type EventsState = {
  events: TEvent[];
  loading: boolean;
  success: boolean;
  error: string | null;
}

export const initialState: EventsState = {
  events: testEvents,
  loading: false,
  success: false,
  error: null,
}

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<TEvent[]>) => {
      state.events = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    addEvent: (state, action: PayloadAction<TEvent>) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      const filteredEvents = state.events.filter(event => event.id !== action.payload)
      state.events = filteredEvents;
    },
    selectEvent: (state, action: PayloadAction<string>) => {
      const selectedEvent = state.events.find(event => event.id === action.payload)
      console.log(selectedEvent)
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
})

export const {
  setEvents,
  addEvent,
  removeEvent,
  selectEvent,
  setError,
  setLoading,
} = eventsSlice.actions

export const eventsSelector = (state: RootState) => state.events

export default eventsSlice.reducer