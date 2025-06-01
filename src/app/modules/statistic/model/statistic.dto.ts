import { IDoughnutDataDto } from "./doughnut.dto";
import { IStackedBarDataDto } from "./stacked-bar.dto";

/**
 * Quantité vente et achat par catégorie et mois
 */
export interface ISoldAndBuyProductQuantityByCategoryAndMonthDto<T> {
  doughnutChartDataProductSold: IDoughnutDataDto<T>,
  doughnutChartDataProductBuy: IDoughnutDataDto<T>
}

/**
 * Prix vente et achat par catégorie et mois
 */
export interface ISoldAndBuyProductPriceByCategoryAndMonthDto<T> {
  doughnutChartDataProductSold: IDoughnutDataDto<T>,
  doughnutChartDataProductBuy: IDoughnutDataDto<T>
}

/**
 * Prix vente et achat par catégorie et année
 */
export interface ISoldAndBuyProductPriceByCategoryAndYearDto<T> {
  doughnutChartDataProductSold: IDoughnutDataDto<T>,
  doughnutChartDataProductBuy: IDoughnutDataDto<T>
}

/**
 * Quantité vente et achat par catégorie et année
 */
export interface ISoldAndBuyProductQuantityByCategoryAndYearDto<T> {
  doughnutChartDataProductSold: IDoughnutDataDto<T>,
  doughnutChartDataProductBuy: IDoughnutDataDto<T>
}

/**
 * Quantité vente et achat par année
 */
export interface ISoldAndBuyProductQuantityByYearDto<T> {
  stackedBarChartProductPrice: IStackedBarDataDto<T>
}

/**
 * Prix vente et achat par année
 */
export interface ISoldAndBuyProductPriceByYearDto<T> {
  stackedBarChartProductPrice: IStackedBarDataDto<T>
}
