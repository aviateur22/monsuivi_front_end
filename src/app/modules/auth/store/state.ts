import { ILogin, IRegister } from "./model";

export interface IAuthState {
  login: ILogin,
  register: IRegister
}
