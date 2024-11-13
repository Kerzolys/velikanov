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
import { TBio } from "services/types";

export const fetchBio = createAsyncThunk(
  "bio/fetchBio",
  async (_, { rejectWithValue }) => {
    try {
      const bioRef = collection(db, "bio");
      const bioSnapshot = await getDocs(bioRef);
      const bioList = bioSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as TBio),
      }));
      console.log(bioList);
      return bioList;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const addBioText = createAsyncThunk(
  "bio/addBioText",
  async (paragraph: TBio, { rejectWithValue }) => {
    try {
      const bioRef = await addDoc(collection(db, "bio"), {
        ...paragraph,
      });
      return { ...paragraph, id: bioRef.id };
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const removeBioText = createAsyncThunk(
  "bio/removeBioText",
  async (paragraph: TBio, { rejectWithValue }) => {
    try {
      if (!paragraph.id) {
        throw new Error("Paragraph ID is required to remove bio text");
      }
      const bioRef = doc(db, "bio", paragraph.id);
      await deleteDoc(bioRef);
      return paragraph.id;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const editBioText = createAsyncThunk(
  'bio/editBioText',
  async (paragraph: TBio, { rejectWithValue }) => {
    try {
      if (!paragraph.id) {
        throw new Error("Paragraph ID is required to edit bio text");
      }
      const bioRef = doc(db, "bio", paragraph.id);
      await updateDoc(bioRef, { text: paragraph.text });
      return paragraph;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
)

export type BioState = {
  bio: TBio[];
  loading: boolean;
  success: boolean;
  error: string | null;
};

export const initialState: BioState = {
  bio: [],
  loading: false,
  success: false,
  error: null,
};

export const bioSlice = createSlice({
  name: "bio",
  initialState,
  reducers: {
    // setBio: (state, action: PayloadAction<TBio[]>) => {
    //   state.bio = action.payload;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBio.fulfilled, (state, action: PayloadAction<TBio[]>) => {
        state.loading = false;
        state.success = true;
        state.bio = action.payload;
      })
      .addCase(fetchBio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addBioText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBioText.fulfilled, (state, action: PayloadAction<TBio>) => {
        state.loading = false;
        state.success = true;
        state.bio.push(action.payload);
      })
      .addCase(addBioText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeBioText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBioText.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.bio = state.bio.filter((bio) => bio.id!== action.payload);
      })
  },
});

export const bioSelector = (state: RootState) => state.bio;
export default bioSlice.reducer;
