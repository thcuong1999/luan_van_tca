import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SWITCH_PHAN_QUYEN,
} from "../constants/userConstants";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, message: action.payload };
    case USER_LOGOUT:
      return {};
    case USER_SWITCH_PHAN_QUYEN:
      return { userInfo: action.payload };

    default:
      return state;
  }
};
