import { Store } from "@ngrx/store";
import { IAppState } from "../../../store/state";
import * as productActions from "../store/action";
import { ProductsFilterVisibilityService } from "../services/products-filter-visibility.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
/**
 * Methode commune pour les filtre de produit
 */
export class FilterProduct {

  private readonly CLEAR_FILTER_CATEGORY_CODE = '';
  private readonly CLEAR_FILTER_PRODUCT_NAME = '';
  private readonly CLEAR_FILTER_REGISTER_PERIOD = 0;
  private readonly CLEAR_FILTER_SELLER_ID = '';
  private readonly CLEAR_FILTER_SOLD_PRODUCT_VISIBILITY = false;

 constructor( private _productsFilterVisibilityService: ProductsFilterVisibilityService, private _store: Store<IAppState>){}

  clearFilter(sellerId: string) {
      this._store.dispatch(productActions.getSellerProductsAction({
       sellerId
      }));

      // Vide le contenu du filtre
      this._store.dispatch(productActions.updateProductFilterValueAction({filterValue: {
        filterByCategoryCode: this.CLEAR_FILTER_CATEGORY_CODE,
        filterByName: this.CLEAR_FILTER_PRODUCT_NAME,
        filterByRegisterPeriod: this.CLEAR_FILTER_REGISTER_PERIOD,
        sellerId: this.CLEAR_FILTER_SELLER_ID,
        areSoldProductVisible: this.CLEAR_FILTER_SOLD_PRODUCT_VISIBILITY
      }}));

      // Masque le filtre sur petit écran
      if(!this._productsFilterVisibilityService.hasFilterBarTobeDisplayed())
        this._productsFilterVisibilityService.hideProductsFilter();

      // Suppression du button suppression du filtre pour le mobile
      this._store.dispatch(productActions.clearButtonfilterVisibilityAction({isFilterClearButtonVisible: false}));
  }

}
