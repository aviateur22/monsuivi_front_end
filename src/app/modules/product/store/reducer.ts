import { createReducer, on } from "@ngrx/store";
import { IProductState } from "./state";
import * as productAction from "./action";
import { DesactivateProduct } from "../model/product.model";

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
  },
  desactivateProduct: {
    isLoading: false,
    isSuccess: false,
    desactivateProduct: null
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
  })),
  on(productAction.desactivateProduct, (state)=>({...state, desactivateProduct: {
    isLoading: true,
    isSuccess: false,
    desactivateProduct: null
  }
  })),
  on(productAction.desactivateProductComplete, (state, {desactivateProduct})=>({
    ...state, desactivateProduct: {
      ...desactivateProduct, isLoading: false, isSuccess: true
    },
    sellerProducts: {
      isLoading: false,
      summarizeProducts: state.sellerProducts.summarizeProducts
        .filter(product=>product.productId != desactivateProduct.desactivateProduct?.productId),
      isSuccess: true
    }
  }))
)
