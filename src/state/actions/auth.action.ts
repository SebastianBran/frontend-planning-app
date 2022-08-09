import { User } from "../../models/User.model";
import { AuthActionType } from "../action-types/auth.type";

export interface AuthLoginSucess {
  type: AuthActionType.LOGIN_SUCCESS;
  payload: {
    token: string;
    user: User;
  }
}

export interface AuthLoginFailure {
  type: AuthActionType.LOGIN_FAILURE;
}

export interface AuthLogout {
  type: AuthActionType.LOGOUT;
}

export type AuthAction = AuthLoginSucess | AuthLoginFailure | AuthLogout;