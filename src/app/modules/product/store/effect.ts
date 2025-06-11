import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as productAction  from "./action";
import * as shareAction from "./../../share/store/action";
import { catchError,  mergeMap, of, switchMap } from "rxjs";
import { ProductService } from "../services/product.service";

@Injectable()
export class ProductEffect {

  constructor(
    private _action$: Actions,
    private _productService: ProductService){}

  addProduct$ = createEffect(()=>
    this._action$.pipe(
      ofType(productAction.addProductAction),
      mergeMap(({product})=>
        this._productService.addProduct(product.addProduct!).pipe(
          switchMap(result=>[
            productAction.addProductActionComplete({product:{addProduct:null, isLoading:false, isSuccess: true}}),
            shareAction.displayMessageAction({message:{isOnError: false, title: 'Enregistrement produit' , message: result.responseMessage}})
          ]),
        catchError(error=> of(
          productAction.addProductActionfailed(),
          shareAction.displayMessageAction({
          message: {title: 'Enregistrement produit', message: error.error.error, isOnError: true}
        })))
        )
      )
    )
  );

  getSellerProducts$ = createEffect(()=>
    this._action$.pipe(
      ofType(productAction.getSellerProductsAction),
      mergeMap(({sellerId}) =>
        this._productService.getSellerProducts(sellerId).pipe(
          switchMap(result=>[
            productAction.getSellerProductsActionComplete({products: { isLoading:false, isSuccess: true, summarizeProducts: result.products}}),
            shareAction.displayMessageAction({message:{isOnError: false, title: 'Vos produits' , message: result.responseMessage}})
          ]),
          catchError(error=> of(
            productAction.getSellerProductsActionComplete({products: { isLoading:false, isSuccess: false, summarizeProducts: []}}),
            shareAction.displayMessageAction({
            message: {title: 'Vos propduits', message: error.error.error, isOnError: true}
          })))
        )
      )
    )
  );

  desactivateProduct$ = createEffect(()=>
    this._action$.pipe(
      ofType(productAction.desactivateProduct),
      mergeMap(({productToDesactivate})=>
        this._productService.desactivateProduct(productToDesactivate).pipe(
          switchMap(result=>[
            productAction.desactivateProductComplete({desactivateProduct: {
              isLoading: false,
              isSuccess: true,
              desactivateProduct: { isProductActif: result.isProductActif, productId: result.productId, sellerId: result.sellerId}
            }}),
            shareAction.displayMessageAction({message:{isOnError: false, title: 'Désactivation du produit' , message: result.responseMessage}})
          ]),
          catchError(error=>of(
            productAction.desactivateProductFailed(),
            shareAction.displayMessageAction({
              message: {title: 'Désactivation du produit', message: error.error.error, isOnError: true}
            })
          ))
        )
      )
    )
  );

  getDetailProduct$ = createEffect(()=>
  this._action$.pipe(
    ofType(productAction.getProductDetailAction),
    mergeMap(({getProductDetail})=>
      this._productService.getProductDetail(getProductDetail).pipe(
        switchMap(result=>[
          productAction.getProductDetailCompleteAction({
            productDetail: {
              productBuyDay: result.productBuyAt,
              productId: result.productId,
              productName: result.productName,
              productImagePath: result.photoImagePath,
              productSoldPrice: result.productSoldPrice,
              productSoldDay: result.productSoldAt,
              productBuyPrice: result.productPurchasePrice,
              productStatus: result.productStatus
            }
          }),
          shareAction.displayMessageAction({
            message: {title: 'votre produit', message: result.responseMessage, isOnError: false}
          })
        ]),
        catchError(error=> of(
          productAction.getProductDetailFailedAction(),
          shareAction.displayMessageAction({
          message: {title: 'Vos propduits', message: error.error.error, isOnError: true}
        })
      ))
    )
  )
  )
);

productUpdate$ = createEffect(()=>
  this._action$.pipe(
    ofType(productAction.productUpdateAction),
    mergeMap(({productUpdate})=>
      this._productService.productUpdate(productUpdate).pipe(
        switchMap(result=>[
          productAction.productUpdateCompleteAction({
           productUpdate: {
            responseMessage: result.responseMessage,
            productBuyDay: result.productBuyDay,
            productId: result.productId,
            productPurchasePrice: result.productPurchasePrice,
            productSoldPrice: result.productSoldPrice,
            productStatus: result.productStatus,
            productSoldDay: result.productSoldDay
          }
          }),
          shareAction.displayMessageAction({message:{isOnError: false, title: 'Mise à jour' , message: result.responseMessage}})
        ]),
        catchError(error=> of(
          productAction.productUpdateFailedAction(),
          shareAction.displayMessageAction({
          message: {title: 'Vos propduits', message: error.error.error, isOnError: true}
        })
      ))
      )
    )
  )
);

productDetailDesactivateProduct$ = createEffect(()=>
  this._action$.pipe(
    ofType(productAction.productDetailDesactivateAction),
    mergeMap(({productToDesactivate})=>
      this._productService.desactivateProduct(productToDesactivate).pipe(
        switchMap(result=>[
          productAction.productDetailDesactivateCompleteAction({productDesactivate: {
            isProductActif: false,
            productId: result.productId,
            sellerId: result.sellerId
          }}),
          shareAction.displayMessageAction({message:{isOnError: false, title: 'Désactivation du produit' , message: result.responseMessage}})
        ]),
        catchError(error=> of(
          productAction.productDetailDesactivateFailedAction(),
          shareAction.displayMessageAction({
          message: {title: 'Désactivation du produit', message: error.error.error, isOnError: true}
        })
      ))
      )
    )
  )
);

filterSelerProducts$ = createEffect(()=>
  this._action$.pipe(
    ofType(productAction.filterSellerProductsAction),
    mergeMap(({filterInputs}) =>
      this._productService.filterSellerProducts(filterInputs).pipe(
        switchMap(result=>[
          productAction.filterSellerProductsCompleteAction( { products:{ isLoading:false, isSuccess: true, summarizeProducts: result.products}}),
          shareAction.displayMessageAction({
          message: {title: 'Filtrage produits', message: result.responseMessage, isOnError: false}
        })
        ]),
        catchError(error=> of(
          productAction.filterSellerProductsFailedAction(),
          shareAction.displayMessageAction({
          message: {title: 'Filtrage produits', message: error.error.error, isOnError: true}
        })
      )
  )
  )
)));
}
