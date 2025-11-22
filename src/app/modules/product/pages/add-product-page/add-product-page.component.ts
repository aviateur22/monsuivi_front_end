import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { Router } from "@angular/router";
import { MapperService } from '../../services/mapper.service';
import { IAppState } from '../../../../store/state';
import { addProductAction } from '../../store/action';
import * as productSelector from '../../store/selector';
import { validateNumber } from '../../validators/input.validator';
import { IFilterProductByCategoryDto } from '../../model/product.dto';
import { ActifSeller } from '../../../auth/models/actif-seller';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.css'
})
export class AddProductPageComponent extends ActifSeller {



  createProductFg: FormGroup = this._fb.group({
    selectedImage:[null, Validators.required],
    productName: ['', Validators.required],
    productPurchasePrice: ['', [Validators.required, validateNumber]],
    productCategory: ['', Validators.required]
  })

  productCategories: IFilterProductByCategoryDto[] = [
    {name: 'Livres', code: 'bk'},
    { name: 'Jeux', code: 'ga'},
    { name: 'Vétements', code: 'cl'}
  ];

  productImage: File | null = null;
  selectProductImage$: Observable<File | null>;
  isAddProductSuccess$: Observable<boolean>;



  constructor (
    private _fb: FormBuilder,
    private _mapper: MapperService,
    protected override _router: Router,
    protected override _store: Store<IAppState>){
    super(_store, _router);
    this.selectProductImage$ = this._store.pipe(select(productSelector.selectImageSelector));
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
        this.productImage = null;
      }
    })
  }

  /**
   * Ajout du produit
   * @returns void
   */
  createProduct() {
    this.isSellerAuthentified()
    .pipe(takeUntil(this._destroy$))
    .subscribe(sellerId => {

      if(!sellerId)
        return;

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
    })
  };
}
