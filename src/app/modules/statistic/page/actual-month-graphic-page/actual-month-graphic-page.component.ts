import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { SellerService } from '../../../auth/service/seller.service';
import { getActualMonthDataAction } from '../../store/action';
import { StatisticalDateService } from '../../services/statistical.date.service';
import { take } from 'rxjs';
import * as statisticalSelector from './../../store/selector';
import { ActifSeller } from '../../../auth/models/actif-seller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actual-month-graphic-page',
  templateUrl: './actual-month-graphic-page.component.html',
  styleUrl: './actual-month-graphic-page.component.css'
})
export class ActualMonthGraphicPageComponent extends ActifSeller implements OnInit {

  // Données des graphique
  buyProductQuantityByCategoryAndMonth$ = this._store.pipe(select(statisticalSelector.selectBuyProductPriceByCategoryAndMonth));
  soldProductQuantityByCategoryAndMonth$ = this._store.pipe(select(statisticalSelector.selectSoldProductPriceByCategoryAndMonth));
  buyProductPriceByCategoryAndMonth$ = this._store.pipe(select(statisticalSelector.selectBuyProductQuantityByCategoryAndMonth));
  soldProductPriceByCategoryAndMonth$ = this._store.pipe(select(statisticalSelector.selectSoldProductQuantityByCategoryAndMonth));
  soldAndBuyProductPriceByMonth$ = this._store.pipe(select(statisticalSelector.selectSoldAndBuyProductPriceByMonth));
  soldAndBuyProductQuantityByMonth$ = this._store.pipe(select(statisticalSelector.selectSoldAndBuyProductQuantityByMonth));

  constructor(
    protected override _router: Router,
    protected override _store: Store<IAppState>, private _userService: SellerService,
    private _statiscalDateService: StatisticalDateService) {
      super(_store, _router);
    }

  ngOnInit() {
    this.getMonthData();
  }

  /**
   * Récupération des données du mois
   */
  getMonthData() {
    this.isSellerAuthentified()
    .pipe(take(1))
    .subscribe(sellerId => {

      if(!sellerId)
        return;

      this._store.dispatch(getActualMonthDataAction({
        sellerId,
        month: this._statiscalDateService.getActualMonth(),
        year: this._statiscalDateService.getActualYear()
      }));
    })

  }
}
