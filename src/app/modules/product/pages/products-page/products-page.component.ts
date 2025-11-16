import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IAppState } from '../../../../store/state';
import { select, Store } from '@ngrx/store';
import { getSellerProductsAction } from '../../store/action';
import * as productSelector from '../../store/selector';
import { SummarizeProduct } from '../../model/product.model';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ProductsFilterVisibilityService } from '../../services/products-filter-visibility.service';
import { ActifSeller } from '../../../auth/models/actif-seller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(40px)' }),
          stagger(100, [
            animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProductsPageComponent extends ActifSeller {
    isLoading$: Observable<boolean> = this._store.pipe(select(productSelector.selectIsGetSellerProductsLoading));
    sellerProducts$: Observable<SummarizeProduct[]> = this._store.pipe(select(productSelector.selectGetSellerProducts));
    isFilterVisible: Observable<boolean> = this._productsFilterVisibilityService.isFilterProductsVisible$;
    isButtonFilterVisible: Observable<boolean> = this._productsFilterVisibilityService.isButtonFilterVisible$;

    constructor(
      private _productsFilterVisibilityService: ProductsFilterVisibilityService,
      protected override  _router: Router,
      protected override _store: Store<IAppState>) {
        super(_store, _router);
    }

    ngOnInit() {
      this.displaySellerProducts();
    }

    /**
     * Affichage des produits
     */
    displaySellerProducts() {
       this.isSellerAuthentified()
       .pipe(take(1))
        .subscribe(sellerId => {
        if(sellerId)
          this._store.dispatch(getSellerProductsAction({ sellerId, areSoldProductVisible: false }));
      });
    }

    /**
     * Affichage du filtre
     */
    displayProductsFilter(): void {
      this._productsFilterVisibilityService.displayProductsFilter();
    }
}
