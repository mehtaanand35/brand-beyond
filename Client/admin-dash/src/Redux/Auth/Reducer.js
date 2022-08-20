import { AuthActionTypes } from "./ActionType";

const intialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const AuthReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionTypes.USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
      // Set Token in localstorage
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case AuthActionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AuthActionTypes.REGISTER_FAIL:
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.AUTH_ERROR:
    case AuthActionTypes.LOGOUT:
      // Remove Token in localstorage
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
