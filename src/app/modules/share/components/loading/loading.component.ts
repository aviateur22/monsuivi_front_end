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
  isProductDetailLoading$ =  this._store.pipe(select(productSelector.isProductDetailLoading));

  // Chargement en cours de la creation d'un produit
  isAddProductLoading$ = this._store.pipe(select(productSelector.selectIsAddProductLoading));

  // Chargement des produits d'un vendeur
  isSellerProductsLoading$ = this._store.pipe(select(productSelector.selectIsGetSellerProductsLoading));

  // En cours de désactivation d'un produit depuis la liste
  isDesactivateProductLoading$ = this._store.pipe(select(productSelector.isDesactivateProductLoading));

  // Chargement des données statitique du mois
  isActualStatisticalMonthLoading$ = this._store.pipe(select(statisticalSelector.selectIsActualMonthDataLoading));

  // Activation d'un produit
  isActivateProductLoading$ = this._store.pipe(select(productSelector.isActivateProductLoadingSelector));

  constructor(private _store: Store<IAppState>) {
  }
}
