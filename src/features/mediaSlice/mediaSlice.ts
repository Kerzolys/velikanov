import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { RootState } from "services/store/store";
import { TVideo } from "services/types";

export const fetchVideos = createAsyncThunk(
  "media/fetchVideos",
  async (_, { rejectWithValue }) => {
    try {
      const videoRef = collection(db, "media");
      const videoSnapshot = await getDocs(videoRef);
      const videoList = videoSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as TVideo),
      }));
      return videoList;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const addVideo = createAsyncThunk(
  "media/addVideo",
  async (video: TVideo, { rejectWithValue }) => {
    try {
      const videoRef = collection(db, "media");
      await addDoc(videoRef, video);
      return video;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const editVideo = createAsyncThunk(
  "media/editVideo",
  async (video: TVideo, { rejectWithValue }) => {
    try {
      if (!video.id) {
        throw new Error("Video ID is required");
      }
      const videoRef = doc(db, "media", video.id);
      await updateDoc(videoRef, {
        title: video.title,
        url: video.url,
      });
      return video;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const removeVideo = createAsyncThunk(
  "media/removeVideo",
  async (video: TVideo, { rejectWithValue }) => {
    try {
      if (!video.id) {
        throw new Error("Video ID is required");
      }
      const videoRef = doc(db, "media", video.id);
      await deleteDoc(videoRef);
      return video.id;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export type mediaState = {
  videos: TVideo[];
  loading: boolean;
  success: boolean;
  error: string | null;
};

export const initialState: mediaState = {
  videos: [],
  loading: false,
  success: false,
  error: null,
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchVideos.fulfilled,
        (state, action: PayloadAction<TVideo[]>) => {
          state.loading = false;
          state.success = true;
          state.videos = action.payload;
        }
      )
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideo.fulfilled, (state, action: PayloadAction<TVideo>) => {
        state.loading = false;
        state.success = true;
        state.videos.push(action.payload);
      })
      .addCase(addVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editVideo.fulfilled, (state, action: PayloadAction<TVideo>) => {
        state.loading = false;
        state.success = true;
        const editedVideo = state.videos.find(
          (video) => video.id === action.payload.id
        );
        if (editedVideo) {
          editedVideo.title = action.payload.title;
          editedVideo.url = action.payload.url;
        }
      })
      .addCase(editVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeVideo.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.success = true;
          state.videos = state.videos.filter(
            (video) => video.id !== action.payload
          );
        }
      )
      .addCase(removeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const mediaSelector = (state: RootState) => state.media;

export default mediaSlice.reducer;
