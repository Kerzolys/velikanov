import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { RootState } from "services/store/store";
import { TEvent } from "services/types";
import { testEvents } from "utils/testEvents";
import { db } from "../../firebase/firebase";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const eventRef = collection(db, "events");
      const eventSnapshot = await getDocs(eventRef);
      const eventList = eventSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data() as TEvent
      }))
      return eventList;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (event: TEvent, { rejectWithValue }) => {
    try {
      const eventRef = await addDoc(collection(db, "events"), {
        ...event,
      });
      return { ...event, id: eventRef.id };
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const editEvent = createAsyncThunk(
  "events/editEvent",
  async (event: TEvent, { rejectWithValue }) => {
    try {
      if (!event.id) {
        throw new Error("Event ID is required");
      }
      const eventRef = doc(db, "events", event.id);
      // console.log(eventRef);
      await updateDoc(eventRef, {
        date: event.date,
        time: event.time,
        location: event.location,
        program: event.program,
        soloist: event.soloist,
      });
      console.log(event);
      return event;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeEvent = createAsyncThunk(
  "event/removeEvent",
  async (event: TEvent, { rejectWithValue }) => {
    try {
      if (!event.id) {
        throw new Error("Event ID is required");
      }
      const eventRef = doc(db, "events", event.id);
      await deleteDoc(eventRef);
      return event.id;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export type EventsState = {
  events: TEvent[];
  loading: boolean;
  success: boolean;
  error: string | null;
};

export const initialState: EventsState = {
  events: [],
  loading: false,
  success: false,
  error: null,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<TEvent[]>) => {
          state.loading = false;
          state.success = true;
          state.events = action.payload;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action: PayloadAction<TEvent>) => {
        state.loading = false;
        state.success = true;
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEvent.fulfilled, (state, action: PayloadAction<TEvent>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        const editedEvent = state.events.find(
          (event) => event.id === action.payload.id
        );
        console.log(editedEvent);
        if (editedEvent) {
          editedEvent.date = action.payload.date;
          editedEvent.time = action.payload.time;
          editedEvent.location = action.payload.location;
          editedEvent.program = action.payload.program;
          editedEvent.soloist = action.payload.soloist;
          editedEvent.link = action.payload.link;
        }
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeEvent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = null;
          state.success = true;
          state.events = state.events.filter(
            (event) => event.id !== action.payload
          );
        }
      )
      .addCase(removeEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const {
//   // setEvents,
//   // addEvent,
//   // removeEvent,
//   // editEvent,
//   // selectEvent,
//   // setError,
//   // setLoading,
// } = eventsSlice.actions;

export const eventsSelector = (state: RootState) => state.events;

export default eventsSlice.reducer;
