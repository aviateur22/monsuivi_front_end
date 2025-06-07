import { createAction, props } from "@ngrx/store";
import { SoldAndBuyProductPriceByCategoryAndMonth, SoldAndBuyProductPriceByMonth, SoldAndBuyProductPriceByYear, SoldAndBuyProductQuantityByCategoryAndMonth, SoldAndBuyProductQuantityByMonth, SoldAndBuyProductQuantityByYear } from "../model/statistic.model";

export const getActualMonthDataAction = createAction('[Get actual month data action] get actual month data action', props<{sellerId: string, month: number, year: number}>());
export const getActualMonthDataActionComplete = createAction('[Get actual month data action complete] get actual month data action complete',
  props<{
    prices: SoldAndBuyProductPriceByCategoryAndMonth<number>,
    quantities: SoldAndBuyProductQuantityByCategoryAndMonth<number>,
    totalPrices: SoldAndBuyProductPriceByMonth<number>,
    totalQuantities: SoldAndBuyProductQuantityByMonth<number>
  }>());
export const getActualMonthDataActionFailed = createAction('[Get actual month data action failed], get actual month data action failed');

export const getActualYearDataAction = createAction('[Get actual year data action] get actual year data action', props<{sellerId: string, year: number}>());
export const getActualYearDataActionComplete = createAction('[Get actual year data action complete] get actual year data action complete',
  props<{
    totalPrices: SoldAndBuyProductPriceByYear<number>,
    totalQuantities: SoldAndBuyProductQuantityByYear<number>
  }>());
export const getActualYearDataActionFailed = createAction('[Get actual year data action failed], get actual year data action failed');
