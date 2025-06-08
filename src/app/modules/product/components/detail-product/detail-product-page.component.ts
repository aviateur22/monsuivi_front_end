import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IAppState } from '../../../../store/state';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductDetail } from '../../model/product.model';
import * as productSelector from '../../store/selector';
import * as productAction from '../../store/action'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateNumber } from '../../validators/input.validator';
import apiUrl from '../../../../../misc/api.url';
import { MapperService } from '../../services/mapper.service';
import { UserService } from '../../../../users/service/user.service';
import { animate, style, transition, trigger } from '@angular/animations';

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
export class DetailProductComponent implements OnInit, OnDestroy {
  //
  private destroy$ = new Subject<void>();

  /**
   * Donnée sur le produit
   */
  productDetail$: Observable<ProductDetail | null>;
  isProductDetailPopupVisible$: Observable<boolean>;
  isProductDetailLoading$: Observable<boolean>;


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
  user = this._userService.getUser();

  private productDetail: ProductDetail | null = null;

  constructor(private _store: Store<IAppState>, private _fb: FormBuilder, private _mapper: MapperService, private _userService: UserService) {
    this.productDetail$ = this._store.pipe(select(productSelector.productDetail));
    this.isProductDetailPopupVisible$ = this._store.pipe(select(productSelector.isProductDetailPopupVisible));
    this.isProductDetailLoading$ = this._store.pipe(select(productSelector.isProductDetailLoading));
  }

  ngOnDestroy(): void {
     this.destroy$.next();
     this.destroy$.complete();
  }

  ngOnInit() {
    // Réchargement utilisateur
    this._userService.loadUserFromStorage();


    // Detail du produit
    this.productDetail$
    .pipe(takeUntil(this.destroy$))
    .subscribe(productDetail=>{
      this.productDetail = productDetail;
      this.updateFormData();
    });



    // Abonement sur la mise à jour de la checkbox
    this.subscribeToCheckboxProductSold();
  }

  updateFormData(): void {
      // Chargement du FG
      this.updateProductFg.patchValue({
        productName: this.productDetail?.productName,
        productId: this.productDetail?.productId,
        productPurchasePrice: this.productDetail?.productBuyPrice,
        productSoldPrice: this.productDetail?.productSoldPrice,
        productSoldDate: this.productDetail?.productSoldDay,
        productBuyDate: this.productDetail?.productBuyDay,
        productStatus: this._mapper.mapProductStatusToBoolean(this.productDetail?.productStatus)
      });

      if(this.productDetail)
        this.imageUrl = apiUrl.streamImage.url.replace('{imagePath}', this.productDetail.productImagePath);
  }


  /**
   * Check la checkbox produit vendu
   */
  subscribeToCheckboxProductSold() {
    this.updateProductFg.get('productStatus')?.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(isCheckboxCheck => {
      if(!this.productDetail)
        return;

      // Récupération des valeur initiale
      const initialSoldPrice: number = this.productDetail.productSoldPrice;
      const initialSoldDate: Date = this.productDetail.productSoldDay  ;

      console.log(initialSoldDate);
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
    this._store.dispatch(productAction.productDetailCloseAction());
  }

  /**
   * Mise a jour du produit
   */
  updateProduct() {

    if(!this.user)
      throw new Error("L'utilisateur n'est pas défini");

    this._store.dispatch(productAction.productUpdateAction(
      {  productUpdate: {
        sellerId:this.user?.userId,
        productId: this.updateProductFg.get('productId')?.value,
        productBuyDay: this._mapper.mapDateToDdMmYyyy(this.updateProductFg.get('productBuyDate')?.value),
        productPurchasePrice: this.updateProductFg.get('productPurchasePrice')?.value,
        productSoldPrice: this.updateProductFg.get('productSoldPrice')?.value,
        productSoldDay:this._mapper.mapDateToDdMmYyyy(this.updateProductFg.get('productSoldDate')?.value),
        productStatus: this._mapper.mapBooleanToProductStatus(this.updateProductFg.get('productStatus')?.value)
      }
    }));
  }

  /**
   * Suppression du produit
   */
  desactivateProduct() {
    if(!this.user)
      throw new Error("L'utilisateur n'est pas défini");

    this._store.dispatch(productAction.productDetailDesactivateAction({productToDesactivate: {
      sellerId: this.user.userId,
      productId: this.updateProductFg.get('productId')?.value}
    }));

  }
}
