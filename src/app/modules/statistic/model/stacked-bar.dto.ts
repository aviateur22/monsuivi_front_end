/**
 * Representation des donnée
 */
export interface IStackedBarDataSetDto<T> {
  type: string,
  label: string,
  backgroundColor: string,
  touchBackgroundColor: string,
  values: T[]
}

/**
 *
 */
export interface IStackedBarValueDto<T> {
  axisLabels: string[],
  datasets: IStackedBarDataSetDto<T>[]
}

/**
 * Wrapper pour les données StackedBar
 */
export interface IStackedBarWrapperDto<T> {
  data: IStackedBarValueDto<T>
}

/**
 * Contient les données
 */
export interface IStackedBarDataDto<T> {
  data: IStackedBarWrapperDto<T>,
  responseMessage: string
}

