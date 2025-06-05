import { Injectable } from "@angular/core";
import { StatisticService } from "../services/statistic.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as statisticAction from "./action";
import * as shareAction from "./../../share/store/action";
import { mergeMap, of, switchMap, catchError, forkJoin } from "rxjs";

@Injectable()
export class StatisticalEffect {
  constructor(private _action$: Actions, private _statisticService: StatisticService) {}

  // getActualMonthDataAction$ = createEffect(()=>
  //   this._action$.pipe(
  //     ofType(statisticAction.getActualMonthDataAction),
  //     mergeMap(({sellerId, month, year})=>
  //       this._statisticService.getSoldAndBuyProductPriceByCategoryAndMonth(sellerId, month, year).pipe(
  //         switchMap(result=>[
  //           statisticAction.getActualMonthDataActionComplete({data: result}),
  //           shareAction.displayMessageAction({message:{isOnError: false, title: 'Données mois en cours' , message: ""}})
  //         ]),
  //         catchError(error=> of(
  //           shareAction.displayMessageAction({
  //           message: {title: 'Données mois en cours', message: error.error.error, isOnError: true}
  //         })))
  //       )
  //     )
  //   )
  // )

    getActualMonthDataActions$ = createEffect(()=>
    this._action$.pipe(
      ofType(statisticAction.getActualMonthDataAction),
      mergeMap(({sellerId, month, year})=>
        forkJoin({
          prices: this._statisticService.getSoldAndBuyProductPriceByCategoryAndMonth(sellerId, month, year),
          quantities:this._statisticService.getSoldAndBuyProductQuantityByCategoryAndMonth(sellerId, month, year),
          totalPrices: this._statisticService.getSoldAndBuyProductPriceByMonth(sellerId, month, year),
          totalQuantities: this._statisticService.getSoldAndBuyProductQuantityByMonth(sellerId, month, year)
        }).pipe(
          switchMap(({prices, quantities,totalPrices, totalQuantities})=>[
            statisticAction.getActualMonthDataActionComplete({prices: prices, quantities: quantities, totalPrices: totalPrices, totalQuantities: totalQuantities}),
            shareAction.displayMessageAction({message:{isOnError: false, title: 'Données mois en cours' , message: ""}})
          ]),
          catchError(error=> of(
            statisticAction.getActualMonthDataActionFailed(),
            shareAction.displayMessageAction({
            message: {title: 'Données mois en cours', message: error.error.error, isOnError: true}
          })))
        )
      )
    )
  )
}
