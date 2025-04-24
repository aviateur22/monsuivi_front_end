import { createSelector } from "@ngrx/store";
import { IAppState } from "../../../store/state";

export const selector = (state: IAppState) =>state.productState;

export const selectImageSelector = createSelector(selector, (state)=>state.selectImage);
export const selectIsAddProductSuccess = createSelector(selector, (state)=>state.addProduct.isSuccess);
export const selectIsLoading = createSelector(selector, (state)=>state.addProduct.isLoading);
export const selectIsGetSellerProductsLoading = createSelector(selector,(state)=>state.sellerProducts.isLoading);
export const selectGetSellerProducts = createSelector(selector, (state)=>state.sellerProducts.summarizeProducts);
