import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IAppState } from '../../../../store/state';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { ProductDetail } from '../../model/product.model';
import * as productSelector from '../../store/selector';
import * as productAction from '../../store/action'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateNumber } from '../../validators/input.validator';
import apiUrl from '../../../../../misc/api.url';
import { MapperService } from '../../services/mapper.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { IGetProductDetailDto } from '../../model/product.dto';
import { getProductDetailAction } from '../../store/action';
import { ActifSeller } from '../../../auth/models/actif-seller';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-detail-product-page',
  templateUrl: './detail-product-page.component.html',
  styleUrl: './detail-product-page.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // when the element is added to the DOM
        style({ opacity: 0, transform: 'scale(0.00)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [ // when the element is removed from the DOM
        animate('500ms ease-in', style({ opacity: 0, transform: 'scale(0.00)' }))
      ])
    ])
  ]
})
export class DetailProductComponent extends ActifSeller implements OnInit {
  /**
   * Donnée sur le produit
   */
  productDetail$ = this._store.pipe(select(productSelector.productDetail));
  isProductDetailPopupVisible$ = this._store.pipe(select(productSelector.isProductDetailPopupVisible));
  isProductDetailLoading$ = this._store.pipe(select(productSelector.isProductDetailLoading));


  /**
   * Données du produit a modifier
   */
   updateProductFg: FormGroup = this._fb.group({
      productName: ['', Validators.required],
      productId: ['', Validators.required],
      productPurchasePrice: ['', [Validators.required, validateNumber]],
      productSoldPrice: ['', [validateNumber]],
      productSoldDate: [''],
      productBuyDate: ['', [Validators.required]],
      productStatus: ['', [Validators.required]]
    })

  //Path de l'image du produit
  imageUrl: string = '';

  // Utilisateur


  //private productDetail: ProductDetail | null = null;

  constructor(
    private _productService: ProductService,
    private _location: Location,
    private _activedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _mapper: MapperService,
    protected override _store: Store<IAppState>,
    protected override _router: Router) {
      super(_store,_router);
  }

  ngOnInit() {
    // Chargement du produit
    this.loadProductDetail(this._activedRoute.snapshot.paramMap.get('product-id'));
    // Detail du produit

    this.productDetail$
    .pipe(takeUntil(this._destroy$))
    .subscribe(productDetail => {

      if(!productDetail)
        throw new Error("Pas données disponible sur le produit");

      // Mise a jour formulaire
      this.updateFormData(productDetail);


      // Abonement sur la mise à jour de la checkbox
      this.subscribeToCheckboxProductSold(productDetail);
    });
  }

  /**
   * Mise a joiur du contenu du formulaire
   */
  updateFormData(productDetail: ProductDetail): void {
      this.updateProductFg.patchValue({
        productName: productDetail.productName,
        productId: productDetail.productId,
        productPurchasePrice: productDetail.productBuyPrice,
        productSoldPrice: productDetail.productSoldPrice,
        productSoldDate: productDetail.productSoldDay,
        productBuyDate: productDetail.productBuyDay,
        productStatus: this._mapper.mapProductStatusToBoolean(productDetail.productStatus)
      });

      this._productService.streamProductImage(productDetail.productImagePath)
      .subscribe(blob => {
        this.imageUrl = URL.createObjectURL(blob);
      });
  }


  /**
   * Check la checkbox produit vendu
   */
  subscribeToCheckboxProductSold(productDetail: ProductDetail) {
    this.updateProductFg.get('productStatus')?.valueChanges
    .pipe(takeUntil(this._destroy$))
    .subscribe(isCheckboxCheck => {
      if(!productDetail)
        return;

      // Récupération des valeur initiale
      const initialSoldPrice: number = productDetail.productSoldPrice;
      const initialSoldDate: Date = productDetail.productSoldDay  ;

      if(isCheckboxCheck) {
        this.updateProductFg.get('productSoldDate')?.enable();
        this.updateProductFg.get('productSoldPrice')?.enable();

        this.updateProductFg.patchValue({
          productSoldDate: initialSoldDate !== null ? initialSoldDate : this._mapper.mapDateToDdMmYyyy(new Date()),
          productSoldPrice: initialSoldPrice !== null ? initialSoldPrice : 0
        });
        return;
      }

      this.updateProductFg.get('productSoldDate')?.disable();
      this.updateProductFg.get('productSoldPrice')?.disable();

      this.updateProductFg.patchValue({
        productSoldDate: null,
        productSoldPrice: 0
      });

     })

  }

  /**
   * Fermeture de la popup
   */
  closeDetail() {
    this._location.back();
  }

  /**
   * Mise a jour du produit
   */
  updateProduct() {
    this.isSellerAuthentified()
    .pipe(takeUntil(this._destroy$))
    .subscribe( sellerId => {
      if(!sellerId)
        return;

      this._store.dispatch(productAction.productUpdateAction(
        {  productUpdate: {
          sellerId,
          productId: this.updateProductFg.get('productId')?.value,
          productBuyDay: this._mapper.mapDateToDdMmYyyy(this.updateProductFg.get('productBuyDate')?.value),
          productPurchasePrice: this.updateProductFg.get('productPurchasePrice')?.value,
          productSoldPrice: this.updateProductFg.get('productSoldPrice')?.value,
          productSoldDay:this._mapper.mapDateToDdMmYyyy(this.updateProductFg.get('productSoldDate')?.value),
          productStatus: this._mapper.mapBooleanToProductStatus(this.updateProductFg.get('productStatus')?.value)
        }
      }));
    });
  }

  /**
   * Suppression du produit
   */
  desactivateProduct() {
     this.isSellerAuthentified()
    .pipe(takeUntil(this._destroy$))
    .subscribe( sellerId => {
      if(!sellerId)
        return;

      this._store.dispatch(productAction.productDetailDesactivateAction({productToDesactivate: {
        sellerId: sellerId,
        productId: this.updateProductFg.get('productId')?.value}
      }));
    });
  }

  /**
   * Chargement des tetail du produits
   *
   * @param productId L'identifiant du produit a afficher
   */
  loadProductDetail(productId: string | null) {

    this.isSellerAuthentified()
    .pipe(takeUntil(this._destroy$))
    .subscribe( sellerId => {
      if(!sellerId || !productId)
        return;

      const detailProductDto: IGetProductDetailDto = {
        sellerId,
        productId: productId
      }

      this._store.dispatch(getProductDetailAction({getProductDetail: detailProductDto}));
    });

  }
}
