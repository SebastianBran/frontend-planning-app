import { User } from "../../models/User.model";
import { AuthActionType } from "../action-types/auth.type";
import { AuthAction } from "../actions/auth.action"

export interface IAuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  statusText: string | null;
}

const initialState: IAuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  statusText: null,
}

const authReducer = (state: IAuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        statusText: "Login successful",
      }
    case AuthActionType.LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        statusText: "Login failed",
      }
    case AuthActionType.LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        statusText: "Logout successful",
      }
    default:
      return state;
  }
}

export default authReducer;