import { createAction, props } from "@ngrx/store";
import { IAddProductAction } from "./model";

export const addProductAction = createAction('[Product add product] add product', props<{ product: IAddProductAction }>());
export const addProductActionComplete = createAction('[Product add product complete] add product complete', props<{ product: IAddProductAction }>());
export const selectImage = createAction('[Product select selectImage] select selectImage', props<{ selectImage: File }>());
