import { Component, OnInit } from '@angular/core';
import { IFilterProductByCategoryDto, IFilterProductByMaxAgeDto } from '../../model/product.dto';
import { ProductsFilterVisibilityService } from '../../services/products-filter-visibility.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { filterProductsFieldsValidator } from '../../validators/filterFields.validator';
import { UserService } from '../../../../users/service/user.service';
import { IAppState } from '../../../../store/state';
import { select, Store } from '@ngrx/store';
import { filterSellerProductsAction , getSellerProductsAction, updateProductFilterValueAction, clearButtonfilterVisibilityAction} from '../../store/action';
import { filterProductValueSelector } from '../../store/selector';
import { MapperService } from '../../services/mapper.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent implements OnInit {
  isClosedButtonFilterVisible: boolean = true;

  //Données du filtre
  productFilterByCategories! :  IFilterProductByCategoryDto[] | undefined;
  productFilterByMaxAges: IFilterProductByMaxAgeDto[] | undefined;

  user = this._userService.getUser();


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
      this.productFilterByCategories = res;
    });

     this._productService.getFilterProductByMaxAge().subscribe(res=>{
      this.productFilterByMaxAges = res;
    });

    this._productsFilterVisibilityService.isClosedButtonFilterVisible$.subscribe(isVisible=>{
      this.isClosedButtonFilterVisible = isVisible;
    });

    this._store.pipe(select(filterProductValueSelector)).subscribe(value => {
      this.filterProductsFG.patchValue({
        filterByName: value.filterByName ?? '',
        productCategory: this.productFilterByCategories!.find(c => c.code === value.filterByCategoryCode),
        dateRegisterSelect: value.filterByRegisterPeriod ?? '',
        areSoldProductVisible: value.areSoldProductVisible
      });
    })
  }


  closedFilterProducts(): void {
    this._productsFilterVisibilityService.hideProductsFilter();
  }

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
      productFilterValue: this._mapper.mapToIFilterProductInputsDto(this.filterProductsFG, sellerId)
    }));


    // Masque le filtre sur petit écran
    if(!this._productsFilterVisibilityService.hasFilterBarTobeDisplayed())
      this._productsFilterVisibilityService.hideProductsFilter();
  }

  resteFilter(): void {
    this.filterProductsFG = this._fb.group({
      filterByName: [''],
      productCategory:  [''],
      dateRegisterSelect: [''],
      areSoldProductVisible: [false]
    });

    // Fake sellerId
    const sellerId = this._userService.getUser()?.userId;

     if(!sellerId)
      throw new Error("IDentifiant non définit");

    this._store.dispatch(getSellerProductsAction({
     sellerId: sellerId,
     areSoldProductVisible: false
    }));

    // Vide le contenu du filtre
    this._store.dispatch(updateProductFilterValueAction({filterValue: {
      filterByCategoryCode: '',
      filterByName: '',
      filterByRegisterPeriod: 0,
      sellerId: '',
      areSoldProductVisible: false
    }}));

    // Suppression du button suppression du filtre pour le mobile
    this._store.dispatch(clearButtonfilterVisibilityAction({isFilterClearButtonVisible: false}));
  }

  inputFocus(): void {
    this._productsFilterVisibilityService.isInputFocused = true;
  }

  inputLoseFocus(): void {
    // Ajout d'un délais
    // Cela permets de ne pas masquer le filtre sur mobile avec le clavier virtuel
    // lors du focusout de l'input
    setTimeout(()=>{
      this._productsFilterVisibilityService.isInputFocused = false;
    }, 500)
  }
}
