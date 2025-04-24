import { createAction, props } from "@ngrx/store";
import { IAddProductAction, ISellerProducts } from "./model";
import { SummarizeProduct } from "../model/product.model";

export const addProductAction = createAction('[Product add product] add product', props<{ product: IAddProductAction }>());
export const addProductActionComplete = createAction('[Product add product complete] add product complete', props<{ product: IAddProductAction }>());
export const selectImage = createAction('[Product select selectImage] select selectImage', props<{ selectImage: File }>());
export const getSellerProductsAction = createAction('[Get seller products] get seller products', props<{sellerId: string}>())
export const getSellerProductsActionComplete = createAction('[Get seller products complete] get seller product complete', props<{products: ISellerProducts}>())
