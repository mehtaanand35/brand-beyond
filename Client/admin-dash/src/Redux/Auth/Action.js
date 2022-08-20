import axios from "axios";
import { toast } from "react-toastify";
import { AuthActionTypes } from "./ActionType";
import { SetAuthToken } from "../../Helper/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("https://anand-mehta.herokuapp.com/api/user");
    dispatch({
      type: AuthActionTypes.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: AuthActionTypes.AUTH_ERROR,
    });
  }
};
export const register =
  ({ name, email, password, role }) =>
  async (dispatch) => {
    // Config header for axios
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Set body
    const body = JSON.stringify({
      name,
      email,
      password,
      role,
    });

    dispatch({
      type: AuthActionTypes.SET_LOADING,
    });
    try {
      // Response
      const res = await axios.post(
        "https://anand-mehta.herokuapp.com/api/user/register",
        body,
        config
      );

      dispatch({
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => toast.error(error.msg));
      }

      dispatch({
        type: AuthActionTypes.REGISTER_FAIL,
      });
    }
  };

export const login =
  ({ email, password, role }) =>
  async (dispatch) => {
    // Config header for axios
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Set body
    const body = JSON.stringify({
      email,
      password,
      role,
    });

    dispatch({
      type: AuthActionTypes.SET_LOADING,
    });
    try {
      // Response
      const res = await axios.post(
        "https://anand-mehta.herokuapp.com/api/user/login",
        body,
        config
      );

      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => toast.error(error.msg));
      }

      dispatch({
        type: AuthActionTypes.LOGIN_FAIL,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: AuthActionTypes.LOGOUT,
  });
};
