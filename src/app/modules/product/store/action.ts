import { createAction, props } from "@ngrx/store";
import { IAddProductAction, IDesactivateProductAction, ISellerProducts } from "./model";
import { DesactivateProduct, ProductDetail } from "../model/product.model";
import { IDesactivateProductDto, IFilterProductInputsDto, IGetProductDetailDto, IProductUpdateDto, IProductUpdateResponseDto } from "../model/product.dto";

export const addProductAction = createAction('[Product add product] add product', props<{ product: IAddProductAction }>());
export const addProductActionComplete = createAction('[Product add product complete] add product complete', props<{ product: IAddProductAction }>());
export const addProductActionfailed = createAction('[Product add product failed] add product failed');
export const selectImage = createAction('[Product select selectImage] select selectImage', props<{ selectImage: File }>());
export const getSellerProductsAction = createAction('[Get seller products] get seller products', props<{ sellerId: string }>())
export const getSellerProductsActionComplete = createAction('[Get seller products complete] get seller product complete', props<{ products: ISellerProducts }>());
export const desactivateProduct = createAction('[Desactivate product] desactivate product', props<{ productToDesactivate: IDesactivateProductDto }>());
export const desactivateProductComplete = createAction('[Desactivate product success] desactivate product success', props<{ desactivateProduct: IDesactivateProductAction }>());
export const desactivateProductFailed = createAction('[Desactivate product failed] desactivate product failed');
export const getProductDetailAction = createAction('[Get product detail] get product detail', props<{ getProductDetail: IGetProductDetailDto }>());
export const getProductDetailCompleteAction = createAction('[Get product detail complete] get product detail complete', props<{ productDetail: ProductDetail }>());
export const getProductDetailFailedAction = createAction('[Get product detail failed] get product detail failed');
export const productDetailCloseAction = createAction('[Product detail close] product detail close');
export const productUpdateAction = createAction('[Update product] update product', props<{ productUpdate: IProductUpdateDto }>());
export const productUpdateCompleteAction = createAction('[Update product complete] update product complete', props<{ productUpdate: IProductUpdateResponseDto }>());
export const productUpdateFailedAction = createAction('[Update product failed] update product failed');
export const productDetailDesactivateAction=createAction('[Detail product desactivate] detail product desactivate', props<{ productToDesactivate: IDesactivateProductDto }>());
export const productDetailDesactivateCompleteAction = createAction('[Detail product desactivate complete] detail product desactivate complete', props<{productDesactivate: DesactivateProduct }>());
export const productDetailDesactivateFailedAction = createAction('[Detail product desactivate failed] detail product desactivate failed');
export const filterSellerProductsAction = createAction('[Filter seller products] filter seller products', props<{filterInputs: IFilterProductInputsDto}>());
export const filterSellerProductsCompleteAction = createAction('[Filter seller products complete] filter seller products complete', props<{ products: ISellerProducts }>());
export const filterSellerProductsFailedAction = createAction('[Filter seller products failed] filter seller products failed');


