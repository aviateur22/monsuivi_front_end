import { Component, OnInit } from '@angular/core';
import { IProductCategoryIhmDto } from '../../model/product.dto';
import { ProductsFilterVisibilityService } from '../../services/products-filter-visibility.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { filterProductsFieldsValidator } from '../../validators/filterFields.validator';
import { UserService } from '../../../../users/service/user.service';
import { IAppState } from '../../../../store/state';
import { Store } from '@ngrx/store';
import { filterSellerProductsAction } from '../../store/action';
import { MapperService } from '../../services/mapper.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent implements OnInit {
  isClosedButtonFilterVisible: boolean = true;
  productCategories! :  IProductCategoryIhmDto[] | undefined;

   user = this._userService.getUser();

  dateRegisterOptions: any[] = [
    { name: "1 semaine", value: 1 },
    { name: "1 mois", value: 2 },
    { name: "2 mois", value: 3 },
    { name: "3 mois", value: 4 }
  ]

  /**
   * Données du produit a modifier
   */
    filterProductsFG: FormGroup = this._fb.group({
      filterByName: [''],
      productCategory:  [''],
      dateRegisterSelect: ['']
    });

  constructor(
    private _productsFilterVisibilityService: ProductsFilterVisibilityService,
    private _fb: FormBuilder,
    private _mapper: MapperService,
    private _productService: ProductService,
    private _userService: UserService,
    private _store: Store<IAppState>){}

  ngOnInit(): void {
    // Réchargement utilisateur
    this._userService.loadUserFromStorage();

    this._productService.getProductCategories().subscribe(res=>{
      this.productCategories = res;
    });

    this._productsFilterVisibilityService.isClosedButtonFilterVisible$.subscribe(isVisible=>{
      this.isClosedButtonFilterVisible = isVisible;
    });
  }

  closedFilterProducts(): void {
    this._productsFilterVisibilityService.hideProductsFilter();
  }

  /**
   *
   * @returns Filtrage des produits
   */
  fiterProducts(): void {
    // Si filtrage pas valide
    if(!filterProductsFieldsValidator(this.filterProductsFG)) {
      this.filterProductsFG.setErrors({atLeastOneFieldAvailable: true});
      return;
    }

    // Fake sellerId
    const sellerId = this._userService.getUser()?.userId;

    if(!sellerId)
      throw new Error("IDentifiant non définit");

    this._store.dispatch(filterSellerProductsAction({
      filterInputs: this._mapper.mapToIFilterProductInputsDto(this.filterProductsFG, sellerId)
    }));


    // Masque le filtre sur petit écran
    if(!this._productsFilterVisibilityService.hasFilterBarTobeDisplayed())
      this._productsFilterVisibilityService.hideProductsFilter();
  }

  resteFilter(): void {
    this.filterProductsFG = this._fb.group({
      filterByName: [''],
      productCategory:  [''],
      dateRegisterSelect: ['']
    });

    // Fake sellerId
    const sellerId = this._userService.getUser()?.userId;

     if(!sellerId)
      throw new Error("IDentifiant non définit");

    this._store.dispatch(filterSellerProductsAction({
      filterInputs: this._mapper.mapToIFilterProductInputsDto(this.filterProductsFG, sellerId)
    }));
  }
}
