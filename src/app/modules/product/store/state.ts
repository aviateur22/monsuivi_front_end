import { IProductFilterValueDto } from "../model/product.dto";
import { IAddProductAction, IUpdateProductActivation, IFilterProduct, IProductDetailAction, ISellerProducts } from "./model";

export interface IProductState {
  addProduct: IAddProductAction,
  selectImage: File | null,
  sellerProducts: ISellerProducts,
  updateProductActivation: IUpdateProductActivation,
  productDetail: IProductDetailAction,
  isMobileClearButtonVisible: boolean,
  productFilterValue: IProductFilterValueDto
}
