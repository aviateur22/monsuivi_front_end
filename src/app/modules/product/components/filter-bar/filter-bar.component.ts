import { Component, OnInit } from '@angular/core';
import { IFilterProductByCategoryDto, IFilterProductByMaxAgeDto } from '../../model/product.dto';
import { ProductsFilterVisibilityService } from '../../services/products-filter-visibility.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { filterProductsFieldsValidator } from '../../validators/filterFields.validator';
import { SellerService } from '../../../auth/service/seller.service';
import { IAppState } from '../../../../store/state';
import { select, Store } from '@ngrx/store';
import { filterSellerProductsAction , getSellerProductsAction, updateProductFilterValueAction, clearButtonfilterVisibilityAction} from '../../store/action';
import { filterProductValueSelector } from '../../store/selector';
import { MapperService } from '../../services/mapper.service';
import { ActifSeller } from '../../../auth/models/actif-seller';
import { Router } from '@angular/router';
import { combineLatest, take, takeUntil } from 'rxjs';
import { FilterProduct } from '../../model/filter-product';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent extends ActifSeller implements OnInit {

  isClosedButtonFilterVisible$ = this._productsFilterVisibilityService.isClosedButtonFilterVisible$;

  //Données du filtre
  productFilterByCategories$ = this._productService.getProductCategories();
  productFilterByMaxAges$ = this._productService.getFilterProductByMaxAge();

  /**
   * Données du produit a modifier
   */
    filterProductsFG: FormGroup = this._fb.group({
      filterByName: [''],
      productCategory:  [''],
      dateRegisterSelect: [''],
      areSoldProductVisible: ['']
    });

  constructor(
    private _filterProduct: FilterProduct,
    private _productsFilterVisibilityService: ProductsFilterVisibilityService,
    private _fb: FormBuilder,
    private _mapper: MapperService,
    private _productService: ProductService,
    protected override _router: Router,
    protected override _store: Store<IAppState>){
      super(_store, _router);
    }

  ngOnInit(): void {
   this.setFilterProductValue();
  }

  /**
   * Recharge la selection du filtre faite par le vendeur
   */
  setFilterProductValue() {
    combineLatest([
      this.productFilterByCategories$,
      this.productFilterByMaxAges$,
      this._store.pipe(select(filterProductValueSelector))])
    .pipe(take(1))
    .subscribe(([catgegories, ages, filterValues]) => {
      this.filterProductsFG.patchValue({
        filterByName: filterValues.filterByName ?? '',
        productCategory: catgegories!.find(c => c.code === filterValues.filterByCategoryCode),
        dateRegisterSelect: filterValues.filterByRegisterPeriod ?? '',
        areSoldProductVisible: filterValues.areSoldProductVisible
      });
    });
  }


  closedFilterProducts(): void {
    this._productsFilterVisibilityService.hideProductsFilter();
  }

  fiterProducts(): void {
    this.isSellerAuthentified()
    .pipe(take(1))
    .subscribe(sellerId => {

      if(!sellerId)
        return;

      // Si filtrage pas valide
      if(!filterProductsFieldsValidator(this.filterProductsFG)) {
        this.filterProductsFG.setErrors({atLeastOneFieldAvailable: true});
        return;
      }

      this._store.dispatch(filterSellerProductsAction({
        productFilterValue: this._mapper.mapToIFilterProductInputsDto(this.filterProductsFG, sellerId)
      }));


      // Masque le filtre sur petit écran
      if(!this._productsFilterVisibilityService.hasFilterBarTobeDisplayed())
        this._productsFilterVisibilityService.hideProductsFilter();
    });
  }


  resteFilter(): void {
    this.isSellerAuthentified()
    .pipe(take(1))
    .subscribe( sellerId => {

      if(!sellerId)
        return;

      this._filterProduct.clearFilter(sellerId);
    });
  }

  inputFocus(): void {
    this._productsFilterVisibilityService.isInputFocused = true;
  }

  /**
   * Ajout d'un setTimeOut suite a un bug sur telephone mobile
   */
  inputLoseFocus(): void {
    // Ajout d'un délais
    // Cela permets de ne pas masquer le filtre sur mobile avec le clavier virtuel
    // lors du focusout de l'input
    setTimeout(()=>{
      this._productsFilterVisibilityService.isInputFocused = false;
    }, 500)
  }
}
