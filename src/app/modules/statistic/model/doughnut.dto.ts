

/**
 * Representation des donnée
 */
export interface IDoughnutValueDataSetDto<T> {
  backgroundColors: string[],
  touchBackgroundColors: string[],
  values: T[]
}

/**
 * Données representant les Doughnut
 */
export interface IDoughnutValueDto<T> {
  axisLabels: string[],
  dataSet: IDoughnutValueDataSetDto<T>
}

/**
 * Wrapper pour les données Doughnut
 */
export interface IDoughnutWrapperDto<T> {
  data: IDoughnutValueDto<T>
}

/**
 * Contient les données
 */
export interface IDoughnutDataDto<T> {
  data: IDoughnutWrapperDto<T>,
  responseMessage: string
}
