import { DoughnutData, StackedBarData } from "../model/graphic.model";

export interface IActualMonthDataAction {
  isLoading: boolean,
  isSuccess: boolean,
  buyProductQuantityByCategoryAndMonth: DoughnutData<number> | null,
  soldProductQuantityByCategoryAndMonth: DoughnutData<number> | null,
  buyProductPriceByCategoryAndMonth: DoughnutData<number> | null,
  soldProductPriceByCategoryAndMonth: DoughnutData<number> | null,
  soldAndBuyProductPriceByMonth: StackedBarData<number> | null,
  soldAndBuyProductQuantityByMonth: StackedBarData<number> | null
}
