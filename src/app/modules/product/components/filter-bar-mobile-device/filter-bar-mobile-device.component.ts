import { Component } from '@angular/core';
import { ProductsFilterVisibilityService } from '../../services/products-filter-visibility.service';
import { IAppState } from '../../../../store/state';
import { select, Store } from '@ngrx/store';
import * as selector from '../../store/selector';
import * as action from '../../store/action';
import { Observable, of, Subject } from 'rxjs';
import { UserService } from '../../../../users/service/user.service';

@Component({
  selector: 'app-filter-bar-mobile-device',
  templateUrl: './filter-bar-mobile-device.component.html',
  styleUrl: './filter-bar-mobile-device.component.css'
})
export class FilterBarMobileDeviceComponent {
  private destroy$ = new Subject<void>();

  isButtonFilterVisible: boolean = true;
  isClearFilterButtonVisible$: Observable<boolean> = of(false);
  constructor(
    private _userService: UserService,
    private _productsFilterVisibilityService: ProductsFilterVisibilityService,
    private _store: Store<IAppState>) {}

  ngOnInit() {

    this._productsFilterVisibilityService.isButtonFilterVisible$.subscribe(isVisible=>{
      this.isButtonFilterVisible = isVisible
    });

    this.isClearFilterButtonVisible$ = this._store.pipe(select(selector.clearButtonFilterVisibility))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Affichage du filtre
   */
  displayProductsFilter(): void {
    this._productsFilterVisibilityService.displayProductsFilter();
  }

  /**
   * Suppression du filtrafe
   */
  clearFilter() {

    // Fake sellerId
    const sellerId = this._userService.getUser()?.userId;

     if(!sellerId)
      throw new Error("IDentifiant non définit");

    this._store.dispatch(action.getSellerProductsAction({
     sellerId: sellerId,
     areSoldProductVisible: false
    }));

    // Vide le contenu du filtre
    this._store.dispatch(action.updateProductFilterValueAction({filterValue: {
      filterByCategoryCode: '',
      filterByName: '',
      filterByRegisterPeriod: 0,
      sellerId: '',
      areSoldProductVisible: false
    }}));

    // Suppression du button suppression du filtre pour le mobile
    this._store.dispatch(action.clearButtonfilterVisibilityAction({isFilterClearButtonVisible: false}));
  }
}
