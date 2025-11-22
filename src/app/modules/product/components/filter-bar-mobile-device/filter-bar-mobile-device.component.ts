import { Component } from '@angular/core';
import { ProductsFilterVisibilityService } from '../../services/products-filter-visibility.service';
import { IAppState } from '../../../../store/state';
import { select, Store } from '@ngrx/store';
import * as selector from '../../store/selector';
import { Observable, of, take } from 'rxjs';
import { ActifSeller } from '../../../auth/models/actif-seller';
import { Router } from '@angular/router';
import { FilterProduct } from '../../model/filter-product';

@Component({
  selector: 'app-filter-bar-mobile-device',
  templateUrl: './filter-bar-mobile-device.component.html',
  styleUrl: './filter-bar-mobile-device.component.css'
})
export class FilterBarMobileDeviceComponent extends ActifSeller {

  isButtonFilterVisible$: Observable<boolean> = this._productsFilterVisibilityService.isButtonFilterVisible$;
  isClearFilterButtonVisible$: Observable<boolean> = of(false);
  constructor(
    private _filterProduct: FilterProduct,
    private _productsFilterVisibilityService: ProductsFilterVisibilityService,
    protected override _router: Router,
    protected override _store: Store<IAppState>) {
      super(_store, _router);
    }

  ngOnInit() {
    this.isClearFilterButtonVisible$ = this._store.pipe(select(selector.clearButtonFilterVisibility));
  }

  /**
   * Affichage du filtre
   */
  displayProductsFilter(): void {
    this._productsFilterVisibilityService.displayProductsFilter();
  }

  /**
   * Suppression du filtre des produits
   */
  clearFilter() {

    this.isSellerAuthentified()
    .pipe(take(1))
    .subscribe( sellerId => {

      if(!sellerId)
        return;

      this._filterProduct.clearFilter(sellerId);
    });
  }
}
