import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { UserService } from '../../../../users/service/user.service';
import { getActualMonthDataAction } from '../../store/action';
import { StatisticalDateService } from '../../services/statistical.date.service';
import { Observable, of } from 'rxjs';
import { DoughnutData, StackedBarData } from '../../model/graphic.model';
import * as statisticalSelector from './../../store/selector';

@Component({
  selector: 'app-actual-month-graphic-page',
  templateUrl: './actual-month-graphic-page.component.html',
  styleUrl: './actual-month-graphic-page.component.css'
})
export class ActualMonthGraphicPageComponent implements OnInit {
  // Utilisateur
  user = this._userService.getUser();

  // Données des graphique
  buyProductQuantityByCategoryAndMonth$: Observable< DoughnutData<number> | null> = of(null);
  soldProductQuantityByCategoryAndMonth$: Observable< DoughnutData<number> | null> = of(null);
  buyProductPriceByCategoryAndMonth$: Observable< DoughnutData<number> | null> = of(null);
  soldProductPriceByCategoryAndMonth$: Observable< DoughnutData<number> | null> = of(null);
  soldAndBuyProductPriceByMonth$ : Observable<StackedBarData<number> | null> = of(null);
  soldAndBuyProductQuantityByMonth$ : Observable<StackedBarData<number> | null> = of(null);

  constructor(private _store: Store<IAppState>, private _userService: UserService, private _statiscalDateService: StatisticalDateService) {}

  ngOnInit() {
    this.buyProductPriceByCategoryAndMonth$ = this._store.pipe(select(statisticalSelector.selectBuyProductPriceByCategoryAndMonth));
    this.soldProductPriceByCategoryAndMonth$ = this._store.pipe(select(statisticalSelector.selectSoldProductPriceByCategoryAndMonth));
    this.buyProductQuantityByCategoryAndMonth$ = this._store.pipe(select(statisticalSelector.selectBuyProductQuantityByCategoryAndMonth));
    this.soldProductQuantityByCategoryAndMonth$ = this._store.pipe(select(statisticalSelector.selectSoldProductQuantityByCategoryAndMonth));
    this.soldAndBuyProductPriceByMonth$ = this._store.pipe(select(statisticalSelector.selectSoldAndBuyProductPriceByMonth));
    this.soldAndBuyProductQuantityByMonth$ = this._store.pipe(select(statisticalSelector.selectSoldAndBuyProductQuantityByMonth));

    if(!this.user)
      return;

    this._store.dispatch(getActualMonthDataAction({
      sellerId: this.user.userId,
      month: this._statiscalDateService.getActualMonth(),
      year: this._statiscalDateService.getActualYear()
    }));
  }
}
