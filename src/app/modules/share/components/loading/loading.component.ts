import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '../../../../store/state';
import * as productSelector from '../../../product/store/selector';
import * as statisticalSelector from '../../../statistic/store/selector';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  // Chargement des détails d'un produit
  isProductDetailLoading$: Observable<boolean>;

  // Chargement en cours de la creation d'un produit
  isAddProductLoading$: Observable<boolean>;

  // En cours de désactivation d'un produit depuis la liste
  isDesactivateProductLoading$: Observable<boolean>;

  // Chargement des données statitique du mois
  isActualStatisticalMonthLoading$: Observable<boolean>;

  constructor(private _store: Store<IAppState>) {
    this.isProductDetailLoading$ = this._store.pipe(select(productSelector.isProductDetailLoading));
    this.isAddProductLoading$ = this._store.pipe(select(productSelector.selectIsAddProductLoading));
    this.isDesactivateProductLoading$ = this._store.pipe(select(productSelector.isDesactivateProductLoading));
    this.isActualStatisticalMonthLoading$ = this._store.pipe(select(statisticalSelector.selectIsActualMonthDataLoading));
  }
}
