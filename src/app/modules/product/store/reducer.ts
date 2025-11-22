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
    summarizeProducts: [],
    productQuantity: 0
  },
  desactivateProduct: {
    isLoading: false,
    isSuccess: false,
    desactivateProduct: null
  },
  productDetail: {
    isLoading: false,
    isPopupShow: false,
    productDetail: null
  },
  isMobileClearButtonVisible: false,
  productFilterValue: {
    filterByCategoryCode: '',
    filterByName: '',
    filterByRegisterPeriod: 0,
    sellerId: '',
    areSoldProductVisible: false
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
  on(productAction.addProductActionfailed,(state)=>({...state, addProduct: {...state.addProduct,
    isLoading: false,
    isSuccess: false
  }})),
  on(productAction.selectImage, (state, {selectImage})=>({...state, selectImage: selectImage})),
  on(productAction.getSellerProductsAction, (state)=>({
    ...state, sellerProducts: {...state.sellerProducts, isLoading: true }
  })),
  on(productAction.getSellerProductsActionComplete, (state, {products})=>({
    ...state, sellerProducts: {
      isLoading: false,
      isSuccess: products.isSuccess,
      summarizeProducts: products.summarizeProducts,
      productQuantity: products.summarizeProducts.length
    }
  })),
  on(productAction.clearButtonfilterVisibilityAction, (state, {isFilterClearButtonVisible})=>({
    ...state, isMobileClearButtonVisible: isFilterClearButtonVisible
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
      productQuantity: state.sellerProducts.productQuantity - 1,
      isSuccess: true
    }
  })),
  on(productAction.desactivateProductFailed,(state)=>({...state, desactivateProduct: {...state.desactivateProduct, isLoading: false, isSuccess: false}})),
  on(productAction.getProductDetailAction,(state)=>({
    ...state, productDetail: {
      ...state.productDetail,
      isPopupShow: true,
      isLoading: true
    }
  })),
  on(productAction.getProductDetailCompleteAction, (state, {productDetail})=>({
    ...state, productDetail: {
      ...state.productDetail,
      isLoading: false,
      productDetail: productDetail
    }})),
  on(productAction.getProductDetailFailedAction,(state)=>({
    ...state, productDetail: {
      ...state.productDetail,
      isLoading: false
    }
  })),
  on(productAction.productDetailCloseAction,(state)=>({
    ...state, productDetail: {
      ...state.productDetail ,
      isPopupShow: false,
      productDetail: null,
      isLoading: false
    }
  }
  )),
  on(productAction.productUpdateAction, (state)=>({
    ...state, productDetail:  { ...state.productDetail,
      isLoading: true
    }
  })),
  on(productAction.productUpdateCompleteAction,(state, {productUpdate})=>({
    ...state, productDetail: {
      ...state.productDetail,
      isLoading: false,
      isPopupShow: true
    },
    sellerProducts : {
      ...state.sellerProducts,
      summarizeProducts: state.sellerProducts.summarizeProducts
      .map(product=>product.productId === productUpdate.productId ?
        { ...product,
          productBuyDay: productUpdate.productBuyDay,
          productStatuscode: productUpdate.productStatus,
          productSoldDay: productUpdate.productSoldDay
        }
        : product
      )}
  })),
  on(productAction.productUpdateFailedAction, (state)=>({
    ...state, productDetail: {
      ...state.productDetail,
      isLoading: false
    }
  })),
  on(productAction.productDetailDesactivateAction, (state)=>({
    ...state, productDetail: {
      ...state.productDetail, isLoading: true
    }
  })),
  on(productAction.productDetailDesactivateCompleteAction, (state, {productDesactivate})=>({
    ...state, productDetail: {
      ...state.productDetail, isLoading: false , isPopupShow: false
    },
    sellerProducts: { ...state.sellerProducts,
      summarizeProducts: state.sellerProducts.summarizeProducts
      .filter(product=>product.productId != productDesactivate.productId),
    isSuccess: true
    }
  })),
  on(productAction.productDetailDesactivateFailedAction, (state)=>({
    ...state, productDetail: { ...state.productDetail, isLoading: false, isPopupShow: false }

  })),
  on(productAction.filterSellerProductsAction, (state)=> ({
    ...state, sellerProducts: {
      ...state.sellerProducts, isLoading: true
    }
  })),
  on(productAction.filterSellerProductsCompleteAction, (state, {products})=>({
    ...state, sellerProducts: {
      ...state.sellerProducts,
      isLoading: false,
      isSuccess: true,
      summarizeProducts: products.summarizeProducts,
      productQuantity:products.summarizeProducts.length
    }
  })),
  on(productAction.updateProductFilterValueAction, (state, {filterValue}) => ({
    ...state, productFilterValue: {
      filterByCategoryCode: filterValue.filterByCategoryCode,
      filterByName: filterValue.filterByName,
      filterByRegisterPeriod: filterValue.filterByRegisterPeriod,
      sellerId: filterValue.sellerId,
      areSoldProductVisible: filterValue.areSoldProductVisible
    }
  })),
  on(productAction.filterSellerProductsFailedAction, (state)=>({
    ...state, sellerProducts : {
      ...state.sellerProducts,
      isLoading: false,
      isSuccess: false
    }
  })),
  on(productAction.resetProductFilter, (state) => ({
    ...state, productFilterValue : {
      ...state.productFilterValue,
      areSoldProductVisible: false,
      filterByName: "",
      filterByCategoryCode: "",
      filterByRegisterPeriod: 0
    }
  }))

)
