import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { get } from "http";
import { getCookie, setCookie } from "services/cookie";
import { RootState } from "services/store/store";
import { TUser } from "services/types";

export const singUpUser = createAsyncThunk(
  "user/signUpUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      if (user) {
        const accessToken = await user.getIdToken();
        const refreshToken = user.refreshToken;
        dispatch(setUser({ email, password, accessToken, refreshToken }));
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(loginSuccess(true));
      }
    } catch (error) {
      dispatch(loginFailure(error as string));
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        const accessToken = await user.getIdToken();
        const refreshToken = user.refreshToken;
        dispatch(setUser({ email, password, accessToken, refreshToken }));
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(loginSuccess(true));
      }
    } catch (err) {
      dispatch(loginFailure(err as string));
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "user/initialize",
  async (_, { dispatch }) => {
    try {
      const accessToken = getCookie("accessToken");
      console.log(accessToken)
      if (accessToken) {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user)
            const refreshToken = localStorage.getItem("refreshToken");
            dispatch(
              setUser({
                email: user.email || "",
                password: "",
                accessToken: accessToken || "",
                refreshToken: refreshToken || "",
              })
            );
            dispatch(setIsAuthenticated(true));
          } else {
            dispatch(setIsAuthenticated(true));
          }
        });
      }
    } catch (err) {
      loginFailure(err as string);
    }
  }
);

export type UserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  success: boolean;
  loading: boolean;
  error: string | null;
};

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  success: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.success = true;
      state.loading = false;
      state.error = null;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload as string;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.success = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("refreshToken");
      document.cookie = "accessToken=;";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(singUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singUpUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(singUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      });
  },
});

export const {
  setUser,
  setIsAuthenticated,
  loginSuccess,
  loginFailure,
  logout,
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
