import { mockAuth, mockUser } from "utils/testConstans";
import userReducer, {
  initialState,
  loginSuccess,
  loginUser,
  logout,
  setIsAuthenticated,
  setUser,
} from "./userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn().mockResolvedValue({
    user: {
      getIdToken: jest.fn().mockResolvedValue("access_token"),
      refreshToken: "refresh_token",
    },
  }),
}));

describe("тестируем UserSlice", () => {
  it("проверяем начальное состояние", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  }),
    describe("тестируем экшн setUser", () => {
      it("проверяем установкупользователя", () => {
        const testAuth = mockAuth;
        const action = {
          type: setUser.type,
          payload: testAuth.user,
        };
        const newState = userReducer(initialState, action);

        expect(newState).toEqual({
          ...initialState,
          user: testAuth.user,
          isAuthenticated: true,
          success: true,
          loading: false,
          error: null,
        });
      });
    });
  describe("тестируем экшн logout", () => {
    it("проверяем отсутствие данных пользователя", () => {
      const testAuth = mockAuth;
      const action = {
        type: logout.type,
      };
      const newState = userReducer(testAuth, action);

      expect(newState).toEqual(initialState);
    });
  });
  describe("тестируем экшн setIsAuthenticated", () => {
    it("проверяем авторизацию пользователя", () => {
      const testAuth = mockAuth;
      const action = {
        type: setIsAuthenticated.type,
        payload: true,
      };
      const newState = userReducer(testAuth, action);

      expect(newState).toEqual({
        ...testAuth,
        isAuthenticated: true,
      });
    });
  })
    // describe("тестируем экшн loginUser", () => {
    //   it("проверяем вход пользователя", async () => {
    //     const testAuth = {
    //       email: mockUser.email,
    //       password: mockUser.password,
    //     };
    //     const testUser = {
    //       email: testAuth.email,
    //       password: testAuth.password,
    //       accessToken: mockUser.accessToken,
    //       refreshToken: mockUser.refreshToken,
    //     };
    //     const dispatch = jest.fn();
    //     const thunk = loginUser(testAuth);

    //     await thunk(dispatch, () => initialState, null);

    //     expect(dispatch).toHaveBeenCalledWith({ type: 'user/loginUser/pending' });
    //     expect(dispatch).toHaveBeenCalledWith(
    //       setUser({
    //         email: testUser.email,
    //         password: testUser.password,
    //         accessToken: testUser.accessToken,
    //         refreshToken: testUser.refreshToken,
    //       })
    //     );
    //     expect(dispatch).toHaveBeenCalledWith(loginSuccess(true));
    //     expect(dispatch).toHaveBeenCalledWith({ type: 'user/loginUser/fulfilled' });
    //     expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'user/loginUser/fulfilled' }));
    //   });
    // });
});
