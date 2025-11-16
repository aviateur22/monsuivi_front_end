import { createReducer, on } from "@ngrx/store";
import { IAuthState } from "./state";
import * as authAction from "./action";

export const initialAuthState: IAuthState = {
  login: {
    actifSeller: JSON.parse(localStorage.getItem('actifSeller') || 'null'),
    isLoading: false,
    isSuccess: false
  }
}

export const reducers = createReducer(
  initialAuthState,
  on(authAction.loginActionComplete, (state, { dto }) => ({...state, login : {
    isLoading: false,
    isSuccess: true,
    actifSeller: {
      ...state.login.actifSeller,
      roles: dto.roles,
      userId: dto.id
    }
  }})),
  on(authAction.loginActionFailed, (state) => ({
    ...state, login : {
      ...state.login,
      isLoading: false,
      isSuccess: false
    }
  })),
  on(authAction.logoutAction, (state) => ({
    ...authAction, login: {
      actifSeller: null,
      isLoading: false,
      isSuccess: false
    }
  }))

)
