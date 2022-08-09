import { Role } from "./User.model";

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  role: Role;
}