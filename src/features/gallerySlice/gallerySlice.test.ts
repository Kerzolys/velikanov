import galleryReducer, { editPhoto, gallerySlice, initialState, removePhoto, uploadPhoto } from "./gallerySlice";

const mockUploadPhoto = {
  link: "https://storage.yandexcloud.net/velikanov-gallery/1645883563691_example.jpg",
  title: "Example Photo",
};

const mockEditedPhoto = {
  link: "https://storage.yandexcloud.net/velikanov-gallery/1645883563691_example.jpg",
  title: "Edited Example Photo",
};

describe("тестируем gallerySlice", () => {
  it("тестируем initialState", () => {
    expect(galleryReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });
  describe("тестируем экшн uploadPhoto", () => {
    it("тестируем запрос uploadPhoto", async () => {
      const action = {type: uploadPhoto.pending.type};
      const newState = galleryReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", async () => {
      const action = {
        type: uploadPhoto.fulfilled.type,
        payload: mockUploadPhoto,
      };
      const newState = galleryReducer(initialState, action);

      expect(newState).toEqual({
        loading: false,
        success: true,
        error: null,
        gallery: [mockUploadPhoto],
      });
    });
    it("тестируем неуспешный запрос", async () => {
      const action = {
        type: uploadPhoto.rejected.type,
        payload: "Error",
      };
      const newState = galleryReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: "Error",
      });
    });
  });
  describe("тестируем экшн removePhoto", () => {
    it("тестируем запрос removePhoto", async () => {
      const action = {type: removePhoto.pending.type};
      const newState = galleryReducer(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
    it("тестируем успешный запрос", async () => {
      const action = {
        type: removePhoto.fulfilled.type,
        payload: mockUploadPhoto.link,
      };
      const newState = galleryReducer({...initialState, gallery: [mockUploadPhoto]}, action);

      expect(newState).toEqual({
        ...initialState,
        loading: false,
        success: true,
        error: null,
        gallery: [],
      });
    });
    it("тестируем неуспешный запрос", async () => {
      const action = {
        type: removePhoto.rejected.type,
        payload: "Error",
      };
      const newState = galleryReducer(initialState, action);

      expect(newState).toEqual({
       ...initialState,
        loading: false,
        error: "Error",
      });
    })
  })
  describe('тестируем экшн editPhoto', () => {
    it('тестируем запрос editPhoto', async () => {
    const action = {type: editPhoto.pending.type};
    const newState = galleryReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
    })
    it('тестируем успешный запрос', async () => {
      const action = {
        type: editPhoto.fulfilled.type,
        payload: mockEditedPhoto,
      };
      const newState = galleryReducer({...initialState, gallery: [mockUploadPhoto]}, action);

      expect(newState).toEqual({
        loading: false,
        success: true,
        error: null,
        gallery: [{...mockUploadPhoto,...mockEditedPhoto}],
      });
    })
    it('тестируем неуспешный запрос', async () => {
      const action = {
        type: editPhoto.rejected.type,
        payload: "Error",
      };
      const newState = galleryReducer(initialState, action);

      expect(newState).toEqual({
       ...initialState,
        loading: false,
        error: "Error",
      });
    })


  })
});
