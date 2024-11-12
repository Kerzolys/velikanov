import { TEvent } from "services/types";
import eventsReducer, {
  fetchEvents,
  addEvent,
  initialState,
  editEvent,
  removeEvent,
} from "./eventsSlice";

const mockEvent: TEvent = {
  id: "1",
  date: "2022-01-01",
  time: "18:00",
  location: "New York",
  program: ["Music", "Dance"],
  soloist: "John Doe",
};

const editedMockEvent: TEvent = {
  id: "1",
  date: "2022-01-01",
  time: "19:00",
  location: "New York",
  program: ["Music", "Dance"],
  soloist: "John Doe",
};

describe("тестируем eventsSlice", () => {
  it("тестируем начальное состояние", () => {
    expect(eventsReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
  describe("тестируем экшн fetchEvents", () => {
    it("тестируем запрос fetchEvents", async () => {
      const action = { type: fetchEvents.pending.type };
      const newState = eventsReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", async () => {
      const action = { type: fetchEvents.fulfilled.type, payload: [mockEvent] };
      const newState = eventsReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        events: [mockEvent],
        loading: false,
        success: true,
        error: null,
      });
    });
    it("тестируем ошибочный запрос", async () => {
      const action = { type: fetchEvents.rejected.type, payload: "Error" };
      const newState = eventsReducer(initialState, action);

      expect(newState).toEqual({
        events: [],
        loading: false,
        success: false,
        error: "Error",
      });
    });
  });
  describe("тестируем экшн addEvent", () => {
    it("тестируем запрос addEvent", () => {
      const action = { type: addEvent.pending.type };
      const newState = eventsReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", async () => {
      const action = { type: addEvent.fulfilled.type, payload: mockEvent };
      const newState = eventsReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        events: [mockEvent],
        loading: false,
        success: true,
        error: null,
      });
    });
    it("тестируем ошибочный запрос", async () => {
      const action = { type: addEvent.rejected.type, payload: "Error" };
      const newState = eventsReducer(initialState, action);

      expect(newState).toEqual({
        events: [],
        loading: false,
        success: false,
        error: "Error",
      });
    });
  });
  describe("тестируем экшн editEvent", () => {
    it("тестируем запрос editEvent", async () => {
      const action = { type: editEvent.pending.type };
      const newState = eventsReducer(initialState, action);

      expect(newState).toEqual({
        events: [],
        loading: true,
        success: false,
        error: null,
      });
    });
    it("тестируем успешный запрос", async () => {
      const action = {
        type: editEvent.fulfilled.type,
        payload: editedMockEvent,
      };
      const newState = eventsReducer(
        { ...initialState, events: [mockEvent] },
        action
      );

      expect(newState).toEqual({
        ...initialState,
        events: [editedMockEvent],
        loading: false,
        success: true,
        error: null,
      });
    });
  });
  describe('тестируем экшн removeEvent', () => {
    it('тестируем запрос removeEvent', async () => {
      const action = {type: removeEvent.pending.type}
      const newState = eventsReducer(initialState, action)

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null
      })
    })
    it('тестируем успешный запрос', async () => {
      const action = {type: removeEvent.fulfilled.type, payload: mockEvent.id}
      const newState = eventsReducer({
        ...initialState,
        events: [mockEvent]
      }, action)

      expect(newState).toEqual({
        ...initialState,
        events: [],
        loading: false,
        error: null,
        success: true
      })
    })
  })
});
