import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from '../../model/product.dto';
import { MapperService } from '../../services/mapper.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { addProductAction } from '../../store/action';
import * as productSelector from '../../store/selector';
import { Observable } from 'rxjs';
import { validateNumber } from '../../validators/input.validator';

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

  productCategories: ProductCategory[] = [
    {name: 'Livres', code: 'book'},
    { name: 'Jeux', code: 'game'},
    { name: 'Vétements', code: 'clothe'}
  ];

  productImage: File | null = null;
  selectProductImage$: Observable<File | null>;
  isLoading$: Observable<boolean>;
  isAddProductSuccess$: Observable<boolean>;

  constructor (
    private _fb: FormBuilder,
    private _mapper: MapperService,
    private _store: Store<IAppState>){
    this.selectProductImage$ = this._store.pipe(select(productSelector.selectImageSelector));
    this.isLoading$ = this._store.pipe(select(productSelector.selectIsLoading));
    this.isAddProductSuccess$= this._store.pipe(select(productSelector.selectIsAddProductSuccess));
  }

  ngOnInit() {

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
      }
    })
  }

  /**
   * Ajout du produit
   * @returns void
   */
  createProduct() {

    // Fake sellerId
    const sellerId = 1;

    if(!this.createProductFg.valid || this.productImage == null) {
      this.createProductFg.markAllAsTouched();
      return;
    }

    // Récupération d'un formData
    const productData = this._mapper.mapProductToAdd(this.createProductFg, this.productImage, sellerId);

    // Dispatch
    this._store.dispatch(addProductAction({product: {
      addProduct: productData,
      isLoading: true,
      isSuccess: false
    }}));
  }
}
