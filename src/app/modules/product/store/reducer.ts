import { createReducer, on } from "@ngrx/store";
import { IProductState } from "./state";
import * as productAction from "./action";

export const initialProductState: IProductState = {
  addProduct: {
    isLoading: false,
    isSuccess: false,
    addProduct: null
  },
  selectImage: null,
  sellerProducts: {
    isLoading: false,
    isSuccess: false,
    summarizeProducts: []
  }
}

export const reducers = createReducer(
  initialProductState,
  on(productAction.addProductAction, (state, {product})=>({...state, addProduct: {
    addProduct: product.addProduct,
    isLoading: product.isLoading,
    isSuccess: product.isSuccess
  }
  })),
  on(productAction.addProductActionComplete, (state, {product})=>({...state, addProduct: {
    addProduct: product.addProduct,
    isLoading: product.isLoading,
    isSuccess: product.isSuccess

  }
})),
  on(productAction.selectImage, (state, {selectImage})=>({...state, selectImage: selectImage})),
  on(productAction.getSellerProductsAction, (state)=>({
    ...state, sellerProducts: {...state.sellerProducts, isLoading: true }
  })),
  on(productAction.getSellerProductsActionComplete, (state, {products})=>({
    ...state, sellerProducts: {
      isLoading: false,
      isSuccess: products.isSuccess,
      summarizeProducts: products.summarizeProducts
    }
  }))
)
