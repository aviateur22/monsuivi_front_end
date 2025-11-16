import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { getActualYearDataAction } from './../../store/action';
import { take } from 'rxjs';
import { StackedBarData } from '../../model/graphic.model';
import { StatisticalDateService } from '../../services/statistical.date.service';
import * as statisticalSelector from './../../store/selector';
import { ActifSeller } from '../../../auth/models/actif-seller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actual-year-graphic-page',
  templateUrl: './actual-year-graphic-page.component.html',
  styleUrl: './actual-year-graphic-page.component.css'
})
export class ActualYearGraphicPageComponent extends ActifSeller implements OnInit {

  soldAndBuyProductPriceByYear$ = this._store.pipe(select(statisticalSelector.selectSoldAndBuyProductPriceByYear));
  soldAndBuyProductQuantityByYear$ = this._store.pipe(select(statisticalSelector.selectSoldAndBuyProductQuantityByYear));

  constructor(
    protected override _store: Store<IAppState>,
    protected override _router: Router,
    private _statiscalDateService: StatisticalDateService) {
      super(_store, _router);
    }

  ngOnInit(): void {
    this.getGraphicalData();
  }

  /**
   * Récupération des données de l'année
   */
  getGraphicalData() {
    this.isSellerAuthentified()
    .pipe(take(1))
    .subscribe(sellerId => {

      if(!sellerId)
        return;

      this._store.dispatch(getActualYearDataAction({
        sellerId,
        year: this._statiscalDateService.getActualYear()
      }));
    });
  }

}
