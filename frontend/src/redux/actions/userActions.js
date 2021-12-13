import Axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SWITCH_PHAN_QUYEN,
} from "../constants/userConstants";

export const login = (taikhoan, matkhau) => async (dispatch, getState) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const { data } = await Axios.post("/api/users/login", {
      taikhoan,
      matkhau,
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(getState().user.userInfo));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userInfo");
};

export const userSwitch = () => (dispatch, getState) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const newUserInfo = {
    ...userInfo,
    vaitro: "giamsatvung",
    vaitro2: "bophankd",
  };
  localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
  dispatch({ type: USER_SWITCH_PHAN_QUYEN, payload: newUserInfo });
};
