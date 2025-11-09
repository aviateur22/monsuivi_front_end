import { createSelector } from "@ngrx/store";
import { IAppState } from "../../../store/state";

export const selector = (state: IAppState) =>state.productState;

export const selectImageSelector = createSelector(selector, (state)=>state.selectImage);
export const selectIsAddProductSuccess = createSelector(selector, (state)=>state.addProduct.isSuccess);
export const selectIsAddProductLoading = createSelector(selector, (state)=>state.addProduct.isLoading);
export const selectIsGetSellerProductsLoading = createSelector(selector,(state)=>state.sellerProducts.isLoading);
export const selectGetSellerProducts = createSelector(selector, (state)=>state.sellerProducts.summarizeProducts);
export const isDesactivateProductLoading = createSelector(selector,(state)=>state.desactivateProduct.isLoading);
export const isProductDetailPopupVisible = createSelector(selector, (state)=>state.productDetail.isPopupShow);
export const isProductDetailLoading = createSelector(selector, (state)=>state.productDetail.isLoading);
export const productDetail = createSelector(selector, (state)=>state.productDetail.productDetail);
export const clearButtonFilterVisibility = createSelector(selector, (state)=>state.isMobileClearButtonVisible);
export const filterProductValueSelector = createSelector(selector, (state)=>state.productFilterValue);

