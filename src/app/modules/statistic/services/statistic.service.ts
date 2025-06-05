import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ISoldAndBuyProductPriceByCategoryAndMonthDto, ISoldAndBuyProductPriceByMonthDto, ISoldAndBuyProductQuantityByCategoryAndMonthDto, ISoldAndBuyProductQuantityByMonthDto } from "../model/statistic.dto";
import apiUrl from "../../../../misc/api.url";
import { SoldAndBuyProductPriceByCategoryAndMonth, SoldAndBuyProductPriceByMonth, SoldAndBuyProductQuantityByCategoryAndMonth, SoldAndBuyProductQuantityByMonth } from "../model/statistic.model";
import { StatisticMapperService } from "./statistic.mapper.service";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private _http: HttpClient, private _mapper: StatisticMapperService){}

  /**
   * Récupération des quantités de vente et achat par catégorie et pour un mois
   * @param {string} sellerId
   * @param {number} month
   * @param {number} year
   * @returns
   */
 getSoldAndBuyProductQuantityByCategoryAndMonth(sellerId: string, month: number, year: number): Observable<SoldAndBuyProductQuantityByCategoryAndMonth<number>> {
   console.log(`[StatisticService] - getSoldAndBuyProductQuantityByCategoryAndMonth`);
   let url = apiUrl.getSoldAndBuyProductQuantityByCategoryAndMonth.url
   .replace('{sellerId}', sellerId)
   .replace('{month}', month.toString())
   .replace('{year}', year.toString())

   return this._http.get<ISoldAndBuyProductQuantityByCategoryAndMonthDto<number>>(url).pipe(
    map(res => this._mapper.mapToSoldAndBuyProductQuantityByCategoryAndMonthModel(res)
    ));
 }

 /**
  * Récupération des données prix de vente et achat par catégorie et pour un mois
  * @param {string} sellerId
  * @param {number} month
  * @param {number} year
  * @returns
  */
 getSoldAndBuyProductPriceByCategoryAndMonth(sellerId: string, month: number, year: number): Observable<SoldAndBuyProductPriceByCategoryAndMonth<number>> {
  console.log(`[StatisticService] - getSoldAndBuyProductPriceByCategoryAndMonth`);
   let url = apiUrl.getSoldAndBuyProductPriceByCategoryAndMonth.url
   .replace('{sellerId}', sellerId)
   .replace('{month}', month.toString())
   .replace('{year}', year.toString())

   return this._http.get<ISoldAndBuyProductPriceByCategoryAndMonthDto<number>>(url).pipe(
    map(res=> this._mapper.mapToSoldAndBuyProductPriceByCategoryAndMonth(res))
   );
 }

 /**
  * Récupération des données prix vente et achat toutes catégorie confondue pour 1 mois
  * @param {string} sellerId
  * @param {number} month
  * @param {number} year
  * @returns {Observable<SoldAndBuyProductPriceByMonth<number>>}
  */
 getSoldAndBuyProductPriceByMonth(sellerId: string, month: number, year: number): Observable<SoldAndBuyProductPriceByMonth<number>> {
  console.log(`[StatisticService] - getSoldAndBuyProductPriceByMonth`);
   let url = apiUrl.getSoldAndBuyProductPriceByMonth.url
   .replace('{sellerId}', sellerId)
   .replace('{month}', month.toString())
   .replace('{year}', year.toString())

   return this._http.get<ISoldAndBuyProductPriceByMonthDto<number>>(url).pipe(
    map(res=> this._mapper.mapToSoldAndBuyProductPriceByMonth(res))
   );
 }

 /**
  * Récupération des quantités vente et achat toutes catégorie confondue pour 1 mois
  * @param {string} sellerId
  * @param {number} month
  * @param {number} year
  * @returns {Observable<SoldAndBuyProductQuantityByMonth<number>>}
  */
  getSoldAndBuyProductQuantityByMonth(sellerId: string, month: number, year: number): Observable<SoldAndBuyProductQuantityByMonth<number>> {
    console.log(`[StatisticService] - getSoldAndBuyProductQuantityByMonth`);
    let url = apiUrl.getSoldAndBuyProductQuantityByMonth.url
    .replace('{sellerId}', sellerId)
    .replace('{month}', month.toString())
    .replace('{year}', year.toString())

   return this._http.get<ISoldAndBuyProductQuantityByMonthDto<number>>(url).pipe(
    map(res=> this._mapper.mapToSoldAndBuyProductQuantityByMonth(res))
   );
 }

}
