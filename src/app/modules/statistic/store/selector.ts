import { createSelector } from "@ngrx/store";
import { IAppState } from "../../../store/state";

export const selector = (state: IAppState)=> state.statisticalState;

export const selectBuyProductQuantityByCategoryAndMonth = createSelector(selector, (state)=>state.actualMonthDataAction.buyProductQuantityByCategoryAndMonth);
export const selectSoldProductQuantityByCategoryAndMonth = createSelector(selector, (state)=>state.actualMonthDataAction.soldProductQuantityByCategoryAndMonth);
export const selectBuyProductPriceByCategoryAndMonth = createSelector(selector, (state)=>state.actualMonthDataAction.buyProductPriceByCategoryAndMonth);
export const selectSoldProductPriceByCategoryAndMonth = createSelector(selector, (state)=>state.actualMonthDataAction.soldProductPriceByCategoryAndMonth);
export const selectIsActualMonthDataLoading = createSelector(selector, (state)=>state.actualMonthDataAction.isLoading);
