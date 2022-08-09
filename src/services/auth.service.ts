import { UserLogin } from "../models/UserLogin.model";
import { UserRegister } from "../models/UserRegister.mode";
import http from "./http-common";

class AuthService {
  login(credentials: UserLogin) {
    return { call: http.post("/auth/login", credentials) };
  }

  register(data: UserRegister) {
    return { call: http.post("/auth/register", data) };
  }
}

export default new AuthService();
