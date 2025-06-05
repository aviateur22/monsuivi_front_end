import { Injectable } from "@angular/core";
import { IDoughnutDataDto } from "../model/doughnut.dto";
import { DoughnutData, DoughnutDataset, StackedBarData, StackedBarDataset } from "../model/graphic.model";
import { IStackedBarDataDto } from "../model/stacked-bar.dto";
import { ISoldAndBuyProductPriceByCategoryAndMonthDto, ISoldAndBuyProductPriceByMonthDto, ISoldAndBuyProductQuantityByCategoryAndMonthDto, ISoldAndBuyProductQuantityByMonthDto } from "../model/statistic.dto";
import { SoldAndBuyProductPriceByCategoryAndMonth, SoldAndBuyProductPriceByMonth, SoldAndBuyProductQuantityByCategoryAndMonth, SoldAndBuyProductQuantityByMonth } from "../model/statistic.model";

@Injectable({
  providedIn: "root"
})
export class StatisticMapperService {

  /**
   * Map un DoughnutDataDto en DoughnutData
   * @param {IDoughnutDataDto} dto
   * @returns DoughnutData
   */
  mapToDoughnutDataModel<T>(dto: IDoughnutDataDto<T>): DoughnutData<T> {
    console.log(`[StatisticMapperService] - [mapToDoughnutDataModel]`);
    console.log(`[StatisticMapperService] - [mapToDoughnutDataModel] - dto:`);
    console.log(dto);

    // Labels du graphique de type doughnuts
    let labels = dto.data.data.axisLabels;

    console.log(`[StatisticMapperService] - [mapToDoughnutDataModel] - labels:`);
    console.log(labels);

    // Données composant le dataset de type DoughnutDataset pour le graphique de type Doughnut
    let hoverBackgroundColor: string[] = dto.data.data.dataSet.touchBackgroundColors;
    console.log(`[StatisticMapperService] - [mapToDoughnutDataModel] - hoverBackgroundColor:`);
    console.log(hoverBackgroundColor);

    let backgroundColor: string[] = dto.data.data.dataSet.backgroundColors;
    console.log(`[StatisticMapperService] - [mapToDoughnutDataModel] - backgroundColor:`);
    console.log(backgroundColor);

    let data: T[] = dto.data.data.dataSet.values;
    console.log(`[StatisticMapperService] - [mapToDoughnutDataModel] - data:`);
    console.log(data);


    // Construction d'un array de DoughnutDataset
    let doughnutDatasets: DoughnutDataset<T>[] = [new DoughnutDataset<T>(data, backgroundColor, hoverBackgroundColor)];

    console.log(`[StatisticMapperService] - [mapToDoughnutDataModel] - DoughnutData:`);
    console.log(new DoughnutData<T>(labels, doughnutDatasets, dto.responseMessage))

    // Renvoie le resultat
    return new DoughnutData<T>(labels, doughnutDatasets, dto.responseMessage);

  }

  /**
   * Map un IStackedBarDataDto en StackedBarData
   * @param {IStackedBarDataDto} dto
   * @returns {StackedBarData}
   */
  mapToStackedBarData<T>(dto: IStackedBarDataDto<T>): StackedBarData<T> {
     console.log(`[StatisticMapperService] - [mapToStackedBarData]`);
     console.log(dto)

    // Labels du graphique de type StackedBar
    let labels = dto.data.data.axisLabels;

    // Construction d'un array de StackedBarDataset
    let dataset: StackedBarDataset<T>[] = dto.data.data.datasets.map(data=>{
      return new StackedBarDataset(
        data.type,
        data.label,
        data.backgroundColor,
        data.touchBackgroundColor,
        data.values
      )
    });

    // Renvoie le resultat
    return new StackedBarData(labels, dataset, dto.responseMessage);
  }

  /**
   * Map ISoldAndBuyProductQuantityByCategoryAndMonthDto vers SoldAndBuyProductQuantityByCategoryAndMonth
   * @param {ISoldAndBuyProductQuantityByCategoryAndMonthDto} dto
   * @returns {SoldAndBuyProductQuantityByCategoryAndMonth}
   */
  mapToSoldAndBuyProductQuantityByCategoryAndMonthModel<T>(dto: ISoldAndBuyProductQuantityByCategoryAndMonthDto<T>): SoldAndBuyProductQuantityByCategoryAndMonth<T> {
    return new SoldAndBuyProductQuantityByCategoryAndMonth<T>(
          this.mapToDoughnutDataModel(dto.doughnutChartDataProductSold),
          this.mapToDoughnutDataModel(dto.doughnutChartDataProductBuy)
        );
  }

  /**
   * Map ISoldAndBuyProductPriceByCategoryAndMonthDto vers SoldAndBuyProductPriceByCategoryAndMonth
   * @param {ISoldAndBuyProductPriceByCategoryAndMonthDto} dto
   * @returns {SoldAndBuyProductPriceByCategoryAndMonth}
   */
  mapToSoldAndBuyProductPriceByCategoryAndMonth<T>(dto:ISoldAndBuyProductPriceByCategoryAndMonthDto<T>): SoldAndBuyProductPriceByCategoryAndMonth<T> {
    return new SoldAndBuyProductPriceByCategoryAndMonth(
      this.mapToDoughnutDataModel(dto.doughnutChartDataProductSold),
      this.mapToDoughnutDataModel(dto.doughnutChartDataProductBuy)
    );
  }

  /**
   * Map un ISoldAndBuyProductPriceByMonthDto vers un model SoldAndBuyProductPriceByMonth
   * @param {ISoldAndBuyProductPriceByMonthDto} dto
   * @returns {SoldAndBuyProductPriceByMonth}
   */
  mapToSoldAndBuyProductPriceByMonth<T>(dto: ISoldAndBuyProductPriceByMonthDto<T>): SoldAndBuyProductPriceByMonth<T> {
    console.log(`[StatisticMapperService] - [mapToSoldAndBuyProductPriceByMonth]`);
    console.log(dto)
    console.log(dto.stackedBarChartDataProductPrice)

    return new SoldAndBuyProductPriceByMonth(
      this.mapToStackedBarData(dto.stackedBarChartDataProductPrice)
    )
  }

  /**
   * Map un ISoldAndBuyProductPriceByMonthDto vers un model SoldAndBuyProductPriceByMonth
   * @param {ISoldAndBuyProductPriceByMonthDto} dto
   * @returns {SoldAndBuyProductPriceByMonth}
   */
  mapToSoldAndBuyProductQuantityByMonth<T>(dto: ISoldAndBuyProductQuantityByMonthDto<T>): SoldAndBuyProductQuantityByMonth<T> {
    return new SoldAndBuyProductQuantityByMonth(
      this.mapToStackedBarData(dto.stackedBarChartDataProductQuantity)
    )
  }


}
