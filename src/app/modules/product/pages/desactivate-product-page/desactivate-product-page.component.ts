import { Component, OnInit } from '@angular/core';
import { getSellerDesactivateProductsAction } from '../../store/action';
import * as productSelector from '../../store/selector';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { SummarizeProduct } from '../../model/product.model';
import { Router } from '@angular/router';
import { IAppState } from '../../../../store/state';
import { ActifSeller } from '../../../auth/models/actif-seller';

@Component({
  selector: 'app-desactivate-product-page',
  templateUrl: './desactivate-product-page.component.html',
  styleUrl: './desactivate-product-page.component.css'
})
export class DesactivateProductPageComponent extends ActifSeller implements OnInit {
  isLoading$: Observable<boolean> = this._store.pipe(select(productSelector.selectIsGetSellerProductsLoading));
  sellerProducts$: Observable<SummarizeProduct[]> = this._store.pipe(select(productSelector.selectGetSellerProducts));

  constructor(
    protected override  _router: Router,
    protected override _store: Store<IAppState>) {
      super(_store, _router);
  }
  ngOnInit(): void {
    this.displaySellerProducts();
  }

   /**
   * Affichage des produits
   */
  displaySellerProducts() {

    this.isSellerAuthentified()
    .pipe(take(1))
    .subscribe(sellerId => {
      if(!sellerId)
        return;

      return this._store.dispatch(getSellerDesactivateProductsAction({ sellerId }));
    });
  }
}
