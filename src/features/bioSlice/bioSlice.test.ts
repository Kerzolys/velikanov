import { TBio } from "services/types";
import bioReducer, {
  addBioText,
  editBioText,
  fetchBio,
  initialState,
  removeBioText,
} from "./bioSlice";

const mockBio: TBio = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  position: 1,
};

const editedMockBio: TBio = {
  text: "Duis consectetur, turpis eget commodo mollis, neque urna bibendum ligula, at sollicitudin neque ligula id massa.",
  position: 1,
};

describe("тестируем bioSlice", () => {
  it("тестируем начальное состояние", () => {
    expect(bioReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("тестируем экшн fetchBio", () => {
    it("тестируем запрос fetchBio", async () => {
      const action = { type: fetchBio.pending.type };
      const newState = bioReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", async () => {
      const action = { type: fetchBio.fulfilled.type, payload: [mockBio] };
      const newState = bioReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        bio: [mockBio],
        loading: false,
        success: true,
        error: null,
      });
    });
    it("тестируем неуспешный запрос", async () => {
      const action = { type: fetchBio.rejected.type, payload: "Error" };
      const newState = bioReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: "Error",
      });
    });
  });
  describe("тестируем экшн addBioText", () => {
    it("тестируем addBioText", async () => {
      const action = { type: addBioText.pending.type };
      const newState = bioReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", async () => {
      const action = { type: addBioText.fulfilled.type, payload: mockBio };
      const newState = bioReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        bio: [mockBio],
        loading: false,
        success: true,
        error: null,
      });
    });
    it("тестируем неуспешный запрос", async () => {
      const action = { type: addBioText.rejected.type, payload: "Error" };
      const newState = bioReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: "Error",
      });
    });
  });
  describe("тестируем экшн editBioText", () => {
    it("тестируем editBioText", async () => {
      const action = { type: editBioText.pending.type };
      const newState = bioReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", async () => {
      const action = {
        type: editBioText.fulfilled.type,
        payload: editedMockBio,
      };
      const newState = bioReducer({ ...initialState, bio: [mockBio] }, action);

      expect(newState).toEqual({
        ...initialState,
        bio: [editedMockBio],
        loading: false,
        success: true,
        error: null,
      });
    });
    it("тестируем неуспешный запрос", async () => {
      const action = { type: editBioText.rejected.type, payload: "Error" };
      const newState = bioReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: "Error",
      });
    });
  });
  describe("тестируем экшн removeBioText", () => {
    it("тестируем запрос removeBioText", async () => {
      const action = { type: removeBioText.pending.type };
      const newState = bioReducer(initialState, action);

      expect(newState).toEqual({
       ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", async () => {
      const action = {
        type: removeBioText.fulfilled.type,
        payload: mockBio.id,
      };
      const newState = bioReducer({...initialState, bio: [mockBio]}, action);

      expect(newState).toEqual({
        bio: [],
        loading: false,
        success: true,
        error: null,
      });
    });
    it("тестируем неуспешный запрос", async () => {
      const action = { type: removeBioText.rejected.type, payload: "Error" };
      const newState = bioReducer(initialState, action);

      expect(newState).toEqual({
       ...initialState,
        loading: false,
        error: "Error",
      });
    });
  });
});
