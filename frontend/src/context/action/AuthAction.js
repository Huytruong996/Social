import { AuthConstants } from "../constants/ActionConstant";
import axiosInstance from "../../helpers/AxiosInstance";

export const LoginAction = (history, user) => async (dispatch) => {
  await dispatch({
    type: AuthConstants.LOGIN_START,
  });
  try {
    const res = await axiosInstance(history).post("/api/users/login", {
      email: user.email,
      password: user.password,
    });

    const { accessToken, refreshToken, ...rest } = res.data;
    localStorage.setItem("user", JSON.stringify(rest));
    await dispatch({
      type: AuthConstants.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    await dispatch({
      type: AuthConstants.LOGIN_FAILURE,
      payload: e.data,
    });
  }
};

export const LogoutAction = (history) => async (dispatch) => {
  try {
    await axiosInstance(history).post("/api/users/logout");
    await dispatch({
      type: AuthConstants.LOGOUT_SUCCESS,
    });
    window.location.reload();
    await localStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

export const GetUserAction = async (userId) => {
  try {
    const res = await axiosInstance().get(`/api/users?userId=${userId}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const GetFriendAction = async (userId) => {
  try {
    const res = await axiosInstance().get(`/api/users/friends/${userId}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
