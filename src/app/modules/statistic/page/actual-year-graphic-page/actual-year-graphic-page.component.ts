import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { getActualYearDataAction } from './../../store/action';
import { UserService } from '../../../../users/service/user.service';
import { Observable, of } from 'rxjs';
import { StackedBarData } from '../../model/graphic.model';
import { StatisticalDateService } from '../../services/statistical.date.service';
import * as statisticalSelector from './../../store/selector';

@Component({
  selector: 'app-actual-year-graphic-page',
  templateUrl: './actual-year-graphic-page.component.html',
  styleUrl: './actual-year-graphic-page.component.css'
})
export class ActualYearGraphicPageComponent implements OnInit {

  soldAndBuyProductPriceByYear$ : Observable<StackedBarData<number> | null> = of(null);
  soldAndBuyProductQuantityByYear$ : Observable<StackedBarData<number> | null> = of(null);

  // Utilisateur
  user = this._userService.getUser();

  constructor(private _store: Store<IAppState>, private _userService: UserService, private _statiscalDateService: StatisticalDateService) {}

  ngOnInit(): void {
      this.soldAndBuyProductPriceByYear$ = this._store.pipe(select(statisticalSelector.selectSoldAndBuyProductPriceByYear));
      this.soldAndBuyProductQuantityByYear$ = this._store.pipe(select(statisticalSelector.selectSoldAndBuyProductQuantityByYear));

    if(!this.user)
      return;

    this._store.dispatch(getActualYearDataAction({
      sellerId: this.user.userId,
      year: this._statiscalDateService.getActualYear()
    }));

  }

}
