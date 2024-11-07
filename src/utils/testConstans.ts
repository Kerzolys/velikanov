import { UserState } from "features/userSlice/userSlice";
import { TUser } from "services/types";

export const mockUser: TUser = {
  email: "test@example.com",
  password: "password123",
  accessToken: "access_token",
  refreshToken: "refresh_token",
}

export const mockAuth: UserState = {
  user: mockUser,
  isAuthenticated: true,
  success: true,
  loading: false,
  error: null,
}