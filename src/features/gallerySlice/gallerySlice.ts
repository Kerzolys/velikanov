import { DeleteObjectCommand, ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { RootState } from "services/store/store";
import { TImage } from "services/types";
import { s3 } from "services/yandexCloud";

export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",
  async (_, { rejectWithValue }) => {
    try {
      const galleryRef = collection(db, "photos");
      const gallerySnapshot = await getDocs(galleryRef);
      const galleryList = gallerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as TImage),
      }));
      return galleryList;
    } catch (err) {
      return rejectWithValue(err as string);
    }
  }
);

export const addPhoto = createAsyncThunk(
  'photos/addPhoto',
  async (photo: TImage, { rejectWithValue }) => {
    try {
      const galleryRef = collection(db, 'photos')
      await addDoc(galleryRef, photo)
      return photo
    }
    catch (err) {
      return rejectWithValue(err as string);
    }
  }
)

export const uploadPhoto = createAsyncThunk(
  "photos/uploadPhoto",
  async (
    { file, title }: { file: File; title: string },
    { rejectWithValue }
  ) => {
    try {
      const bucketName = process.env.REACT_APP_YANDEX_BUCKET_NAME || "";
      const fileName = `${Date.now()}_${file.name}`;

      const uploadParams = {
        Bucket: bucketName,
        Key: fileName,
        Body: file,
        ContentType: file.type,
        ACL: ObjectCannedACL.public_read,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      const link = `https://storage.yandexcloud.net/${bucketName}/${fileName}`;
      // console.log(link);
      const photo: TImage = {link, title}
      const galleryRef = collection(db, 'photos')
      await addDoc(galleryRef, photo)
      return photo;

      // return { link, title };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removePhoto = createAsyncThunk(
  "photos/removePhoto",
  async (photo: TImage, { rejectWithValue }) => {
    try {
      const bucket = process.env.REACT_APP_YANDEX_BUCKET_NAME || "";
      const key = photo.link.split(`${bucket}/`)[1];
      if (!key) {
        throw new Error("Invalid photo link");
      }
      const deleteParams = {
        Bucket: bucket,
        Key: key,
      };

      await s3.send(new DeleteObjectCommand(deleteParams));

      const photoId = photo.id
      if(!photoId) {
        throw new Error("Photo ID is required");
      }
      const galleryRef = doc(db, "photos", photoId);
      await deleteDoc(galleryRef);

      return {key, photoId};
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export type galleryState = {
  gallery: TImage[];
  loading: boolean;
  success: boolean;
  error: string | null;
};

export const initialState: galleryState = {
  gallery: [],
  loading: false,
  success: false,
  error: null,
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPhotos.fulfilled,
        (state, action: PayloadAction<TImage[]>) => {
          state.loading = false;
          state.success = true;
          state.gallery = action.payload;
        }
      )
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.gallery = [...state.gallery, action.payload];
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.gallery = state.gallery.filter(
          (image) => image.link !== action.payload.key
        );
      })
      .addCase(removePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const gallerySelector = (state: RootState) => state.gallery;
export default gallerySlice.reducer;
