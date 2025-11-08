import { IProductFilterValueDto } from "../model/product.dto";
import { IAddProductAction, IDesactivateProductAction, IFilterProduct, IProductDetailAction, ISellerProducts } from "./model";

export interface IProductState {
  addProduct: IAddProductAction,
  selectImage: File | null,
  sellerProducts: ISellerProducts,
  desactivateProduct: IDesactivateProductAction,
  productDetail: IProductDetailAction,
  isMobileClearButtonVisible: boolean,
  productFilterValue: IProductFilterValueDto
}
