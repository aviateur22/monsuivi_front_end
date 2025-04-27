import { createAction, props } from "@ngrx/store";
import { IAddProductAction, IDesactivateProductAction, ISellerProducts } from "./model";
import { SummarizeProduct } from "../model/product.model";
import { IDesactivateProductDto } from "../model/product.dto";

export const addProductAction = createAction('[Product add product] add product', props<{ product: IAddProductAction }>());
export const addProductActionComplete = createAction('[Product add product complete] add product complete', props<{ product: IAddProductAction }>());
export const selectImage = createAction('[Product select selectImage] select selectImage', props<{ selectImage: File }>());
export const getSellerProductsAction = createAction('[Get seller products] get seller products', props<{sellerId: string}>())
export const getSellerProductsActionComplete = createAction('[Get seller products complete] get seller product complete', props<{products: ISellerProducts}>());
export const desactivateProduct = createAction('[Desactivate product] desactivate product', props<{productToDesactivate: IDesactivateProductDto}>());
export const desactivateProductComplete = createAction('[Desactivate product success] desactivate product success', props<{desactivateProduct: IDesactivateProductAction}>());
