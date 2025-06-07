import { createReducer, on } from "@ngrx/store";
import { IStatisticState } from "./state";
import * as statisticAction from "./action";

export const initialStatisticState: IStatisticState = {
  /**
   * Mois en cours
   */
  actualMonthDataAction: {
    isLoading: false,
    isSuccess: false,
    buyProductPriceByCategoryAndMonth: null,
    soldProductPriceByCategoryAndMonth: null,
    buyProductQuantityByCategoryAndMonth: null,
    soldProductQuantityByCategoryAndMonth: null,
    soldAndBuyProductPriceByMonth: null,
    soldAndBuyProductQuantityByMonth: null
  },

  /**
   * Année en cours
   */
  actualYearDataAction: {
    isLoading: false,
    isSuccess: false,
    soldAndBuyProductPriceByYear: null,
    soldAndBuyProductQuantityByYear: null
  }
}

export const reducers = createReducer(
  initialStatisticState,
  on(statisticAction.getActualMonthDataAction, (state)=>({...state, actualMonthDataAction: {
    ...state.actualMonthDataAction, isLoading: true
  }})),
  on(statisticAction.getActualMonthDataActionComplete, (state, {prices, quantities, totalPrices, totalQuantities})=>({
    ...state, actualMonthDataAction: {
      ...state.actualMonthDataAction,
      isLoading: false,
      isSuccess: true,
      buyProductPriceByCategoryAndMonth: prices.doughnutChartDataProductBuy,
      soldProductPriceByCategoryAndMonth: prices.doughnutChartDataProductSold,
      buyProductQuantityByCategoryAndMonth: quantities.doughnutChartDataProductBuy,
      soldProductQuantityByCategoryAndMonth: quantities.doughnutChartDataProductSold,
      soldAndBuyProductPriceByMonth: totalPrices.stackedBarChartProductPrice,
      soldAndBuyProductQuantityByMonth: totalQuantities.stackedBarChartProductQunatity

    }
  })),
  on(statisticAction.getActualMonthDataActionFailed, (state)=>({
    ...state, actualMonthDataAction: {
      ...state.actualMonthDataAction, isLoading: false
    }
  })),
    on(statisticAction.getActualYearDataAction, (state)=>({...state, actualYearDataAction: {
    ...state.actualYearDataAction, isLoading: true
  }})),
   on(statisticAction.getActualYearDataActionComplete, (state, { totalPrices, totalQuantities })=>({
    ...state, actualYearDataAction: {
      ...state.actualYearDataAction,
      isLoading: false,
      isSuccess: true,
      soldAndBuyProductPriceByYear: totalPrices.stackedBarChartProductPrice,
      soldAndBuyProductQuantityByYear: totalQuantities.stackedBarChartProductQuantity
    }
  })),
    on(statisticAction.getActualYearDataActionFailed, (state)=>({
    ...state, actualYearDataAction: {
      ...state.actualYearDataAction, isLoading: false
    }
  }))
)
