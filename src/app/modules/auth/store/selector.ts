import { createSelector } from "@ngrx/store";
import { IAppState } from "../../../store/state";

export const selector = (state: IAppState) => state.authState;

export const actifSellerSelector = createSelector(selector, (state)=>state.login.actifSeller);


