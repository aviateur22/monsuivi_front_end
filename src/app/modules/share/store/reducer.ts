import { createReducer, on } from "@ngrx/store";
import { IShareState } from "./state";
import * as shareAction from "./action";

export const initialShareState: IShareState = {
  message: null
}

export const reducers = createReducer(
  initialShareState,
  on(shareAction.displayMessageAction, (state, {message})=>({...state, message }))
)
