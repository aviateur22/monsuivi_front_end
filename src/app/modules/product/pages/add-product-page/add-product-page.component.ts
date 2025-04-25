import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MapperService } from '../../services/mapper.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { addProductAction } from '../../store/action';
import * as productSelector from '../../store/selector';
import { Observable } from 'rxjs';
import { validateNumber } from '../../validators/input.validator';
import { IProductCategoryIhmDto } from '../../model/product.dto';
import { UserService } from '../../../../users/service/user.service';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.css'
})
export class AddProductPageComponent {

  createProductFg: FormGroup = this._fb.group({
    selectedImage:[null, Validators.required],
    productName: ['', Validators.required],
    productPurchasePrice: ['', [Validators.required, validateNumber]],
    productDesiredSoldPrice: ['', [Validators.required, validateNumber]],
    productCategory: ['', Validators.required]
  })

  productCategories: IProductCategoryIhmDto[] = [
    {name: 'Livres', code: 'bk'},
    { name: 'Jeux', code: 'ga'},
    { name: 'Vétements', code: 'cl'}
  ];

  productImage: File | null = null;
  selectProductImage$: Observable<File | null>;
  isLoading$: Observable<boolean>;
  isAddProductSuccess$: Observable<boolean>;

  // Utilisateur
  user = this._userService.getUser();

  constructor (
    private _fb: FormBuilder,
    private _userService: UserService,
    private _mapper: MapperService,
    private _store: Store<IAppState>){
    this.selectProductImage$ = this._store.pipe(select(productSelector.selectImageSelector));
    this.isLoading$ = this._store.pipe(select(productSelector.selectIsLoading));
    this.isAddProductSuccess$= this._store.pipe(select(productSelector.selectIsAddProductSuccess));
  }

  ngOnInit() {

    // rechargement du user
    this._userService.loadUserFromStorage();

    // Récupération des données de l'image du produit
    this.selectProductImage$.subscribe(image=>{
      if(image != null) {
        this.productImage = image;
      }
    });

    // Reset du formulaire en cas de succés d'ajout
    this.isAddProductSuccess$.subscribe(isSuccess=>{
      if(isSuccess){
        this.createProductFg.reset();
        this.productImage = null;
      }
    })
  }

  /**
   * Ajout du produit
   * @returns void
   */
  createProduct() {

    // Fake sellerId
    const sellerId = this._userService.getUser()?.userId;

    if(!this.createProductFg.valid || this.productImage == null) {
      this.createProductFg.markAllAsTouched();
      return;
    }


    if(!this.user)
      return;

    // Récupération d'un formData
    const productData = this._mapper.mapProductToAdd(this.createProductFg, this.productImage, this.user.userId);

    // Dispatch
    this._store.dispatch(addProductAction({product: {
      addProduct: productData,
      isLoading: true,
      isSuccess: false
    }}));
  }
}
