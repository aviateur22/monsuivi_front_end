import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as productAction  from "./action";
import * as shareAction from "./../../share/store/action";
import { catchError, mergeMap, of, switchMap } from "rxjs";
import { ProductService } from "../services/product.service";

@Injectable()
export class ProductEffect {

  constructor(private _action$: Actions, private _productService: ProductService){}

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
          productAction.addProductActionComplete({product:{addProduct:product.addProduct, isLoading:false, isSuccess: false}}),
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
            shareAction.displayMessageAction({message:{isOnError: false, title: 'Vos propduits' , message: result.responseMessage}})
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
          ])
        )
      )
    )
  )

}
