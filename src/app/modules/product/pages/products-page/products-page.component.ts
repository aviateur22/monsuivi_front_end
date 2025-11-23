import { Component } from '@angular/core';
import { combineLatest, Observable, take } from 'rxjs';
import { IAppState } from '../../../../store/state';
import { select, Store } from '@ngrx/store';
import { getSellerProductsAction, filterSellerProductsAction } from '../../store/action';
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
    productQuantity$: Observable<number> =  this._store.pipe(select(productSelector.selectProductsQuantitySelector));
    productFilterValue$ = this._store.pipe(select(productSelector.filterProductValueSelector));

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

      combineLatest([
        this.isSellerAuthentified().pipe(take(1)),
        this.productFilterValue$.pipe(take(1))
      ]).subscribe(([sellerId, values]) => {

        const filterIsActive =
          values.areSoldProductVisible ||
          values.filterByCategoryCode ||
          values.filterByName ||
          values.filterByRegisterPeriod;

        if(sellerId && filterIsActive){
          console.log("Le filre est actif - Filtrage des produits ");
          return this._store.dispatch(filterSellerProductsAction({productFilterValue: values }));
        }

        if(sellerId) {
          console.log("Produits non filtrés");
          this._store.dispatch(getSellerProductsAction({ sellerId }));
        }
      });
    }

    /**
     * Affichage du filtre
     */
    displayProductsFilter(): void {
      this._productsFilterVisibilityService.displayProductsFilter();
    }
}
