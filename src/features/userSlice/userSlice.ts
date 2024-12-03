import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getCookie, setCookie } from "services/cookie";
import { RootState } from "services/store/store";
import { TUser } from "services/types";

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const auth = getAuth();
      console.log(auth);
      const userCredential = await createUserWithEmailAndPassword(
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

        return { email, password, accessToken, refreshToken };
      }
    } catch (error: any) {
      let errorMessage = "Signup failed. Please try again later.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }
      console.log(errorMessage);
      dispatch(loginFailure(errorMessage));
      throw new Error(errorMessage);
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
    } catch (error: any) {
      let errorMessage = "Login failed. Please check your email or password.";

      dispatch(loginFailure(errorMessage));
      throw new Error(errorMessage);
      // return rejectWithValue(errorMessage)
    }
  }
);

// export const initializeAuth = createAsyncThunk(
//   "user/initialize",
//   async (_, { dispatch }) => {
//     try {
//       const accessToken = getCookie("accessToken");
//       if (accessToken) {
//         const auth = getAuth();
//         onAuthStateChanged(auth, (user) => {
//           if (user) {
//             const refreshToken = localStorage.getItem("refreshToken");
//             dispatch(
//               setUser({
//                 email: user.email || "",
//                 password: "",
//                 accessToken: accessToken || "",
//                 refreshToken: refreshToken || "",
//               })
//             );
//             dispatch(setIsAuthenticated(!!user));
//           } else {
//             dispatch(setIsAuthenticated(true));
//           }
//         });
//       }
//     } catch (err) {
//       loginFailure(err as string);
//     }
//   }
// );

const checkAuthState = (auth: ReturnType<typeof getAuth>): Promise<User | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

export const initializeAuth = createAsyncThunk(
  "user/initialize",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        const auth = getAuth();
        const user = await checkAuthState(auth);
        if (user) {
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
          dispatch(setIsAuthenticated(false));
        }
      } else {
        dispatch(setIsAuthenticated(false));
      }
    } catch (err) {
      dispatch(loginFailure(err as string));
    } finally {
      dispatch(setLoading(false)); // Гарантируем снятие состояния загрузки
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
  loading: true,
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
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
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
    setLoading: (state, action) => {
      state.loading = action.payload;
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
        state.error = action.error.message || "An error occurred";
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signUpUser.fulfilled,
        (state, action: PayloadAction<TUser | undefined>) => {
          state.success = true;
          state.loading = false;
          if (action.payload) state.user = action.payload;
        }
      )
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true; // Начало загрузки
        console.log(state.loading)
      })
      .addCase(initializeAuth.fulfilled, (state) => {
        state.loading = false; // Загрузка завершена
        console.log(state.loading)
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Initialization failed.";
      })
  },
});

export const {
  setUser,
  setIsAuthenticated,
  loginSuccess,
  loginFailure,
  logout,
  setLoading
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
