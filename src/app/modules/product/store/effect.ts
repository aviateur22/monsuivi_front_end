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
  )
}
