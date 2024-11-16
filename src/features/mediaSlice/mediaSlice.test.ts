import { TVideo } from "services/types";
import mediaReducer, {
  addVideo,
  editVideo,
  fetchVideos,
  initialState,
  removeVideo,
} from "./mediaSlice";

const mockVideo: TVideo = {
  title: "Test Video",
  url: "https://www.youtube.com/embed/VIDEO_ID",
  id: "VIDEO_ID",
};

const editedMockVideo: TVideo = {
  title: "Edited Test Video",
  url: "https://www.youtube.com/embed/VIDEO_ID",
  id: "VIDEO_ID",
};

describe("тестируем mediaSlice", () => {
  it("тестируем начальное состояние", () => {
    expect(mediaReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
  describe("тестируем экшн fetchVideos", () => {
    it("тестируем запрос fetchVideos", async () => {
      const action = { type: fetchVideos.pending.type };
      const newState = mediaReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", async () => {
      const action = { type: fetchVideos.fulfilled.type, payload: [mockVideo] };
      const newState = mediaReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        videos: [mockVideo],
        loading: false,
        success: true,
        error: null,
      });
    });
    it("тестируем неуспешный запрос", async () => {
      const action = { type: fetchVideos.rejected.type, payload: "Error" };
      const newState = mediaReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: "Error",
      });
    });
  });
  describe("тестируем экшн addVideo", () => {
    it("тестируем запрос addVideo", () => {
      const action = { type: addVideo.pending.type };
      const newState = mediaReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", () => {
      const action = { type: addVideo.fulfilled.type, payload: mockVideo };
      const newState = mediaReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        videos: [mockVideo],
        loading: false,
        success: true,
        error: null,
      });
    });
    it("тестируем неуспешный запрос", () => {
      const action = { type: addVideo.rejected.type, payload: "Error" };
      const newState = mediaReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: "Error",
      });
    });
  });
  describe("tестируем экшн editVideo", () => {
    it("тестируем запрос editVideo", () => {
      const action = { type: editVideo.pending.type };
      const newState = mediaReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", () => {
      const action = {
        type: editVideo.fulfilled.type,
        payload: editedMockVideo,
      };
      const newState = mediaReducer(
        { ...initialState, videos: [mockVideo] },
        action
      );

      expect(newState).toEqual({
        ...initialState,
        videos: [editedMockVideo],
        loading: false,
        success: true,
        error: null,
      });
    });
    it("тестируем неуспешный запрос", () => {
      const action = { type: editVideo.rejected.type, payload: "Error" };
      const newState = mediaReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: "Error",
      });
    });
  });
  describe("тестируем экшн removeVideo", () => {
    it('тестируем запрос removeVideo', async () => {
      const action= { type: removeVideo.pending.type };
      const newState = mediaReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    })
    it('тестируем успешный запрос', async () => {
      const action= { type: removeVideo.fulfilled.type, payload: mockVideo.id };
      const newState = mediaReducer({...initialState, videos: [mockVideo]}, action);

      expect(newState).toEqual({
        ...initialState,
        videos: [],
        loading: false,
        success: true,
        error: null,
      });
    })
    it('тестируем неуспешный запрос', async () => {
      const action= { type: removeVideo.rejected.type, payload: "Error" };
      const newState = mediaReducer(initialState, action);  

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: "Error",
      })
    })
  })
});
