import { DoughnutData, StackedBarData } from "./graphic.model"

/**
 * Quantité vente et achat par catégorie et mois
 */
export class SoldAndBuyProductQuantityByCategoryAndMonth<T> {
  constructor(
    public readonly doughnutChartDataProductSold: DoughnutData<T>,
    public readonly doughnutChartDataProductBuy: DoughnutData<T>
  ){}
}

/**
 * Prix vente et achat par catégorie et mois
 */
export class SoldAndBuyProductPriceByCategoryAndMonth<T> {
  constructor(
    public readonly doughnutChartDataProductSold: DoughnutData<T>,
    public readonly doughnutChartDataProductBuy: DoughnutData<T>
  ) {}
}

/**
 * Prix vente et achat par catégorie et année
 */
export class SoldAndBuyProductPriceByCategoryAndYear<T> {
  constructor(
    public readonly doughnutChartDataProductSold: DoughnutData<T>,
    public readonly doughnutChartDataProductBuy: DoughnutData<T>
  ) {}
}

/**
 * Quantité vente et achat par catégorie et année
 */
export class SoldAndBuyProductQuantityByCategoryAndYear<T> {
  constructor(
    public readonly doughnutChartDataProductSold: DoughnutData<T>,
    public readonly   doughnutChartDataProductBuy: DoughnutData<T>
  ) {}
}

/**
 * Quantité vente et achat par année
 */
export class SoldAndBuyProductQuantityByYear<T> {
  constructor(
    public readonly  stackedBarChartProductPrice: StackedBarData<T>,
  ) {}
}

/**
 * Prix vente et achat par année
 */
export class SoldAndBuyProductPriceByYear<T> {
  constructor(
    public readonly  stackedBarChartProductPrice: StackedBarData<T>
  ) {}
}

/**
 * Quantité vente et achat pour un mois
 */
export class SoldAndBuyProductQuantityByMonth<T> {
  constructor(
    public readonly  stackedBarChartProductQunatity: StackedBarData<T>,
  ) {}
}

/**
 * Prix total vente et achat pour 1 mois
 */
export class SoldAndBuyProductPriceByMonth<T> {
  constructor(
    public readonly  stackedBarChartProductPrice: StackedBarData<T>
  ) {}
}
