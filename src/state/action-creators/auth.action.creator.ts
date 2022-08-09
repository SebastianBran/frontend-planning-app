import jwtDecode from "jwt-decode";
import { AuthAction } from "../actions/auth.action";
import { Dispatch } from "redux";
import { User } from "../../models/User.model";
import { AuthActionType } from "../action-types/auth.type";

export const loginSuccess = (
  token: string,
  user: User,
  navigate: () => void
): AuthAction => {
  localStorage.setItem("token", token);
  navigate();
  return {
    type: AuthActionType.LOGIN_SUCCESS,
    payload: {
      token: token,
      user: user,
    },
  };
};

export const loginFailure = (): AuthAction => {
  localStorage.removeItem("token");
  return {
    type: AuthActionType.LOGIN_FAILURE,
  };
};

export const logout = (): AuthAction => {
  localStorage.removeItem("token");
  return {
    type: AuthActionType.LOGOUT,
  };
};

export const userLogin = (token: string, navigate: () => void) => {
  return (dispatch: Dispatch<AuthAction>) => {
    try {
      const decoded: User = jwtDecode(token);
      return dispatch(loginSuccess(token, decoded, navigate));
    } catch (error) {
      return dispatch(loginFailure());
    }
  };
};
